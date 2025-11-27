'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProjectItem } from '@/types/resume';

export function ProjectsForm() {
    const { resumeData, addProject, updateProject, removeProject, reorderProjects } = useResumeStore();
    const { projects } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((item) => item.id === active.id);
            const newIndex = projects.findIndex((item) => item.id === over.id);
            reorderProjects(arrayMove(projects, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Projects</h2>
                <Button onClick={addProject} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={projects.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {projects.map((item) => (
                            <SortableProjectItem
                                key={item.id}
                                item={item}
                                updateProject={updateProject}
                                removeProject={removeProject}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

interface SortableProjectItemProps {
    item: ProjectItem;
    updateProject: (id: string, data: Partial<ProjectItem>) => void;
    removeProject: (id: string) => void;
}

function SortableProjectItem({ item, updateProject, removeProject }: SortableProjectItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleChange = (field: keyof ProjectItem, value: string | string[]) => {
        updateProject(item.id, { [field]: value });
    };

    return (
        <Card ref={setNodeRef} style={style} className="relative group">
            <div
                {...attributes}
                {...listeners}
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab p-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="w-5 h-5" />
            </div>
            <CardContent className="p-6 pl-12 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                            value={item.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Project Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Link</Label>
                        <Input
                            value={item.link || ''}
                            onChange={(e) => handleChange('link', e.target.value)}
                            placeholder="https://project.com"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Technologies</Label>
                        <Input
                            value={item.technologies.join(', ')}
                            onChange={(e) => handleChange('technologies', e.target.value.split(',').map(t => t.trim()))}
                            placeholder="React, Node.js, TypeScript (comma separated)"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea
                            value={item.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Describe the project..."
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeProject(item.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}

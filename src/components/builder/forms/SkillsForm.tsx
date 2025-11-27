'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { SkillItem } from '@/types/resume';

export function SkillsForm() {
    const { resumeData, addSkill, updateSkill, removeSkill, reorderSkills } = useResumeStore();
    const { skills } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = skills.findIndex((item) => item.id === active.id);
            const newIndex = skills.findIndex((item) => item.id === over.id);
            reorderSkills(arrayMove(skills, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <Button onClick={() => addSkill({})} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={skills.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {skills.map((item) => (
                            <SortableSkillItem
                                key={item.id}
                                item={item}
                                updateSkill={updateSkill}
                                removeSkill={removeSkill}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

interface SortableSkillItemProps {
    item: SkillItem;
    updateSkill: (id: string, data: Partial<SkillItem>) => void;
    removeSkill: (id: string) => void;
}

function SortableSkillItem({ item, updateSkill, removeSkill }: SortableSkillItemProps) {
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

    return (
        <Card ref={setNodeRef} style={style} className="relative group">
            <div
                {...attributes}
                {...listeners}
                className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab p-2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical className="w-5 h-5" />
            </div>
            <CardContent className="p-4 pl-12 flex items-center gap-4">
                <div className="flex-1 space-y-2">
                    <Label className="sr-only">Skill Name</Label>
                    <Input
                        value={item.name}
                        onChange={(e) => updateSkill(item.id, { name: e.target.value })}
                        placeholder="Skill (e.g. React, Python)"
                    />
                </div>
                <div className="w-40 space-y-2">
                    <Label className="sr-only">Level</Label>
                    <Select
                        value={item.level}
                        onValueChange={(value: any) => updateSkill(item.id, { level: value })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeSkill(item.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}

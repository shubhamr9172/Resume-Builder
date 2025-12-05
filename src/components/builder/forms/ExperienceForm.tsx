'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, Sparkles } from 'lucide-react';
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
import { ExperienceItem } from '@/types/resume';

export function ExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
    const { experience } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = experience.findIndex((item) => item.id === active.id);
            const newIndex = experience.findIndex((item) => item.id === over.id);
            reorderExperience(arrayMove(experience, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Experience</h2>
                <Button onClick={addExperience} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={experience.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {experience.map((item) => (
                            <SortableExperienceItem
                                key={item.id}
                                item={item}
                                updateExperience={updateExperience}
                                removeExperience={removeExperience}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

interface SortableExperienceItemProps {
    item: ExperienceItem;
    updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
    removeExperience: (id: string) => void;
}

function SortableExperienceItem({ item, updateExperience, removeExperience }: SortableExperienceItemProps) {
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

    const handleChange = (field: keyof ExperienceItem, value: string | boolean) => {
        updateExperience(item.id, { [field]: value });
    };

    const handleAIAssist = () => {
        const suggestions = [
            "Collaborated with cross-functional teams to deliver high-quality software solutions.",
            "Optimized application performance, reducing load times by 40%.",
            "Mentored junior developers and conducted code reviews.",
            "Designed and implemented scalable RESTful APIs.",
            "Led the migration from legacy systems to modern cloud infrastructure."
        ];
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        handleChange('description', item.description + (item.description ? '\n• ' : '• ') + randomSuggestion);
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
                        <Label>Company</Label>
                        <Input
                            value={item.company}
                            onChange={(e) => handleChange('company', e.target.value)}
                            placeholder="Company Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                            value={item.position}
                            onChange={(e) => handleChange('position', e.target.value)}
                            placeholder="Job Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                            value={item.startDate}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            placeholder="MM/YYYY"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                            value={item.endDate}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            placeholder="MM/YYYY or Present"
                            disabled={item.current}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label>Location</Label>
                        <Input
                            value={item.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            placeholder="City, Country"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <div className="flex justify-between items-center">
                            <Label>Description</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-6 text-xs bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                onClick={handleAIAssist}
                            >
                                <Sparkles className="w-3 h-3 mr-1" />
                                AI Assist
                            </Button>
                        </div>
                        <Textarea
                            value={item.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                            className="min-h-[100px]"
                        />
                    </div>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExperience(item.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}

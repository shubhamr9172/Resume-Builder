'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { EducationItem } from '@/types/resume';

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResumeStore();
    const { education } = resumeData;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = education.findIndex((item) => item.id === active.id);
            const newIndex = education.findIndex((item) => item.id === over.id);
            reorderEducation(arrayMove(education, oldIndex, newIndex));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Education</h2>
                <Button onClick={addEducation} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={education.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {education.map((item) => (
                            <SortableEducationItem
                                key={item.id}
                                item={item}
                                updateEducation={updateEducation}
                                removeEducation={removeEducation}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

interface SortableEducationItemProps {
    item: EducationItem;
    updateEducation: (id: string, data: Partial<EducationItem>) => void;
    removeEducation: (id: string) => void;
}

function SortableEducationItem({ item, updateEducation, removeEducation }: SortableEducationItemProps) {
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

    const handleChange = (field: keyof EducationItem, value: string | boolean) => {
        updateEducation(item.id, { [field]: value });
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
                        <Label>Institution</Label>
                        <Input
                            value={item.institution}
                            onChange={(e) => handleChange('institution', e.target.value)}
                            placeholder="University Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                            value={item.degree}
                            onChange={(e) => handleChange('degree', e.target.value)}
                            placeholder="Bachelor's, Master's, etc."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Field of Study</Label>
                        <Input
                            value={item.fieldOfStudy}
                            onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                            placeholder="Computer Science"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Score / GPA</Label>
                        <Input
                            value={item.score || ''}
                            onChange={(e) => handleChange('score', e.target.value)}
                            placeholder="3.8/4.0"
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
                        />
                    </div>
                </div>
                <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeEducation(item.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </CardContent>
        </Card>
    );
}

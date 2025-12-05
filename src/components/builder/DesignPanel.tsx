'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const templates = [
    { id: 'minimal-classic', name: 'Minimal Classic', color: 'bg-gray-100' },
    { id: 'corporate-blue', name: 'Corporate Blue', color: 'bg-blue-100' },
    { id: 'modern-professional', name: 'Modern Professional', color: 'bg-zinc-100' },
];

const fonts = [
    { id: 'inter', name: 'Inter' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'lato', name: 'Lato' },
    { id: 'serif', name: 'Serif' },
];

export function DesignPanel() {
    const { resumeData, setTemplate, setFont } = useResumeStore();
    const { metadata } = resumeData;

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Choose Template</h2>
                <div className="grid grid-cols-2 gap-4">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className={cn(
                                "cursor-pointer border-2 rounded-lg p-4 hover:border-slate-400 transition-all relative bg-slate-800/50 backdrop-blur-sm",
                                metadata.template === template.id ? "border-slate-500 ring-2 ring-slate-500/50 shadow-lg shadow-slate-500/20" : "border-white/10 hover:bg-slate-700/50"
                            )}
                            onClick={() => setTemplate(template.id)}
                        >
                            <div className={cn("h-24 w-full rounded mb-3 shadow-md", template.color)}></div>
                            <div className="font-medium text-sm text-center text-white">{template.name}</div>
                            {metadata.template === template.id && (
                                <div className="absolute top-2 right-2 bg-slate-500 text-white rounded-full p-1 shadow-lg">
                                    <Check className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Typography</h2>
                <div className="space-y-2">
                    <Label className="text-gray-300">Font Family</Label>
                    <Select value={metadata.font} onValueChange={setFont}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Font" />
                        </SelectTrigger>
                        <SelectContent>
                            {fonts.map((font) => (
                                <SelectItem key={font.id} value={font.id}>
                                    {font.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </section>
        </div>
    );
}

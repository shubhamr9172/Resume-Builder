'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';

export function ResumePreview() {
    const { resumeData } = useResumeStore();

    return (
        <div className="w-full h-full bg-white text-black overflow-hidden">
            <TemplateRenderer data={resumeData} />
        </div>
    );
}

'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { MinimalClassic } from './MinimalClassic';
import { CorporateBlue } from './CorporateBlue';
import { ModernProfessional } from './ModernProfessional';

interface TemplateRendererProps {
    data: ResumeData;
}

export function TemplateRenderer({ data }: TemplateRendererProps) {
    const { template } = data.metadata;

    switch (template) {
        case 'minimal-classic':
            return <MinimalClassic data={data} />;
        case 'corporate-blue':
            return <CorporateBlue data={data} />;
        case 'modern-professional':
            return <ModernProfessional data={data} />;
        default:
            return <MinimalClassic data={data} />;
    }
}

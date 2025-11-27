import React from 'react';
import { ResumeData } from '@/types/resume';
import { ModernProfessionalPDF } from './pdf-templates/ModernProfessionalPDF';
import { MinimalClassicPDF } from './pdf-templates/MinimalClassicPDF';
import { CorporateBluePDF } from './pdf-templates/CorporateBluePDF';

interface ResumePDFProps {
    data: ResumeData;
}

export function ResumePDF({ data }: ResumePDFProps) {
    const { template } = data.metadata;

    switch (template) {
        case 'modern-professional':
            return <ModernProfessionalPDF data={data} />;
        case 'corporate-blue':
            return <CorporateBluePDF data={data} />;
        case 'minimal-classic':
        default:
            return <MinimalClassicPDF data={data} />;
    }
}

'use client';

import React, { useEffect, useState } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { ResumePDF } from './ResumePDF';
import { Button } from '@/components/ui/button';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { ResumeData } from '@/types/resume';

interface PDFDownloadButtonProps {
    data: ResumeData;
}

const PDFDownloadButton = ({ data }: PDFDownloadButtonProps) => {
    const [isClient, setIsClient] = useState(false);
    const [instance, updateInstance] = usePDF({ document: <ResumePDF data={data} /> });

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <Button disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
            </Button>
        );
    }

    if (instance.error) {
        return (
            <Button variant="destructive" disabled>
                <AlertCircle className="w-4 h-4 mr-2" />
                Error Generating PDF
            </Button>
        );
    }

    return (
        <Button disabled={instance.loading} asChild={!instance.loading}>
            {instance.loading ? (
                <span>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                </span>
            ) : (
                <a href={instance.url || '#'} download={`${data.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}.pdf`}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </a>
            )}
        </Button>
    );
};

export default PDFDownloadButton;

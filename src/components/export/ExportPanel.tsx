'use client';

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';

const PDFDownloadButton = dynamic(() => import('./PDFDownloadButton'), {
    ssr: false,
    loading: () => <div className="text-sm text-muted-foreground">Loading PDF generator...</div>
});

export function ExportPanel() {
    const { resumeData } = useResumeStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Export Resume</CardTitle>
                    <CardDescription>Download your resume in high-quality PDF format.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/50 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">PDF Document</h3>
                            <p className="text-sm text-muted-foreground">Best for applications and sharing</p>
                        </div>
                        <PDFDownloadButton data={resumeData} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import BuilderLayout from '@/components/builder/BuilderLayout';
import { Editor } from '@/components/builder/Editor';

export default function BuilderPage() {
    return (
        <BuilderLayout>
            <Editor />
        </BuilderLayout>
    );
}

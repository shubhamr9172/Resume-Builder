'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileText, Layout, Palette, Settings, Download, Share2, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ResumePreview } from './ResumePreview';
import { DesignPanel } from './DesignPanel';
import { ExportPanel } from '../export/ExportPanel';

interface BuilderLayoutProps {
    children: React.ReactNode;
}

export function BuilderLayout({ children }: BuilderLayoutProps) {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam || 'editor');
    const router = useRouter();

    useEffect(() => {
        if (tabParam && ['editor', 'design', 'settings', 'export'].includes(tabParam)) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Left Sidebar - Navigation */}
            <aside className="w-16 flex-shrink-0 border-r border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center py-4 gap-4">
                <button
                    onClick={() => router.push('/')}
                    className="p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg mb-2 transition-colors"
                    title="Home"
                >
                    <Home className="w-6 h-6 text-purple-400" />
                </button>
                <div className="w-10 h-px bg-white/10 mb-2"></div>

                <nav className="flex flex-col gap-2 w-full px-2">
                    <NavButton
                        icon={<Layout className="w-5 h-5" />}
                        label="Editor"
                        isActive={activeTab === 'editor'}
                        onClick={() => setActiveTab('editor')}
                    />
                    <NavButton
                        icon={<Palette className="w-5 h-5" />}
                        label="Design"
                        isActive={activeTab === 'design'}
                        onClick={() => setActiveTab('design')}
                    />
                    <NavButton
                        icon={<Settings className="w-5 h-5" />}
                        label="Settings"
                        isActive={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                </nav>

                <div className="mt-auto flex flex-col gap-2 w-full px-2">
                    <NavButton
                        icon={<Download className="w-5 h-5" />}
                        label="Export"
                        isActive={activeTab === 'export'}
                        onClick={() => setActiveTab('export')}
                    />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden">
                {/* Editor Panel (Left/Center) */}
                <div className="w-1/2 border-r border-white/10 bg-slate-800/50 backdrop-blur-sm flex flex-col">
                    <header className="h-14 border-b border-white/10 flex items-center px-6 justify-between flex-shrink-0 bg-white/5">
                        <h1 className="font-semibold text-lg text-white">
                            {activeTab === 'editor' && 'Content Editor'}
                            {activeTab === 'design' && 'Design & Templates'}
                            {activeTab === 'settings' && 'Settings'}
                            {activeTab === 'export' && 'Export Resume'}
                        </h1>
                    </header>
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <div className="max-w-2xl mx-auto space-y-8 pb-20">
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                {activeTab === 'editor' && children}
                                {activeTab === 'design' && <DesignPanel />}
                                {activeTab === 'settings' && <div className="text-center text-gray-400 mt-10">Settings coming soon...</div>}
                                {activeTab === 'export' && <ExportPanel />}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview Panel (Right) */}
                <div className="w-1/2 bg-slate-800/30 flex flex-col">
                    <header className="h-14 border-b border-white/10 flex items-center px-6 justify-between bg-white/5 backdrop-blur flex-shrink-0">
                        <span className="text-sm text-gray-300">Live Preview</span>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </header>
                    <div className="flex-1 p-8 overflow-y-auto flex justify-center bg-slate-900/50">
                        <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm origin-top transform scale-[0.6] lg:scale-[0.7] xl:scale-[0.85] transition-all duration-300 hover:shadow-purple-500/20">
                            <ResumePreview />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
    return (
        <Button
            variant={isActive ? "secondary" : "ghost"}
            size="icon"
            className={cn(
                "w-full h-12 rounded-lg mb-1 transition-all duration-200",
                isActive ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-purple-400 hover:bg-white/5"
            )}
            onClick={onClick}
            title={label}
        >
            {icon}
        </Button>
    )
}

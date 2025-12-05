'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutTemplate,
    Palette,
    FileText,
    Download,
    Home,
    Settings,
    ChevronLeft,
    ChevronRight,
    User,
    Briefcase,
    GraduationCap,
    Code,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePDF } from '@react-pdf/renderer';
import ResumeDocument from '@/components/templates/ResumeDocument';
import { useResumeStore } from '@/store/useResumeStore';

interface BuilderLayoutProps {
    children: React.ReactNode;
}

export default function BuilderLayout({ children }: BuilderLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { resumeData, selectedTemplate, themeColor } = useResumeStore();
    const [instance, updateInstance] = usePDF({ document: <ResumeDocument data={resumeData} template={selectedTemplate} themeColor={themeColor} /> });

    // Handle PDF Download
    const handleDownload = () => {
        if (instance.url) {
            const link = document.createElement('a');
            link.href = instance.url;
            link.download = `resume_${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-20 lg:w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between py-6 transition-all duration-300 z-50">
                <div className="px-4">
                    <Link href="/" className="flex items-center gap-3 mb-12 pl-2">
                        <div className="p-2 bg-slate-500/20 hover:bg-slate-500/30 rounded-lg mb-2 transition-colors">
                            <Home className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="hidden lg:block text-xl font-bold text-white tracking-tight">SmartResume</span>
                    </Link>

                    <nav className="space-y-2">
                        <NavItem icon={<FileText />} label="Content" href="/builder" active={pathname === '/builder'} />
                        <NavItem icon={<Palette />} label="Design" href="/builder?tab=design" active={pathname.includes('design')} />
                    </nav>
                </div>

                <div className="px-4">
                    <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 mb-4 hidden lg:block">
                        <p className="text-xs text-gray-400 mb-2">Completion Status</p>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-400 w-3/4 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden relative">

                {/* Left Panel: Form / Editor */}
                <div className="w-full lg:w-1/2 xl:w-5/12 h-full overflow-y-auto p-6 lg:p-10 scrollbar-hide pb-32">
                    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>

                {/* Right Panel: Live Preview (Desktop Only) */}
                <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 bg-slate-950/50 relative items-center justify-center p-8 border-l border-white/5">

                    {/* Toolbar */}
                    <div className="absolute top-6 right-6 flex gap-3 z-40">
                        <div className="flex bg-slate-900/80 backdrop-blur-md rounded-full p-1 border border-white/10">
                            <Button
                                onClick={handleDownload}
                                disabled={instance.loading}
                                className="rounded-full bg-slate-600 hover:bg-slate-500 text-white px-6"
                            >
                                {instance.loading ? 'Generating...' : <><Download className="w-4 h-4 mr-2" /> Download PDF</>}
                            </Button>
                        </div>
                    </div>

                    {/* Resume Preview */}
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm origin-top transform scale-[0.6] lg:scale-[0.7] xl:scale-[0.85] transition-all duration-300 hover:shadow-slate-500/20">
                            {/* This would be the actual PDF Viewer or HTML Preview */}
                            <ResumeDocument data={resumeData} template={selectedTemplate} themeColor={themeColor} isPreview={true} />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active: boolean }) {
    const router = useRouter();
    const isActive = active;

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => router.push(href)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                            isActive ? "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 shadow-lg shadow-slate-500/20" : "text-gray-400 hover:text-slate-400 hover:bg-white/5"
                        )}
                    >
                        <span className={cn("transition-transform duration-200", isActive && "scale-110")}>{icon}</span>
                        <span className="hidden lg:block font-medium">{label}</span>
                        {isActive && <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-400 hidden lg:block" />}
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden bg-slate-800 text-white border-white/10">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

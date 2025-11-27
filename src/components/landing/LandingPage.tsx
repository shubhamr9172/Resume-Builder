'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Sparkles, Eye, Download, Zap, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ATSChecker } from './ATSChecker';

export function LandingPage() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/builder');
    };

    const handleViewTemplates = () => {
        router.push('/builder?tab=design');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="w-8 h-8 text-purple-400" />
                        <span className="text-2xl font-bold text-white">SmartResume Pro</span>
                    </div>
                    <Button onClick={handleGetStarted} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full">
                                <span className="text-purple-300 text-sm font-medium flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    AI-Powered Resume Builder
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                                Build Your Perfect Resume in
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Minutes</span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Create stunning, ATS-friendly resumes with our intuitive builder.
                                Choose from professional templates, customize effortlessly, and download as PDF.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleGetStarted} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all">
                                    Start Building Free
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <Button onClick={handleViewTemplates} size="lg" variant="outline" className="border-2 border-purple-400 bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-6 rounded-xl">
                                    View Templates
                                </Button>
                            </div>
                            <div className="flex items-center gap-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>No Credit Card</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Free Forever</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <Image
                                    src="/hero-illustration.png"
                                    alt="Resume Builder Illustration"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto rounded-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Everything You Need to Stand Out
                        </h2>
                        <p className="text-xl text-gray-300">
                            Powerful features to create your dream resume
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<Sparkles className="w-8 h-8" />}
                            title="Professional Templates"
                            description="Choose from beautiful, ATS-friendly designs crafted by experts"
                            gradient="from-purple-500 to-pink-500"
                        />
                        <FeatureCard
                            icon={<Eye className="w-8 h-8" />}
                            title="Real-time Preview"
                            description="See your changes instantly with live preview as you type"
                            gradient="from-blue-500 to-cyan-500"
                        />
                        <FeatureCard
                            icon={<Download className="w-8 h-8" />}
                            title="Easy Export"
                            description="Download your perfect resume as a high-quality PDF in one click"
                            gradient="from-green-500 to-emerald-500"
                        />
                        <FeatureCard
                            icon={<Zap className="w-8 h-8" />}
                            title="Smart Design"
                            description="Auto-formatted layouts that adapt to your content perfectly"
                            gradient="from-orange-500 to-red-500"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-300">
                            Three simple steps to your perfect resume
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>

                        <StepCard
                            number="1"
                            title="Choose Template"
                            description="Select from our collection of professionally designed templates"
                        />
                        <StepCard
                            number="2"
                            title="Fill Details"
                            description="Add your information with our intuitive editor and real-time preview"
                        />
                        <StepCard
                            number="3"
                            title="Download"
                            description="Export your polished resume as a PDF and start applying"
                        />
                    </div>
                </div>
            </section>

            {/* ATS Checker Section */}
            <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <ATSChecker />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl shadow-purple-500/50">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Start Building Your Resume Today
                        </h2>
                        <p className="text-xl text-purple-100 mb-8">
                            Join thousands of professionals who landed their dream job with SmartResume Pro
                        </p>
                        <Button onClick={handleGetStarted} size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-6 rounded-xl shadow-lg">
                            Get Started Free
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <FileText className="w-6 h-6 text-purple-400" />
                        <span className="text-xl font-bold text-white">SmartResume Pro</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                        Build professional resumes in minutes
                    </p>
                    <p className="text-gray-500 text-sm">
                        © 2025 SmartResume Pro. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description, gradient }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
}) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className={`inline-flex p-3 bg-gradient-to-br ${gradient} rounded-xl mb-4 shadow-lg`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-3xl font-bold text-white mb-4 shadow-lg relative z-10">
                {number}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
}

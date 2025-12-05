'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ATSIssue {
    type: 'contact' | 'formatting' | 'keywords' | 'experience' | 'skills';
    message: string;
    severity: 'high' | 'medium' | 'low';
}

interface ATSResult {
    score: number;
    issues: ATSIssue[];
}

export function ATSChecker() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<ATSResult | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const analyzeResume = async (text: string): Promise<ATSResult> => {
        let score = 70; // Base score
        const issues: ATSIssue[] = [];

        // Check for email
        if (!text.match(/[\w.-]+@[\w.-]+\.\w+/)) {
            score -= 10;
            issues.push({
                type: 'contact',
                message: 'Add a professional email address',
                severity: 'high'
            });
        }

        // Check for phone
        if (!text.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
            score -= 5;
            issues.push({
                type: 'contact',
                message: 'Include a phone number for better reach',
                severity: 'medium'
            });
        }

        // Check for common sections
        const sections = [
            { name: 'experience', weight: 10 },
            { name: 'education', weight: 8 },
            { name: 'skills', weight: 7 }
        ];

        sections.forEach(section => {
            if (!text.toLowerCase().includes(section.name)) {
                score -= section.weight;
                issues.push({
                    type: 'formatting',
                    message: `Add a clear "${section.name}" section header`,
                    severity: 'high'
                });
            }
        });

        // Check for action verbs
        const actionVerbs = ['managed', 'developed', 'led', 'improved', 'achieved', 'created', 'implemented', 'designed'];
        const foundVerbs = actionVerbs.filter(verb => text.toLowerCase().includes(verb));

        if (foundVerbs.length < 3) {
            score -= 5;
            issues.push({
                type: 'keywords',
                message: 'Use more action verbs (managed, developed, led, etc.)',
                severity: 'medium'
            });
        } else {
            score += Math.min(10, foundVerbs.length * 2);
        }

        // Check for quantifiable achievements
        const hasNumbers = text.match(/\d+%|\$\d+|increased|decreased|improved by/gi);
        if (!hasNumbers || hasNumbers.length < 2) {
            issues.push({
                type: 'experience',
                message: 'Add quantifiable achievements (numbers, percentages, $)',
                severity: 'medium'
            });
        } else {
            score += 5;
        }

        // Word count check
        const wordCount = text.split(/\s+/).length;
        if (wordCount < 200) {
            score -= 10;
            issues.push({
                type: 'formatting',
                message: 'Resume appears too short. Add more details',
                severity: 'high'
            });
        } else if (wordCount > 1000) {
            issues.push({
                type: 'formatting',
                message: 'Resume may be too long. Keep it concise',
                severity: 'low'
            });
        }

        return {
            score: Math.min(100, Math.max(0, score)),
            issues: issues.slice(0, 6) // Limit to top 6 issues
        };
    };

    const handleFileChange = async (selectedFile: File) => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setAnalyzing(true);
            setResult(null);

            // Simulate analysis delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock text extraction (in production, would use PDF parser)
            const mockText = `
                John Doe
                john.doe@email.com
                (555) 123-4567
                
                Experience
                Senior Developer at Tech Corp
                Developed and led team projects
                Improved system performance by 40%
                
                Education
                BS Computer Science
                
                Skills
                JavaScript, React, Node.js
            `;

            const analysisResult = await analyzeResume(mockText);
            setResult(analysisResult);
            setAnalyzing(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 71) return 'text-green-400';
        if (score >= 41) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 71) return 'Good';
        if (score >= 41) return 'Fair';
        return 'Needs Work';
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'high':
                return <AlertCircle className="w-4 h-4 text-red-400" />;
            case 'medium':
                return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            default:
                return <CheckCircle className="w-4 h-4 text-blue-400" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Check Your Resume's ATS Score
                </h2>
                <p className="text-xl text-gray-300">
                    Upload your resume and get instant feedback on how well it performs with Applicant Tracking Systems
                </p>
            </div>

            {/* Upload Area */}
            <div
                className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center transition-all",
                    dragActive ? "border-slate-400 bg-slate-500/10" : "border-white/20 bg-white/5",
                    !result && "backdrop-blur-sm"
                )}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
            >
                {!file && !analyzing && (
                    <>
                        <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Drop your resume here
                        </h3>
                        <p className="text-gray-400 mb-4">or</p>
                        <Button
                            onClick={() => document.getElementById('resume-upload')?.click()}
                            className="bg-slate-600 hover:bg-slate-700 text-white"
                        >
                            Browse Files
                        </Button>
                        <p className="text-sm text-gray-500 mt-4">PDF files only, max 5MB</p>
                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                        />
                    </>
                )}

                {analyzing && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white text-lg">Analyzing your resume...</p>
                    </div>
                )}
            </div>

            {/* Results */}
            {result && !analyzing && (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Score Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                        <h3 className="text-lg text-gray-300 mb-4">ATS Compatibility Score</h3>
                        <div className="relative inline-flex items-center justify-center mb-4">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    className="text-white/10"
                                />
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 70}`}
                                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.score / 100)}`}
                                    className={cn("transition-all duration-1000", getScoreColor(result.score))}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute">
                                <div className={cn("text-5xl font-bold", getScoreColor(result.score))}>
                                    {result.score}
                                </div>
                                <div className="text-gray-400 text-sm">out of 100</div>
                            </div>
                        </div>
                        <div className={cn("text-2xl font-semibold", getScoreColor(result.score))}>
                            {getScoreLabel(result.score)}
                        </div>
                    </div>

                    {/* Suggestions Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                            <h3 className="text-lg font-semibold text-white">Improvement Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                            {result.issues.length === 0 ? (
                                <div className="flex items-center gap-2 text-green-400">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Great job! Your resume looks ATS-friendly.</span>
                                </div>
                            ) : (
                                result.issues.map((issue, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 animate-in fade-in slide-in-from-left-4"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {getSeverityIcon(issue.severity)}
                                        <span className="text-gray-300 text-sm flex-1">{issue.message}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <Button
                            onClick={() => {
                                setFile(null);
                                setResult(null);
                            }}
                            variant="outline"
                            className="w-full mt-6 border-slate-400 text-slate-400 hover:bg-slate-500/10"
                        >
                            Check Another Resume
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

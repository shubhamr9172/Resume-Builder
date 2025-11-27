import React from 'react';
import { ResumeData } from '@/types/resume';

export function ModernProfessional({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="p-8 font-sans text-sm text-gray-800 h-full flex flex-col gap-6">
            {/* Header */}
            <header className="flex justify-between items-start border-b-4 border-black pb-6">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2">{personalInfo.fullName}</h1>
                    <p className="text-xl text-gray-600 font-light">{experience[0]?.position || 'Professional'}</p>
                </div>
                <div className="text-right text-sm space-y-1">
                    <div className="font-bold">{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.location}</div>
                    <div className="text-blue-600">{personalInfo.linkedin}</div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (Main) */}
                <div className="col-span-8 space-y-8">
                    {summary && (
                        <section>
                            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                PROFILE
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-base">{summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6">
                                {experience.map((item) => (
                                    <div key={item.id} className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute -left-[5px] top-2 w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg">{item.position}</h3>
                                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                                {item.startDate} – {item.current ? 'Present' : item.endDate}
                                            </span>
                                        </div>
                                        <div className="text-gray-600 font-medium mb-2">{item.company} | {item.location}</div>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-full"></span>
                                PROJECTS
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((item) => (
                                    <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2 font-mono">{item.technologies.join(' • ')}</p>
                                        <p className="text-sm text-gray-700">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 space-y-8">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black mb-4 border-b-2 border-black pb-2">EDUCATION</h2>
                            <div className="space-y-4">
                                {education.map((item) => (
                                    <div key={item.id}>
                                        <h3 className="font-bold">{item.institution}</h3>
                                        <div className="text-sm">{item.degree}</div>
                                        <div className="text-sm text-gray-600">{item.fieldOfStudy}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {item.startDate} – {item.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-black mb-4 border-b-2 border-black pb-2">SKILLS</h2>
                            <div className="space-y-2">
                                {skills.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-xs text-gray-500">{item.level}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-black"
                                                style={{
                                                    width: item.level === 'Expert' ? '100%' :
                                                        item.level === 'Advanced' ? '75%' :
                                                            item.level === 'Intermediate' ? '50%' : '25%'
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

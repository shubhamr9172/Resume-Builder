import React from 'react';
import { ResumeData } from '@/types/resume';

export function CorporateBlue({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="p-8 font-sans text-sm text-gray-800 h-full">
            {/* Header */}
            <header className="bg-blue-900 text-white p-8 -mx-8 -mt-8 mb-8">
                <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
                <div className="text-blue-100 text-sm flex flex-wrap gap-4">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                </div>
            </header>

            <div className="grid grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="col-span-2 space-y-6">
                    {summary && (
                        <section>
                            <h2 className="text-blue-900 font-bold uppercase tracking-wider border-b-2 border-blue-900 mb-3 pb-1">Profile</h2>
                            <p className="text-gray-700 leading-relaxed">{summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-blue-900 font-bold uppercase tracking-wider border-b-2 border-blue-900 mb-3 pb-1">Experience</h2>
                            <div className="space-y-4">
                                {experience.map((item) => (
                                    <div key={item.id}>
                                        <h3 className="font-bold text-lg">{item.position}</h3>
                                        <div className="text-blue-800 font-medium mb-1">{item.company}</div>
                                        <p className="text-gray-600 text-xs mb-2">
                                            {item.startDate} – {item.current ? 'Present' : item.endDate} | {item.location}
                                        </p>
                                        <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-blue-900 font-bold uppercase tracking-wider border-b-2 border-blue-900 mb-3 pb-1">Projects</h2>
                            <div className="space-y-4">
                                {projects.map((item) => (
                                    <div key={item.id}>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-xs text-gray-500 mb-1">{item.technologies.join(', ')}</p>
                                        <p className="text-gray-700">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-blue-900 font-bold uppercase tracking-wider border-b-2 border-blue-900 mb-3 pb-1">Education</h2>
                            <div className="space-y-4">
                                {education.map((item) => (
                                    <div key={item.id}>
                                        <h3 className="font-bold">{item.institution}</h3>
                                        <div className="text-sm">{item.degree}</div>
                                        <div className="text-sm text-gray-600">{item.fieldOfStudy}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {item.startDate} – {item.current ? 'Present' : item.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-blue-900 font-bold uppercase tracking-wider border-b-2 border-blue-900 mb-3 pb-1">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((item) => (
                                    <span key={item.id} className="bg-blue-50 text-blue-900 px-2 py-1 rounded text-xs font-medium">
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

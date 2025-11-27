import React from 'react';
import { ResumeData } from '@/types/resume';

export function MinimalClassic({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <div className="p-8 font-serif text-sm leading-relaxed text-gray-800 h-full">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personalInfo.fullName}</h1>
                <div className="flex flex-wrap justify-center gap-3 text-gray-600 text-xs">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.location && <span>• {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                    {personalInfo.website && <span>• {personalInfo.website}</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Professional Summary</h2>
                    <p>{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{item.position}</h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                        {item.startDate} – {item.current ? 'Present' : item.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="italic font-medium">{item.company}</span>
                                    <span className="text-xs text-gray-500">{item.location}</span>
                                </div>
                                <p className="whitespace-pre-line">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Education</h2>
                    <div className="space-y-3">
                        {education.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{item.institution}</h3>
                                    <span className="text-xs text-gray-500">
                                        {item.startDate} – {item.current ? 'Present' : item.endDate}
                                    </span>
                                </div>
                                <div>
                                    <span>{item.degree} in {item.fieldOfStudy}</span>
                                    {item.score && <span className="text-gray-500 ml-2">(GPA: {item.score})</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {skills.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <span className="font-medium mr-1">{item.name}</span>
                                <span className="text-xs text-gray-500">({item.level})</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 mb-3 pb-1">Projects</h2>
                    <div className="space-y-3">
                        {projects.map((item) => (
                            <div key={item.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{item.name}</h3>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">
                                            Link
                                        </a>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mb-1">
                                    {item.technologies.join(', ')}
                                </p>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

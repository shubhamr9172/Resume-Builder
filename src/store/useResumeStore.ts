import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ExperienceItem, EducationItem, SkillItem, ProjectItem, PersonalInfo } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
    resumeData: ResumeData;
    updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
    updateSummary: (summary: string) => void;
    addExperience: () => void;
    updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
    removeExperience: (id: string) => void;
    reorderExperience: (items: ExperienceItem[]) => void;
    addEducation: () => void;
    updateEducation: (id: string, data: Partial<EducationItem>) => void;
    removeEducation: (id: string) => void;
    reorderEducation: (items: EducationItem[]) => void;
    addSkill: (data: Partial<SkillItem>) => void;
    updateSkill: (id: string, data: Partial<SkillItem>) => void;
    removeSkill: (id: string) => void;
    reorderSkills: (items: SkillItem[]) => void;
    addProject: () => void;
    updateProject: (id: string, data: Partial<ProjectItem>) => void;
    removeProject: (id: string) => void;
    reorderProjects: (items: ProjectItem[]) => void;
    setTemplate: (templateId: string) => void;
    setAccentColor: (color: string) => void;
    setFont: (font: string) => void;
    resetResume: () => void;
}

const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    customSections: [],
    metadata: {
        template: 'minimal-classic',
        font: 'inter',
        accentColor: '#000000',
        layout: 'single-column',
        sectionOrder: ['experience', 'education', 'skills', 'projects'],
    },
};

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
            resumeData: initialResumeData,

            updatePersonalInfo: (data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        personalInfo: { ...state.resumeData.personalInfo, ...data },
                    },
                })),

            updateSummary: (summary) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, summary },
                })),

            addExperience: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: [
                            ...state.resumeData.experience,
                            {
                                id: uuidv4(),
                                company: '',
                                position: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                                location: '',
                                description: '',
                            },
                        ],
                    },
                })),

            updateExperience: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.map((item) =>
                            item.id === id ? { ...item, ...data } : item
                        ),
                    },
                })),

            removeExperience: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.filter((item) => item.id !== id),
                    },
                })),

            reorderExperience: (items) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, experience: items },
                })),

            addEducation: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: [
                            ...state.resumeData.education,
                            {
                                id: uuidv4(),
                                institution: '',
                                degree: '',
                                fieldOfStudy: '',
                                startDate: '',
                                endDate: '',
                                current: false,
                            },
                        ],
                    },
                })),

            updateEducation: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.map((item) =>
                            item.id === id ? { ...item, ...data } : item
                        ),
                    },
                })),

            removeEducation: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.filter((item) => item.id !== id),
                    },
                })),

            reorderEducation: (items) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, education: items },
                })),

            addSkill: (data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: [
                            ...state.resumeData.skills,
                            { id: uuidv4(), name: '', level: 'Intermediate', ...data },
                        ],
                    },
                })),

            updateSkill: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.map((item) =>
                            item.id === id ? { ...item, ...data } : item
                        ),
                    },
                })),

            removeSkill: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.filter((item) => item.id !== id),
                    },
                })),

            reorderSkills: (items) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, skills: items },
                })),

            addProject: () =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: [
                            ...state.resumeData.projects,
                            {
                                id: uuidv4(),
                                name: '',
                                description: '',
                                technologies: [],
                            },
                        ],
                    },
                })),

            updateProject: (id, data) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: state.resumeData.projects.map((item) =>
                            item.id === id ? { ...item, ...data } : item
                        ),
                    },
                })),

            removeProject: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: state.resumeData.projects.filter((item) => item.id !== id),
                    },
                })),

            reorderProjects: (items) =>
                set((state) => ({
                    resumeData: { ...state.resumeData, projects: items },
                })),

            setTemplate: (template) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        metadata: { ...state.resumeData.metadata, template },
                    },
                })),

            setAccentColor: (color) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        metadata: { ...state.resumeData.metadata, accentColor: color },
                    },
                })),

            setFont: (font) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        metadata: { ...state.resumeData.metadata, font },
                    },
                })),

            resetResume: () => set({ resumeData: initialResumeData }),
        }),
        {
            name: 'resume-storage',
        }
    )
);

'use client';

import React, { useState } from 'react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { Button } from '@/components/ui/button';
import { User, Briefcase, GraduationCap, Wrench, FolderGit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'projects';

export function Editor() {
    const [activeSection, setActiveSection] = useState<Section>('personal');

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'personal':
                return <PersonalInfoForm />;
            case 'experience':
                return <ExperienceForm />;
            case 'education':
                return <EducationForm />;
            case 'skills':
                return <SkillsForm />;
            case 'projects':
                return <ProjectsForm />;
            default:
                return <PersonalInfoForm />;
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
                <SectionButton
                    active={activeSection === 'personal'}
                    onClick={() => setActiveSection('personal')}
                    icon={<User className="w-4 h-4" />}
                    label="Personal"
                />
                <SectionButton
                    active={activeSection === 'experience'}
                    onClick={() => setActiveSection('experience')}
                    icon={<Briefcase className="w-4 h-4" />}
                    label="Experience"
                />
                <SectionButton
                    active={activeSection === 'education'}
                    onClick={() => setActiveSection('education')}
                    icon={<GraduationCap className="w-4 h-4" />}
                    label="Education"
                />
                <SectionButton
                    active={activeSection === 'skills'}
                    onClick={() => setActiveSection('skills')}
                    icon={<Wrench className="w-4 h-4" />}
                    label="Skills"
                />
                <SectionButton
                    active={activeSection === 'projects'}
                    onClick={() => setActiveSection('projects')}
                    icon={<FolderGit2 className="w-4 h-4" />}
                    label="Projects"
                />
            </div>

            <div className="min-h-[500px]">
                {renderActiveSection()}
            </div>
        </div>
    );
}

function SectionButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <Button
            variant={active ? "default" : "ghost"}
            size="sm"
            onClick={onClick}
            className={cn("flex items-center gap-2", active && "shadow-sm")}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </Button>
    );
}

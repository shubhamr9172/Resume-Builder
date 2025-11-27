'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PersonalInfoForm() {
    const { resumeData, updatePersonalInfo } = useResumeStore();
    const { personalInfo } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={personalInfo.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={personalInfo.location}
                            onChange={handleChange}
                            placeholder="New York, NY"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                            id="website"
                            name="website"
                            value={personalInfo.website}
                            onChange={handleChange}
                            placeholder="https://johndoe.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            name="linkedin"
                            value={personalInfo.linkedin}
                            onChange={handleChange}
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                            id="github"
                            name="github"
                            value={personalInfo.github}
                            onChange={handleChange}
                            placeholder="github.com/johndoe"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

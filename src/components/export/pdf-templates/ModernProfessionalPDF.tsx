import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1f2937',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 4,
        borderBottomColor: '#000',
        paddingBottom: 20,
        marginBottom: 24,
    },
    headerLeft: {
        flex: 1,
    },
    name: {
        fontSize: 32,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    headerRight: {
        alignItems: 'flex-end',
        fontSize: 9,
    },
    contactLine: {
        marginBottom: 2,
    },
    contactBold: {
        fontFamily: 'Helvetica-Bold',
    },
    contactLink: {
        color: '#2563eb',
    },
    container: {
        flexDirection: 'row',
        gap: 32,
    },
    leftColumn: {
        flex: 2,
    },
    rightColumn: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 6,
    },
    bullet: {
        width: 6,
        height: 6,
        backgroundColor: '#000',
        borderRadius: 3,
    },
    sectionTitle: {
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 0.5,
    },
    item: {
        marginBottom: 16,
        paddingLeft: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#e5e7eb',
        position: 'relative',
    },
    itemDot: {
        position: 'absolute',
        left: -4,
        top: 8,
        width: 6,
        height: 6,
        backgroundColor: '#9ca3af',
        borderRadius: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 3,
    },
    itemTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
    },
    itemDate: {
        fontSize: 8,
        fontFamily: 'Courier',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 2,
    },
    itemCompany: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#4b5563',
        marginBottom: 6,
    },
    itemLocation: {
        fontSize: 9,
        color: '#6b7280',
    },
    description: {
        fontSize: 10,
        color: '#374151',
        lineHeight: 1.5,
    },
    sidebarSection: {
        marginBottom: 24,
    },
    sidebarTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingBottom: 6,
        marginBottom: 12,
    },
    sidebarItem: {
        marginBottom: 12,
    },
    sidebarItemTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 2,
    },
    sidebarItemText: {
        fontSize: 9,
        marginBottom: 1,
    },
    sidebarItemDate: {
        fontSize: 8,
        color: '#9ca3af',
        marginTop: 2,
    },
    skillsContainer: {
        gap: 6,
    },
    skillItem: {
        marginBottom: 8,
    },
    skillHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    skillName: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
    },
    skillLevel: {
        fontSize: 8,
        color: '#6b7280',
    },
    skillBar: {
        width: '100%',
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
    },
    skillProgress: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 2,
    },
    projectBox: {
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 4,
        marginBottom: 12,
    },
    projectName: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },
    projectTech: {
        fontSize: 8,
        color: '#6b7280',
        fontFamily: 'Courier',
        marginBottom: 4,
    },
    projectDesc: {
        fontSize: 9,
        color: '#374151',
    },
});

const getSkillWidth = (level: string) => {
    switch (level) {
        case 'Expert': return '100%';
        case 'Advanced': return '75%';
        case 'Intermediate': return '50%';
        default: return '25%';
    }
};

export function ModernProfessionalPDF({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{personalInfo.fullName}</Text>
                        <Text style={styles.subtitle}>{experience[0]?.position || 'Professional'}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        {personalInfo.email && (
                            <Text style={[styles.contactLine, styles.contactBold]}>{personalInfo.email}</Text>
                        )}
                        {personalInfo.phone && <Text style={styles.contactLine}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.contactLine}>{personalInfo.location}</Text>}
                        {personalInfo.linkedin && (
                            <Text style={[styles.contactLine, styles.contactLink]}>{personalInfo.linkedin}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.container}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        {/* Profile */}
                        {summary && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.sectionTitle}>PROFILE</Text>
                                </View>
                                <Text style={[styles.description, { fontSize: 11 }]}>{summary}</Text>
                            </View>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                                </View>
                                {experience.map((item) => (
                                    <View key={item.id} style={styles.item}>
                                        <View style={styles.itemDot} />
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{item.position}</Text>
                                            <Text style={styles.itemDate}>
                                                {item.startDate} – {item.current ? 'Present' : item.endDate}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.itemCompany}>{item.company}</Text>
                                            <Text style={styles.itemLocation}>{item.location}</Text>
                                        </View>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <View style={styles.section}>
                                <View style={styles.sectionHeader}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.sectionTitle}>PROJECTS</Text>
                                </View>
                                {projects.map((item) => (
                                    <View key={item.id} style={styles.projectBox}>
                                        <Text style={styles.projectName}>{item.name}</Text>
                                        <Text style={styles.projectTech}>{item.technologies.join(' • ')}</Text>
                                        <Text style={styles.projectDesc}>{item.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Education */}
                        {education.length > 0 && (
                            <View style={styles.sidebarSection}>
                                <Text style={styles.sidebarTitle}>EDUCATION</Text>
                                {education.map((item) => (
                                    <View key={item.id} style={styles.sidebarItem}>
                                        <Text style={styles.sidebarItemTitle}>{item.institution}</Text>
                                        <Text style={styles.sidebarItemText}>{item.degree}</Text>
                                        <Text style={styles.sidebarItemText}>{item.fieldOfStudy}</Text>
                                        <Text style={styles.sidebarItemDate}>
                                            {item.startDate} – {item.endDate}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <View style={styles.sidebarSection}>
                                <Text style={styles.sidebarTitle}>SKILLS</Text>
                                <View style={styles.skillsContainer}>
                                    {skills.map((item) => (
                                        <View key={item.id} style={styles.skillItem}>
                                            <View style={styles.skillHeader}>
                                                <Text style={styles.skillName}>{item.name}</Text>
                                                <Text style={styles.skillLevel}>{item.level}</Text>
                                            </View>
                                            <View style={styles.skillBar}>
                                                <View style={[styles.skillProgress, { width: getSkillWidth(item.level) }]} />
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
}

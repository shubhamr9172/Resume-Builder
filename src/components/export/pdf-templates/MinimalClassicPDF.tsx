import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        fontSize: 10,
        color: '#1f2937',
        lineHeight: 1.6,
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: '#1f2937',
        paddingBottom: 12,
        marginBottom: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
    },
    contact: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        fontSize: 8,
        color: '#6b7280',
    },
    contactText: {
        marginHorizontal: 4,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontFamily: 'Times-Bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
        paddingBottom: 4,
        marginBottom: 10,
    },
    item: {
        marginBottom: 12,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    itemTitle: {
        fontSize: 10,
        fontFamily: 'Times-Bold',
    },
    itemDate: {
        fontSize: 8,
        color: '#6b7280',
    },
    itemSubtitle: {
        fontSize: 10,
        fontFamily: 'Times-Italic',
        marginBottom: 2,
    },
    itemLocation: {
        fontSize: 8,
        color: '#6b7280',
    },
    description: {
        fontSize: 10,
        marginTop: 4,
        lineHeight: 1.5,
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    skillName: {
        fontSize: 9,
        fontFamily: 'Times-Bold',
        marginRight: 3,
    },
    skillLevel: {
        fontSize: 8,
        color: '#6b7280',
    },
    projectItem: {
        marginBottom: 12,
    },
    projectName: {
        fontSize: 10,
        fontFamily: 'Times-Bold',
        marginBottom: 3,
    },
    projectTech: {
        fontSize: 8,
        color: '#6b7280',
        marginBottom: 3,
    },
    projectLink: {
        fontSize: 8,
        color: '#2563eb',
    },
});

export function MinimalClassicPDF({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{personalInfo.fullName}</Text>
                    <View style={styles.contact}>
                        {personalInfo.email && <Text style={styles.contactText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.contactText}>• {personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.contactText}>• {personalInfo.location}</Text>}
                        {personalInfo.linkedin && <Text style={styles.contactText}>• {personalInfo.linkedin}</Text>}
                        {personalInfo.website && <Text style={styles.contactText}>• {personalInfo.website}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.description}>{summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemTitle}>{item.position}</Text>
                                    <Text style={styles.itemDate}>
                                        {item.startDate} – {item.current ? 'Present' : item.endDate}
                                    </Text>
                                </View>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemSubtitle}>{item.company}</Text>
                                    <Text style={styles.itemLocation}>{item.location}</Text>
                                </View>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemTitle}>{item.institution}</Text>
                                    <Text style={styles.itemDate}>
                                        {item.startDate} – {item.current ? 'Present' : item.endDate}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.description}>
                                        {item.degree} in {item.fieldOfStudy}
                                    </Text>
                                    {item.score && (
                                        <Text style={styles.itemDate}>GPA: {item.score}</Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsGrid}>
                            {skills.map((item) => (
                                <View key={item.id} style={styles.skillItem}>
                                    <Text style={styles.skillName}>{item.name}</Text>
                                    <Text style={styles.skillLevel}>({item.level})</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {projects.map((item) => (
                            <View key={item.id} style={styles.projectItem}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.projectName}>{item.name}</Text>
                                    {item.link && <Text style={styles.projectLink}>Link</Text>}
                                </View>
                                <Text style={styles.projectTech}>{item.technologies.join(', ')}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}

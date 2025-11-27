import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#1f2937',
    },
    header: {
        backgroundColor: '#1e3a8a',
        padding: 32,
        marginBottom: 32,
    },
    headerName: {
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    headerContact: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 9,
        color: '#bfdbfe',
    },
    mainContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
    },
    leftColumn: {
        flex: 2,
        paddingRight: 24,
    },
    rightColumn: {
        flex: 1,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#1e3a8a',
        textTransform: 'uppercase',
        letterSpacing: 1,
        borderBottomWidth: 2,
        borderBottomColor: '#1e3a8a',
        paddingBottom: 3,
        marginBottom: 12,
    },
    item: {
        marginBottom: 16,
    },
    itemTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 3,
    },
    itemCompany: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#1e40af',
        marginBottom: 3,
    },
    itemMeta: {
        fontSize: 8,
        color: '#6b7280',
        marginBottom: 6,
    },
    description: {
        fontSize: 10,
        color: '#374151',
        lineHeight: 1.5,
    },
    sidebarItem: {
        marginBottom: 14,
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
        color: '#6b7280',
        marginTop: 2,
    },
    skillPill: {
        backgroundColor: '#dbeafe',
        color: '#1e3a8a',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 3,
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        marginRight: 6,
        marginBottom: 6,
    },
    skillsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectTech: {
        fontSize: 8,
        color: '#6b7280',
        marginBottom: 4,
    },
});

export function CorporateBluePDF({ data }: { data: ResumeData }) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerName}>{personalInfo.fullName}</Text>
                    <View style={styles.headerContact}>
                        {personalInfo.email && <Text>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text>{personalInfo.location}</Text>}
                        {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        {/* Profile */}
                        {summary && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Profile</Text>
                                <Text style={[styles.description, { lineHeight: 1.6 }]}>{summary}</Text>
                            </View>
                        )}

                        {/* Experience */}
                        {experience.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Experience</Text>
                                {experience.map((item) => (
                                    <View key={item.id} style={styles.item}>
                                        <Text style={styles.itemTitle}>{item.position}</Text>
                                        <Text style={styles.itemCompany}>{item.company}</Text>
                                        <Text style={styles.itemMeta}>
                                            {item.startDate} – {item.current ? 'Present' : item.endDate} | {item.location}
                                        </Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Projects */}
                        {projects.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Projects</Text>
                                {projects.map((item) => (
                                    <View key={item.id} style={styles.item}>
                                        <Text style={styles.itemTitle}>{item.name}</Text>
                                        <Text style={styles.projectTech}>{item.technologies.join(', ')}</Text>
                                        <Text style={styles.description}>{item.description}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Education */}
                        {education.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {education.map((item) => (
                                    <View key={item.id} style={styles.sidebarItem}>
                                        <Text style={styles.sidebarItemTitle}>{item.institution}</Text>
                                        <Text style={styles.sidebarItemText}>{item.degree}</Text>
                                        <Text style={styles.sidebarItemText}>{item.fieldOfStudy}</Text>
                                        <Text style={styles.sidebarItemDate}>
                                            {item.startDate} – {item.current ? 'Present' : item.endDate}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Skills */}
                        {skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View style={styles.skillsWrap}>
                                    {skills.map((item) => (
                                        <Text key={item.id} style={styles.skillPill}>
                                            {item.name}
                                        </Text>
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

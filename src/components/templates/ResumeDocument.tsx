import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Register fonts
Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Roboto',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#112233',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        color: '#666666',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    contactItem: {
        marginRight: 10,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 8,
        paddingBottom: 2,
    },
    item: {
        marginBottom: 8,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    position: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 10,
        color: '#666666',
    },
    company: {
        fontSize: 10,
        fontStyle: 'italic',
        marginBottom: 2,
    },
    description: {
        fontSize: 10,
        lineHeight: 1.4,
    },
    skills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillItem: {
        fontSize: 10,
        backgroundColor: '#F0F0F0',
        padding: '2 6',
        borderRadius: 4,
        marginRight: 5,
        marginBottom: 5,
    },
});

interface ResumeDocumentProps {
    data: ResumeData;
    template: string;
    themeColor: string;
    isPreview?: boolean;
}

export default function ResumeDocument({ data, themeColor }: ResumeDocumentProps) {
    const { personalInfo, summary, experience, education, skills, projects } = data;

    // Dynamic styles based on themeColor could be applied here
    // For now, using a clean professional default

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.name, { color: themeColor || '#333' }]}>{personalInfo.fullName}</Text>
                    <View style={styles.contact}>
                        {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
                        {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
                    </View>
                </View>

                {/* Summary */}
                {summary && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: themeColor || '#333' }]}>Professional Summary</Text>
                        <Text style={styles.description}>{summary}</Text>
                    </View>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: themeColor || '#333' }]}>Experience</Text>
                        {experience.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.position}>{item.position}</Text>
                                    <Text style={styles.date}>{item.startDate} – {item.current ? 'Present' : item.endDate}</Text>
                                </View>
                                <Text style={styles.company}>{item.company} | {item.location}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: themeColor || '#333' }]}>Education</Text>
                        {education.map((item) => (
                            <View key={item.id} style={styles.item}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.position}>{item.institution}</Text>
                                    <Text style={styles.date}>{item.startDate} – {item.current ? 'Present' : item.endDate}</Text>
                                </View>
                                <Text style={styles.company}>{item.degree} in {item.fieldOfStudy}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: themeColor || '#333' }]}>Skills</Text>
                        <View style={styles.skills}>
                            {skills.map((item) => (
                                <Text key={item.id} style={styles.skillItem}>{item.name}</Text>
                            ))}
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
}

# SmartResume Pro - Project Overview

## 1. Project Features Report

**Project Name:** SmartResume Pro
**Core Goal:** A modern, interactive resume builder that helps users create professional, ATS-friendly resumes and analyze existing ones.

**Key Features:**
*   **Interactive Resume Builder:**
    *   **Real-time Preview:** Users can see changes instantly as they type.
    *   **Drag-and-Drop Reordering:** Sections (Education, Experience, etc.) can be reordered using `@dnd-kit`.
    *   **Comprehensive Forms:** Dedicated forms for Personal Info, Education, Experience, Projects, and Skills.
    *   **Dynamic Lists:** Users can add multiple entries for education, jobs, and projects.
*   **ATS Resume Checker:**
    *   **PDF Analysis:** Users can upload a PDF resume to check its compatibility with Applicant Tracking Systems (ATS).
    *   **Scoring System:** Calculates a score (0-100) based on keywords, formatting, and content.
    *   **Actionable Feedback:** Provides specific suggestions (e.g., "Add more action verbs", "Include contact info").
    *   **Visual Feedback:** Animated score charts and severity-coded issues (High/Medium/Low).
*   **Professional Templates:**
    *   Includes multiple templates: **Corporate Blue**, **Minimal Classic**, and **Modern Professional**.
    *   Templates are built with React components for dynamic rendering.
*   **PDF Export:**
    *   Uses `@react-pdf/renderer` to generate high-quality, printable PDF files of the resume.
*   **Modern UI/UX:**
    *   **Responsive Design:** Works on desktop and mobile.
    *   **Animations:** Smooth transitions and entry animations using `framer-motion` and `tw-animate-css`.
    *   **Dark Mode Support:** Built-in CSS variables for light and dark themes.
    *   **Glassmorphism:** Uses modern UI trends like backdrop blur and translucent cards.

---

## 2. Tech Stack Report

**Frontend Framework:**
*   **Next.js 16 (App Router):** The core framework for routing and server-side rendering.
*   **React 19:** The latest version of React for UI components.
*   **TypeScript:** For type safety and better developer experience.

**Styling & UI:**
*   **Tailwind CSS v4:** The latest utility-first CSS framework for styling.
*   **Radix UI:** Headless UI primitives for accessible components (Dialog, Tabs, Slider, Switch, etc.).
*   **Framer Motion:** For complex animations and layout transitions.
*   **Lucide React:** For consistent and beautiful icons.
*   **Geist Font:** A modern sans-serif and mono font family.

**State Management:**
*   **Zustand:** A small, fast, and scalable bearbones state-management solution (used for storing resume data).

**Key Libraries:**
*   **@dnd-kit:** For drag-and-drop functionality in the resume builder.
*   **@react-pdf/renderer:** For generating PDF documents from React components.
*   **clsx & tailwind-merge:** For conditional class merging.

---

## 3. Complete Prompt to Recreate This Project

Save this prompt to generate a similar project in the future:

```markdown
**Project Goal:**
Build a modern, production-ready Resume Builder application called "SmartResume Pro". The app should allow users to create professional resumes via an interactive form, preview them in real-time, and export them as PDFs. It should also include an "ATS Checker" feature to analyze existing resumes.

**Tech Stack:**
- **Framework:** Next.js 16 (App Router) with TypeScript.
- **Styling:** Tailwind CSS v4 (using CSS variables for theming).
- **UI Library:** Radix UI (primitives) and Lucide React (icons).
- **Animations:** Framer Motion.
- **State Management:** Zustand (for global resume state).
- **PDF Generation:** @react-pdf/renderer.
- **Drag & Drop:** @dnd-kit (core, sortable, utilities).

**Key Features & Requirements:**

1.  **Resume Builder Module:**
    -   **Left Panel (Editor):** A tabbed or accordion-style interface to input data.
        -   Sections: Personal Info, Education, Experience, Projects, Skills.
        -   Allow users to add/remove/edit items in lists (e.g., multiple jobs).
        -   Implement Drag-and-Drop reordering for list items using @dnd-kit.
    -   **Right Panel (Preview):** A live, A4-sized preview of the resume.
        -   Updates instantly as the user types.
    -   **Templates:** Create at least 3 distinct templates (e.g., "Corporate", "Minimal", "Modern") that the user can switch between.
    -   **Export:** A button to download the resume as a PDF.

2.  **ATS Checker Module:**
    -   A dedicated page or modal where users can upload a PDF resume.
    -   Mock the analysis logic (or use a simple text heuristic) to score the resume from 0-100.
    -   Check for: Missing contact info, lack of action verbs, formatting issues, and keyword density.
    -   Display the score with a circular progress bar and list specific improvements.

3.  **Design & UX:**
    -   **Aesthetic:** Modern, clean, and "premium" feel. Use a purple/slate color palette with glassmorphism effects (backdrop-blur).
    -   **Responsiveness:** Ensure the editor works on mobile (stack panels) but optimize the builder for desktop.
    -   **Animations:** Use Framer Motion for smooth page transitions and list reordering animations.

4.  **Project Structure:**
    -   `src/store`: Zustand store for resume data.
    -   `src/components/builder`: All builder-related components (forms, preview).
    -   `src/components/templates`: The resume design templates.
    -   `src/components/landing`: Landing page and ATS checker components.

**Implementation Details:**
-   Use `globals.css` for Tailwind @theme configuration.
-   Ensure strict type safety with TypeScript interfaces for `ResumeData`, `EducationItem`, etc.
-   Use `lucide-react` for all icons.
```

import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Boostly",
    year: "2024–Present",
    type: "SaaS Platform",
    status: "Live",
    shortDescription: "A productivity platform combining task management, habit tracking, and community.",
    description: "Full-stack SaaS combining task management, habit tracking, long-term project planning, focus rooms with gamification, leaderboards, and a social community feed. Currently has 30+ active users.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Firebase", "Vite"],
    preview: { type: "iframe", url: "https://boostly-app.vercel.app" },
    images: "/projects/boostly/",
    imageFiles: [
      "boostly.png",
      "boostly-2.png",
      "boostly-3.png",
      "boostly-4.png",
      "boostly-5.png",
      "boostly-6.png",
      "boostly-7.png"
    ],
    links: { site: "https://boostly-app.vercel.app", github: "" }
  },
  {
    id: 2,
    title: "NASS Grades Management System",
    year: "2024–Present",
    type: "Enterprise System",
    status: "In Development",
    shortDescription: "Multi-tenant school management platform for multiple schools, branches, and roles.",
    description: "Enterprise-level multi-tenant school management system built for NASS Academy. Handles behavioral and academic grades with strict data isolation, role-based permissions (Student, Teacher, Admin, Super Admin), and real-time updates.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "React Query", "Zustand"],
    preview: { type: "iframe", url: "https://nass-grades.vercel.app" },
    images: "/projects/nass/",
    imageFiles: ["NASS-grades-management-system.png", "NASS-grades-management-system-2.png"],
    links: { site: "https://nass-grades.vercel.app", github: "" }
  },
  {
    id: 3,
    title: "Leaders Violations System",
    year: "2024–2025",
    type: "Production School System",
    status: "Live",
    shortDescription: "Real-time violations management system for school leadership teams.",
    description: "Comprehensive violations management system for WE ATS school leaders. Features 36 violation categories, repeat tracking, real-time Firebase sync, Google Sheets integration for reporting, and role-based access control.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Google Apps Script"],
    preview: { type: "iframe", url: "https://leaders-violations.vercel.app" },
    images: "/projects/violations/",
    imageFiles: [
      "leaders-violatons-system.png",
      "leaders-violatons-system-2.png",
      "leaders-violatons-system-3.png"
    ],
    links: { site: "https://leaders-violations.vercel.app", github: "" }
  },
  {
    id: 4,
    title: "School Behavioral Grades System",
    year: "2024–2025",
    type: "Production System",
    status: "Live",
    shortDescription: "Student-facing grade lookup system used daily by hundreds of students.",
    description: "A student-facing system allowing WE ATS students to access behavioral and academic grades via National ID lookup. Integrates with Google Sheets via Apps Script, supports Arabic RTL, and generates PDF reports.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Google Apps Script", "Netlify"],
    preview: { type: "iframe", url: "https://we-pts-grades.netlify.app" },
    images: "/projects/grades/",
    imageFiles: [
      "School-behavioral-grades.png",
      "School-behavioral-grades-2.png",
      "School-behavioral-grades-3.png"
    ],
    links: { site: "https://we-pts-grades.netlify.app", github: "" }
  },
  {
    id: 5,
    title: "Competition Platform",
    year: "2024",
    type: "School Internal System",
    status: "Completed",
    shortDescription: "Digital platform for managing school competitions and project submissions.",
    description: "A digital platform built for WE Applied Technology School to manage competitions and projects. Replaces paper-based processes with a streamlined admin panel, student dashboard, and submission tracking system.",
    tech: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    preview: { type: "iframe", url: "" },
    images: "/projects/competition/",
    imageFiles: [
      "competetion_cover.png",
      "competetion_1.png",
      "competetion_2.png",
      "competetion_3.png",
      "competetion_4.png",
      "competetion_5.png"
    ],
    links: { site: "", github: "" }
  },
  {
    id: 6,
    title: "Exotics Driver",
    year: "2024",
    type: "Client Project",
    status: "Live",
    shortDescription: "Portfolio website for an Egyptian Ferrari racing driver and influencer.",
    description: "A sleek, performance-optimized portfolio for an Egyptian Ferrari racing driver. Showcases his exotic car fleet, racing journey timeline, and achievements with smooth animations and responsive design.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    preview: { type: "iframe", url: "https://exoticsdriver.com" },
    images: "/projects/exotics/",
    imageFiles: [
      "exotics-driver.png",
      "exotics-driver-2.png",
      "exotics-driver-3.png",
      "exotics-driver-4.png"
    ],
    links: { site: "https://exoticsdriver.com", github: "" }
  },
  {
    id: 7,
    title: "Investigate a Dataset",
    year: "2021–2023",
    type: "Data Analysis Project",
    status: "Completed",
    shortDescription: "Full data science workflow — cleaning, EDA, statistical analysis, and visualization.",
    description: "A comprehensive data analysis project covering the complete pipeline: data cleaning, exploratory data analysis, statistical methods (hypothesis testing, regression), and visualization using Matplotlib and Seaborn.",
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    preview: { type: "notebook", file: "/projects/investigate/Investigate.ipynb" },
    images: "/projects/investigate/",
    imageFiles: ["Investigate.html"], // Usually we show charts or screenshots, but for now i'll use what's there
    links: { site: "", github: "" }
  },
  {
    id: 8,
    title: "Analyzing a Big Data Set",
    year: "2021–2023",
    type: "Data Analysis Project",
    status: "Completed",
    shortDescription: "Large-scale data analysis with web scraping — from raw web data to insights.",
    description: "End-to-end data project built on self-scraped data using BeautifulSoup and Requests. Covers the full pipeline: scraping, cleaning, EDA, statistical analysis, and visualization.",
    tech: ["Python", "BeautifulSoup", "Requests", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    preview: { type: "notebook", file: "/projects/bigdata/wrangle_act.ipynb" },
    images: "/projects/bigdata/",
    imageFiles: ["chart.png"],
    links: { site: "", github: "" }
  },
  {
    id: 9,
    title: "First Website",
    year: "2020",
    type: "Personal Portfolio",
    status: "Completed",
    shortDescription: "My first-ever website — customized from a template during the DECI program.",
    description: "First web project during the DECI program. Took a template, customized it heavily, and filled it with personal projects. Sparked a love for frontend engineering.",
    tech: ["HTML", "CSS", "JavaScript"],
    preview: { type: "iframe", url: "" },
    images: "/projects/firstwebsite/",
    imageFiles: [
      "first-website.png",
      "first-website-2.png",
      "first-website-3.png",
      "first-website-4.png"
    ],
    links: { site: "", github: "" }
  },
  {
    id: 10,
    title: "Adventure Game",
    year: "2017–2018",
    type: "Personal Learning Project",
    status: "Completed",
    shortDescription: "A text-based adventure game — my very first programming project at age 9.",
    description: "My very first programming project after learning Python at age 9. A text-based adventure game built to apply core fundamentals: variables, loops, conditionals, functions, and user input handling.",
    tech: ["Python"],
    preview: { type: "terminal" },
    images: "/projects/adventuregame/",
    imageFiles: [],
    links: { site: "", github: "" }
  }
];

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Resume } from "./types";

type Store = {
  resume: Resume;
  updatePersonal: (key: string, value: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, key: string, value: any) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, key: string, value: string) => void;
  removeEducation: (id: string) => void;
  updateSkills: (skills: string[]) => void;
  updateLanguages: (languages: string[]) => void;
  addCustomSection: () => void;
  updateCustomSection: (id: string, key: string, value: string) => void;
  removeCustomSection: (id: string) => void;
  setTemplate: (template: Resume["template"]) => void;
  setResume: (r: Resume) => void;
};

const empty: Resume = {
  template: "modern",
  personal: { name: "", email: "", phone: "", linkedin: "", github: "", summary: "", address: "", dob: "", fatherName: "", date: "", signature: "" },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  customSections: [],
};

export const useResume = create<Store>()(
  persist(
    (set) => ({
      resume: empty,
      updatePersonal: (key, value) =>
        set((s) => ({ resume: { ...s.resume, personal: { ...s.resume.personal, [key]: value } } })),
      
      addExperience: () =>
        set((s) => ({
          resume: { ...s.resume, experience: [...s.resume.experience, { id: crypto.randomUUID(), company: "", role: "", start: "", end: "", bullets: [""] }] },
        })),
      updateExperience: (id, key, value) =>
        set((s) => ({ resume: { ...s.resume, experience: s.resume.experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)) } })),
      removeExperience: (id) =>
        set((s) => ({ resume: { ...s.resume, experience: s.resume.experience.filter((e) => e.id !== id) } })),
      
      addEducation: () =>
        set((s) => ({
          resume: { ...s.resume, education: [...s.resume.education, { id: crypto.randomUUID(), school: "", degree: "", year: "", marks: "" }] },
        })),
      updateEducation: (id, key, value) =>
        set((s) => ({ resume: { ...s.resume, education: s.resume.education.map((e) => (e.id === id ? { ...e, [key]: value } : e)) } })),
      removeEducation: (id) =>
        set((s) => ({ resume: { ...s.resume, education: s.resume.education.filter((e) => e.id !== id) } })),
      
      updateSkills: (skills) => set((s) => ({ resume: { ...s.resume, skills } })),
      updateLanguages: (languages) => set((s) => ({ resume: { ...s.resume, languages } })),

      addCustomSection: () =>
        set((s) => ({
          resume: { ...s.resume, customSections: [...(s.resume.customSections || []), { id: crypto.randomUUID(), title: "", content: "" }] },
        })),
      updateCustomSection: (id, key, value) =>
        set((s) => ({
          resume: { ...s.resume, customSections: (s.resume.customSections || []).map((c) => (c.id === id ? { ...c, [key]: value } : c)) },
        })),
      removeCustomSection: (id) =>
        set((s) => ({ resume: { ...s.resume, customSections: (s.resume.customSections || []).filter((c) => c.id !== id) } })),
      
      setTemplate: (template) => set((s) => ({ resume: { ...s.resume, template } })),
      setResume: (r) => set({ resume: r }),
    }),
    { name: "resume-storage" }
  )
);
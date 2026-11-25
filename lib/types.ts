export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  year: string;
  marks?: string;
};

export type CustomSection = {
  id: string;
  title: string;
  content: string;
};

export type Resume = {
  template: "modern" | "classic" | "minimal" | "harvard" | "indian";
  personal: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
    address: string;
    dob: string;
    fatherName: string;
    photo?: string;
    date?: string;      // नया: Date
    signature?: string; // नया: Signature
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: string[];
  customSections: CustomSection[];
};
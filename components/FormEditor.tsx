"use client";
import { useState, useEffect, useRef } from "react";
import { useResume } from "@/lib/store";
import { Sparkles, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function FormEditor() {
  const { 
    resume, updatePersonal, 
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    updateSkills, updateLanguages, 
    addCustomSection, updateCustomSection, removeCustomSection
  } = useResume();

  const [skillsText, setSkillsText] = useState("");
  const [langText, setLangText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [loadingExpId, setLoadingExpId] = useState<string | null>(null);

  useEffect(() => {
    setSkillsText((resume.skills || []).join(", "));
    setLangText((resume.languages || []).join(", "));
  }, [resume.skills, resume.languages]);

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsText(e.target.value);
    updateSkills(e.target.value.split(",").map(s => s.trim()));
  };
  const handleLangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLangText(e.target.value);
    updateLanguages(e.target.value.split(",").map(l => l.trim()));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonal("photo", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const enhanceSummary = async () => {
    if (!resume.personal.summary) return toast.error("Please write a summary first!");
    setIsSummaryLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: resume.personal.summary, type: "summary" }),
      });
      
      const data = await res.json();
      
      // अगर सर्वर से एरर आया है, तो उसे स्क्रीन पर दिखाएँ
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.enhancedText) {
        updatePersonal("summary", data.enhancedText);
        toast.success("Summary enhanced by AI! ✨");
      }
    } catch (error: any) {
      // यहाँ असली एरर मैसेज दिखेगा
      toast.error(error.message, { duration: 5000 });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const enhanceExperience = async (expId: string, role: string, company: string) => {
    if (!role) return toast.error("Please add a role first!");
    setLoadingExpId(expId);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `${role} at ${company}`, type: "experience" }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.enhancedText) {
        updateExperience(expId, "bullets", [data.enhancedText]);
        toast.success("Experience enhanced! ✨");
      }
    } catch (error: any) {
      toast.error(error.message, { duration: 5000 });
    } finally {
      setLoadingExpId(null);
    }
  };

  return (
    <div className="p-5 space-y-5 pb-20">
      
      {/* 1. Personal Details (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm">
        <h2 className="text-sm font-semibold tracking-tight text-white mb-4 pb-2 border-b border-white/5">Personal Details</h2>
        
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
            {resume.personal.photo ? <img src={resume.personal.photo} className="w-full h-full object-cover" /> : <span className="text-zinc-500 text-xs">Photo</span>}
          </div>
          <div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-md text-xs font-medium transition-colors border border-white/10">Upload Photo</button>
            {resume.personal.photo && <button onClick={() => updatePersonal("photo", "")} className="ml-2 text-xs text-red-400 hover:text-red-300">Remove</button>}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Full Name</label>
            <input value={resume.personal.name || ""} onChange={(e) => updatePersonal("name", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Your Name" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Email</label>
            <input value={resume.personal.email || ""} onChange={(e) => updatePersonal("email", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="your.email@example.com" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Phone</label>
            <input value={resume.personal.phone || ""} onChange={(e) => updatePersonal("phone", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="+91 9876543210" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">LinkedIn</label>
              <input value={resume.personal.linkedin || ""} onChange={(e) => updatePersonal("linkedin", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="linkedin.com/in/..." />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">GitHub</label>
              <input value={resume.personal.github || ""} onChange={(e) => updatePersonal("github", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="github.com/..." />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Address</label>
            <input value={resume.personal.address || ""} onChange={(e) => updatePersonal("address", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="City, State, Country" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">DOB</label>
              <input value={resume.personal.dob || ""} onChange={(e) => updatePersonal("dob", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="DD/MM/YYYY" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Father's Name</label>
              <input value={resume.personal.fatherName || ""} onChange={(e) => updatePersonal("fatherName", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Father's Name" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400 block">Summary (Objective)</label>
              <button 
                onClick={enhanceSummary} 
                disabled={isSummaryLoading}
                className="flex items-center gap-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded shadow-sm disabled:opacity-50 transition-colors"
              >
                {isSummaryLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {isSummaryLoading ? "Enhancing..." : "Enhance"}
              </button>
            </div>
            <textarea value={resume.personal.summary || ""} onChange={(e) => updatePersonal("summary", e.target.value)} rows={3} className="w-full p-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Write a basic summary, then click Enhance." />
          </div>
        </div>
      </div>

      {/* 2. Experience (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <h2 className="text-sm font-semibold tracking-tight text-white">Experience</h2>
          <button onClick={addExperience} className="text-[13px] text-indigo-400 hover:text-indigo-300 font-medium">+ Add Experience</button>
        </div>
        {(resume.experience || []).map((exp) => (
          <div key={exp.id} className="border border-white/10 rounded-lg p-4 mb-4 space-y-3 relative group bg-white/[0.02]">
            <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded-md transition-colors" title="Delete Experience">
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">Role</label>
                <input value={exp.role || ""} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Software Engineer" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">Company</label>
                <input value={exp.company || ""} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Company Name" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-zinc-400 block">Responsibilities</label>
                <button 
                  onClick={() => enhanceExperience(exp.id, exp.role, exp.company)} 
                  disabled={loadingExpId === exp.id}
                  className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
                >
                  {loadingExpId === exp.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  {loadingExpId === exp.id ? "Wait..." : "AI Enhance"}
                </button>
              </div>
              <textarea 
                value={(exp.bullets || []).join("\n")} 
                onChange={(e) => updateExperience(exp.id, "bullets", e.target.value.split("\n"))} 
                rows={3} 
                className="w-full p-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" 
                placeholder="- Led a team of 5 developers&#10;- Increased sales by 20%" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Education (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <h2 className="text-sm font-semibold tracking-tight text-white">Education</h2>
          <button onClick={addEducation} className="text-[13px] text-indigo-400 hover:text-indigo-300 font-medium">+ Add Education</button>
        </div>
        {(resume.education || []).map((edu) => (
          <div key={edu.id} className="border border-white/10 rounded-lg p-4 mb-4 space-y-3 relative group bg-white/[0.02]">
            <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded-md transition-colors" title="Delete Education">
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">Degree / Class</label>
                <input value={edu.degree || ""} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Class 12th, B.Tech" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">School / College</label>
                <input value={edu.school || ""} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Bihar Public School" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">Year</label>
                <input value={edu.year || ""} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="2020 - 2022" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-400 mb-1 block">Marks / CGPA</label>
                <input value={edu.marks || ""} onChange={(e) => updateEducation(edu.id, "marks", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="85% or 8.5 CGPA" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Skills & Languages (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm space-y-4">
        <div className="pb-2 border-b border-white/5">
          <h2 className="text-sm font-semibold tracking-tight text-white mb-1">Skills</h2>
          <label className="text-xs text-zinc-500 mb-2 block">(Separate with commas)</label>
          <input value={skillsText} onChange={handleSkillsChange} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="JavaScript, React, Project Management" />
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white mb-1">Languages</h2>
          <label className="text-xs text-zinc-500 mb-2 block">(Separate with commas)</label>
          <input value={langText} onChange={handleLangChange} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="English, Hindi" />
        </div>
      </div>

      {/* 5. Custom Sections (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <h2 className="text-sm font-semibold tracking-tight text-white">Custom Sections</h2>
          <button onClick={addCustomSection} className="text-[13px] text-indigo-400 hover:text-indigo-300 font-medium">+ Add Section</button>
        </div>
        {(resume.customSections || []).map((sec) => (
          <div key={sec.id} className="border border-white/10 rounded-lg p-4 mb-4 space-y-3 relative group bg-white/[0.02]">
             <button onClick={() => removeCustomSection(sec.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded-md transition-colors" title="Delete Section">
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="pr-10">
              <label className="text-xs font-medium text-zinc-400 mb-1 block">Section Title</label>
              <input value={sec.title || ""} onChange={(e) => updateCustomSection(sec.id, "title", e.target.value)} className="w-full h-9 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Projects, Certifications, etc." />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1 block">Content</label>
              <textarea value={sec.content || ""} onChange={(e) => updateCustomSection(sec.id, "content", e.target.value)} rows={2} className="w-full p-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Describe here..." />
            </div>
          </div>
        ))}
      </div>

      {/* 6. Date & Signature (डार्क कार्ड) */}
      <div className="bg-[#121214] rounded-xl border border-white/5 p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1 block">Date</label>
          <input value={resume.personal.date || ""} onChange={(e) => updatePersonal("date", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="e.g. 25/10/2024" />
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-400 mb-1 block">Signature (Type Name)</label>
          <input value={resume.personal.signature || ""} onChange={(e) => updatePersonal("signature", e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#09090b] border border-white/10 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Your Name" />
        </div>
      </div>

    </div>
  );
}
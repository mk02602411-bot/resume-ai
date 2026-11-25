"use client";
import { useResume } from "@/lib/store";

export function LivePreview({ zoom }: { zoom: number }) {
  const { resume } = useResume();
  
  const personal = resume.personal || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const languages = resume.languages || [];
  const customSections = resume.customSections || [];

  // ज़ूम और शैडो स्टाइल
  const wrapperStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: "top center",
    transition: "transform 0.2s ease",
  };

  // 1. MODERN TEMPLATE
  if (resume.template === "modern") {
    return (
      <div className="h-full overflow-y-auto bg-[#F3F4F6] flex justify-center p-10">
        <div style={wrapperStyle} className="w-[794px] min-h-[1123px] bg-white rounded-sm shadow-xl overflow-hidden flex flex-col mb-20 text-zinc-900">
          <div className="bg-blue-900 text-white p-10 flex justify-between items-center">
            <div>
              <h1 className="text-[36px] font-bold tracking-tight">{personal.name || "Your Name"}</h1>
              <p className="text-blue-200 mt-2 text-sm">{personal.email} {personal.phone && `· ${personal.phone}`}</p>
              <p className="text-blue-200 text-sm">{personal.address}</p>
              {personal.linkedin && <p className="text-blue-200 text-sm">{personal.linkedin}</p>}
            </div>
            {personal.photo && (
              <img src={personal.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
            )}
          </div>
          
          <div className="p-10 flex-1">
            {personal.summary && (
              <div className="mb-6">
                <h2 className="text-[14px] font-bold uppercase tracking-widest text-blue-900 border-b-2 border-blue-100 pb-1 mb-2">Profile</h2>
                <p className="text-[14px] text-zinc-700 leading-relaxed">{personal.summary}</p>
              </div>
            )}
            
            <div className="grid grid-cols-[2fr_1fr] gap-8">
              <div>
                {experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-[14px] font-bold uppercase tracking-widest text-blue-900 border-b-2 border-blue-100 pb-1 mb-3">Experience</h2>
                    {experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <p className="font-bold text-[15px] text-zinc-900">{exp.role}</p>
                        <p className="text-[13px] text-blue-700 font-medium mb-1">{exp.company}</p>
                        {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && (
                          <ul className="list-disc list-inside text-[13px] text-zinc-600 space-y-1">
                            {exp.bullets.filter(b=>b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-[14px] font-bold uppercase tracking-widest text-blue-900 border-b-2 border-blue-100 pb-1 mb-3">Education</h2>
                    {education.map((edu) => (
                      <div key={edu.id} className="mb-3">
                        <p className="font-bold text-[14px] text-zinc-900">{edu.degree}</p>
                        <p className="text-[12px] text-zinc-600">{edu.school}</p>
                        <p className="text-[12px] text-zinc-500">{edu.year} {edu.marks && `| ${edu.marks}`}</p>
                      </div>
                    ))}
                  </div>
                )}
                {skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-[14px] font-bold uppercase tracking-widest text-blue-900 border-b-2 border-blue-100 pb-1 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-800 text-[12px] rounded-md">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {customSections.map((sec) => (
              <div key={sec.id} className="mt-4 mb-6">
                <h2 className="text-[14px] font-bold uppercase tracking-widest text-blue-900 border-b-2 border-blue-100 pb-1 mb-2">{sec.title}</h2>
                <p className="text-[14px] text-zinc-700 whitespace-pre-wrap">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. CLASSIC TEMPLATE
  if (resume.template === "classic") {
    return (
      <div className="h-full overflow-y-auto bg-[#F3F4F6] flex justify-center p-10">
        <div style={wrapperStyle} className="w-[794px] min-h-[1123px] bg-white p-12 shadow-xl border-[12px] border-[#F9FAFB] font-serif mb-20 text-zinc-900">
          <div className="text-center pb-6 border-b-2 border-zinc-800 mb-6 relative">
            {personal.photo && (
              <img src={personal.photo} alt="Profile" className="w-24 h-24 object-cover border-2 border-zinc-300 mx-auto mb-4" />
            )}
            <h1 className="text-[38px] font-bold text-zinc-900 uppercase tracking-wide">{personal.name || "Your Name"}</h1>
            <p className="text-[14px] text-zinc-700 mt-2 uppercase tracking-widest">
              {personal.email} {personal.phone && `| ${personal.phone}`}
            </p>
            <p className="text-[14px] text-zinc-700 uppercase tracking-widest">{personal.address}</p>
            {personal.linkedin && <p className="text-[14px] text-zinc-700 uppercase tracking-widest">{personal.linkedin}</p>}
          </div>
          {personal.summary && (
            <div className="mb-6">
              <p className="text-[14px] text-zinc-800 italic text-center">{personal.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-bold text-zinc-900 uppercase border-b border-zinc-300 mb-3">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <p className="font-bold text-[16px] text-zinc-900">{exp.role}</p>
                  <p className="text-[14px] text-zinc-600 italic mb-1">{exp.company}</p>
                  {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && (
                    <ul className="list-disc list-inside text-[14px] text-zinc-700 space-y-1">
                      {exp.bullets.filter(b=>b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[16px] font-bold text-zinc-900 uppercase border-b border-zinc-300 mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-bold text-[15px]">{edu.degree}</p>
                  <p className="text-[14px] text-zinc-600">{edu.school} {edu.year && `(${edu.year})`} {edu.marks && `- ${edu.marks}`}</p>
                </div>
              ))}
            </div>
          )}
          {customSections.map((sec) => (
            <div key={sec.id} className="mb-6">
              <h2 className="text-[16px] font-bold text-zinc-900 uppercase border-b border-zinc-300 mb-3">{sec.title}</h2>
              <p className="text-[14px] text-zinc-700 whitespace-pre-wrap">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. MINIMAL TEMPLATE
  if (resume.template === "minimal") {
    return (
      <div className="h-full overflow-y-auto bg-[#F3F4F6] flex justify-center p-10">
        <div style={wrapperStyle} className="w-[794px] min-h-[1123px] bg-white p-14 shadow-xl mb-20 text-zinc-900">
          <div className="flex items-center gap-6 mb-12">
            {personal.photo && (
              <img src={personal.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
            )}
            <div>
              <h1 className="text-[32px] font-light tracking-tight text-zinc-900">{personal.name || "Your Name"}</h1>
              <p className="text-[14px] text-zinc-500 mt-1">{personal.email} {personal.phone && `· ${personal.phone}`}</p>
              {personal.linkedin && <p className="text-[14px] text-zinc-500">{personal.linkedin}</p>}
            </div>
          </div>

          {personal.summary && (
             <div className="mb-10">
              <p className="text-[15px] text-zinc-700 leading-relaxed font-light">{personal.summary}</p>
             </div>
          )}

          <div className="space-y-10">
            {experience.length > 0 && (
              <div className="grid grid-cols-[160px_1fr] gap-6">
                <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 pt-1">Experience</h2>
                <div>
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-5 border-l-2 border-zinc-200 pl-4">
                      <p className="font-semibold text-[16px] text-zinc-900">{exp.role}</p>
                      <p className="text-[14px] text-zinc-500 mb-2">{exp.company}</p>
                      {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && (
                        <ul className="list-disc list-inside text-[14px] text-zinc-700 space-y-1">
                          {exp.bullets.filter(b=>b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div className="grid grid-cols-[160px_1fr] gap-6">
                <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 pt-1">Education</h2>
                <div>
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4 border-l-2 border-zinc-200 pl-4">
                      <p className="font-semibold text-[16px] text-zinc-900">{edu.degree}</p>
                      <p className="text-[14px] text-zinc-500">{edu.school} {edu.year && `· ${edu.year}`} {edu.marks && `· ${edu.marks}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {customSections.map((sec) => (
              <div key={sec.id} className="grid grid-cols-[160px_1fr] gap-6">
                <h2 className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 pt-1">{sec.title}</h2>
                <p className="text-[14px] text-zinc-700 whitespace-pre-wrap border-l-2 border-zinc-200 pl-4">{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. HARVARD / ATS TEMPLATE
  if (resume.template === "harvard") {
    return (
      <div className="h-full overflow-y-auto bg-[#F3F4F6] flex justify-center p-10">
        <div style={wrapperStyle} className="w-[794px] min-h-[1123px] bg-white p-12 shadow-xl font-serif text-zinc-900 text-[12px] leading-relaxed mb-20">
          <div className="text-center border-b-2 border-black pb-3 mb-5 relative">
            {personal.photo && (
              <img src={personal.photo} alt="Profile" className="absolute top-0 right-0 w-20 h-20 object-cover border border-zinc-300" />
            )}
            <h1 className="text-[26px] font-bold uppercase tracking-widest">{personal.name || "YOUR NAME"}</h1>
            <p className="text-[11px] mt-2">{personal.address && `${personal.address} | `}{personal.phone} | {personal.email}</p>
            {personal.linkedin && <p className="text-[11px]">{personal.linkedin}</p>}
          </div>
          {personal.summary && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
              <p className="text-justify">{personal.summary}</p>
            </div>
          )}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-black mb-3">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between font-bold"><p>{exp.role}</p><p>{exp.start} - {exp.end}</p></div>
                  <p className="italic mb-1">{exp.company}</p>
                  {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {exp.bullets.filter(b=>b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-black mb-3">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-2 flex justify-between">
                  <div><p className="font-bold">{edu.school}</p><p>{edu.degree} {edu.marks && `| ${edu.marks}`}</p></div>
                  <p>{edu.year}</p>
                </div>
              ))}
            </div>
          )}
          {skills.length > 0 && (
            <div className="mb-5">
              <h2 className="font-bold uppercase border-b border-black mb-2">Skills</h2>
              <p>{skills.join(", ")}</p>
            </div>
          )}
          {customSections.map((sec) => (
            <div key={sec.id} className="mb-5">
              <h2 className="font-bold uppercase border-b border-black mb-2">{sec.title}</h2>
              <p className="whitespace-pre-wrap">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. INDIAN TRADITIONAL TEMPLATE
  return (
    <div className="h-full overflow-y-auto bg-[#F3F4F6] flex justify-center p-10">
      <div style={wrapperStyle} className="w-[794px] min-h-[1123px] bg-white p-10 shadow-xl text-zinc-900 text-[13px] mb-20">
        <h1 className="text-center text-[22px] font-bold uppercase tracking-widest border-b-2 border-black pb-2 mb-4">RESUME</h1>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-[18px] font-bold">{personal.name || "Your Name"}</h2>
            <p>{personal.email}</p>
            <p>Mob: {personal.phone}</p>
            <p>{personal.address}</p>
            {personal.linkedin && <p>LinkedIn: {personal.linkedin}</p>}
          </div>
          {personal.photo && (
            <img src={personal.photo} alt="Profile" className="w-24 h-28 object-cover border border-zinc-300" />
          )}
        </div>

        <div className="mb-4">
          <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2">CAREER OBJECTIVE</h3>
          <p>{personal.summary || "To make contribution in the organization..."}</p>
        </div>

        {education.length > 0 && (
          <div className="mb-4">
            <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2">ACADEMIC QUALIFICATION</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-300">
                  <th className="py-1">Qualification</th>
                  <th className="py-1">School/College</th>
                  <th className="py-1">Year</th>
                  <th className="py-1">Marks</th>
                </tr>
              </thead>
              <tbody>
                {education.map((edu) => (
                  <tr key={edu.id} className="border-b border-zinc-100">
                    <td className="py-1">{edu.degree}</td>
                    <td className="py-1">{edu.school}</td>
                    <td className="py-1">{edu.year}</td>
                    <td className="py-1">{edu.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-4">
            <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2">WORK EXPERIENCE</h3>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <p className="font-bold">{exp.role}</p>
                <p className="italic text-zinc-600 mb-1">{exp.company}</p>
                {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && (
                  <ul className="list-disc list-inside text-zinc-800 space-y-1">
                    {exp.bullets.filter(b=>b.trim()).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {customSections.map((sec) => (
          <div key={sec.id} className="mb-4">
            <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2 uppercase">{sec.title}</h3>
            <p className="whitespace-pre-wrap">{sec.content}</p>
          </div>
        ))}

        <div className="mb-4">
          <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2">PERSONAL INFORMATION</h3>
          <div className="grid grid-cols-2 gap-2">
            <p><span className="font-bold">Father's Name:</span> {personal.fatherName || "Mr. Sharma"}</p>
            <p><span className="font-bold">Date of Birth:</span> {personal.dob || "2000-01-01"}</p>
            <p><span className="font-bold">Languages:</span> {languages.join(", ") || "English, Hindi"}</p>
            <p><span className="font-bold">Nationality:</span> Indian</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="bg-zinc-200 font-bold px-2 py-1 mb-2">DECLARATION</h3>
          <p className="mb-4">I hereby declare that the above information is true to the best of my knowledge.</p>
          <div className="flex justify-between mt-8">
            <p>Date: {personal.date || "_____________"}</p>
            <p>Signature: {personal.signature || "_____________"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
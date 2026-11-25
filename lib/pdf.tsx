import React from "react";
import { pdf, Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { Resume } from "./types";

Font.register({ family: "Helvetica", fonts: [{ src: "Helvetica" }] });
Font.register({ family: "Times-Roman", fonts: [{ src: "Times-Roman" }] });

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  contact: { fontSize: 10, color: "#555", marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginTop: 15, marginBottom: 8, textTransform: "uppercase" },
  role: { fontSize: 11, fontWeight: "bold" },
  company: { fontSize: 10, color: "#555", marginBottom: 4 },
  text: { fontSize: 10, marginBottom: 4, lineHeight: 1.5 },
  bullet: { fontSize: 10, marginBottom: 2, lineHeight: 1.4 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  col: { flexDirection: "column" },
  photo: { width: 80, height: 80, borderRadius: 40, objectFit: "cover" },
  photoSquare: { width: 80, height: 100, objectFit: "cover" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 4, marginBottom: 4 },
  tableHeader: { fontWeight: "bold", flex: 1 },
  tableCell: { flex: 1 }
});

export async function downloadPDF(resume: Resume) {
  const { personal, experience, education, skills, languages, customSections, template } = resume;
  
  const safeExp = experience || [];
  const safeEdu = education || [];
  const safeSkills = skills || [];
  const safeLangs = languages || [];
  const safeCustom = customSections || [];

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* --- MODERN TEMPLATE --- */}
        {template === "modern" && (
          <View>
            <View style={{ backgroundColor: "#1e3a8a", padding: 20, margin: -40, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ ...styles.name, color: "white" }}>{personal.name || "Your Name"}</Text>
                <Text style={{ ...styles.contact, color: "#bfdbfe", marginBottom: 0 }}>{personal.email} | {personal.phone}</Text>
                <Text style={{ fontSize: 9, color: "#bfdbfe" }}>{personal.address}</Text>
                {personal.linkedin && <Text style={{ fontSize: 9, color: "#bfdbfe" }}>{personal.linkedin}</Text>}
              </View>
              {personal.photo && <Image src={personal.photo} style={{ ...styles.photo, borderWidth: 2, borderColor: "white" }} />}
            </View>
            
            {personal.summary && (
              <View>
                <Text style={{ ...styles.sectionTitle, color: "#1e3a8a" }}>Profile</Text>
                <Text style={styles.text}>{personal.summary}</Text>
              </View>
            )}
            {safeExp.length > 0 && (
              <View>
                <Text style={{ ...styles.sectionTitle, color: "#1e3a8a" }}>Experience</Text>
                {safeExp.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={{ ...styles.company, color: "#1e3a8a" }}>{exp.company}</Text>
                    {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && exp.bullets.filter(b=>b.trim()).map((b, j) => (
                      <Text key={j} style={styles.bullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {safeEdu.length > 0 && (
              <View>
                <Text style={{ ...styles.sectionTitle, color: "#1e3a8a" }}>Education</Text>
                {safeEdu.map((edu, i) => (
                  <View key={i} style={styles.row}>
                    <View style={styles.col}>
                      <Text style={styles.role}>{edu.degree}</Text>
                      <Text style={styles.company}>{edu.school} {edu.marks && `- ${edu.marks}`}</Text>
                    </View>
                    <Text style={{ fontSize: 10 }}>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}
            {safeSkills.length > 0 && (
              <View>
                <Text style={{ ...styles.sectionTitle, color: "#1e3a8a" }}>Skills</Text>
                <Text style={styles.text}>{safeSkills.join(" • ")}</Text>
              </View>
            )}
          </View>
        )}

        {/* --- CLASSIC TEMPLATE --- */}
        {template === "classic" && (
          <View style={{ fontFamily: "Times-Roman" }}>
            <View style={{ textAlign: "center", borderBottomWidth: 2, borderBottomColor: "black", paddingBottom: 10, marginBottom: 15 }}>
              {personal.photo && <Image src={personal.photo} style={{ ...styles.photoSquare, marginHorizontal: "auto", marginBottom: 10 }} />}
              <Text style={{ ...styles.name, textTransform: "uppercase", letterSpacing: 2 }}>{personal.name || "Your Name"}</Text>
              <Text style={styles.contact}>{personal.email} | {personal.phone} | {personal.address}</Text>
              {personal.linkedin && <Text style={styles.contact}>{personal.linkedin}</Text>}
            </View>
            {personal.summary && <Text style={{ ...styles.text, textAlign: "center", fontStyle: "italic", marginBottom: 15 }}>{personal.summary}</Text>}
            {safeExp.length > 0 && (
              <View>
                <Text style={{ ...styles.sectionTitle, borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 2 }}>Experience</Text>
                {safeExp.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <View style={styles.row}>
                      <Text style={styles.role}>{exp.role}</Text>
                      <Text style={styles.role}>{exp.company}</Text>
                    </View>
                    {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && exp.bullets.filter(b=>b.trim()).map((b, j) => (
                      <Text key={j} style={styles.bullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {safeEdu.length > 0 && (
              <View>
                <Text style={{ ...styles.sectionTitle, borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 2 }}>Education</Text>
                {safeEdu.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={styles.role}>{edu.degree}</Text>
                    <Text style={styles.company}>{edu.school} - {edu.year} {edu.marks && `(${edu.marks})`}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* --- MINIMAL TEMPLATE --- */}
        {template === "minimal" && (
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              {personal.photo && <Image src={personal.photo} style={{ ...styles.photo, marginRight: 15 }} />}
              <View>
                <Text style={{ ...styles.name, fontWeight: "normal" }}>{personal.name || "Your Name"}</Text>
                <Text style={styles.contact}>{personal.email} | {personal.phone}</Text>
                {personal.linkedin && <Text style={{ fontSize: 10 }}>{personal.linkedin}</Text>}
              </View>
            </View>
            
            {personal.summary && <Text style={{ ...styles.text, marginBottom: 20, fontSize: 11 }}>{personal.summary}</Text>}
            
            {safeExp.length > 0 && (
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text style={{ width: 100, fontSize: 9, color: "#888", textTransform: "uppercase" }}>Experience</Text>
                <View style={{ flex: 1, borderLeftWidth: 2, borderLeftColor: "#ccc", paddingLeft: 10 }}>
                  {safeExp.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                      <Text style={styles.role}>{exp.role}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                      {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && exp.bullets.filter(b=>b.trim()).map((b, j) => (
                        <Text key={j} style={styles.bullet}>• {b}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            {safeEdu.length > 0 && (
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <Text style={{ width: 100, fontSize: 9, color: "#888", textTransform: "uppercase" }}>Education</Text>
                <View style={{ flex: 1, borderLeftWidth: 2, borderLeftColor: "#ccc", paddingLeft: 10 }}>
                  {safeEdu.map((edu, i) => (
                    <View key={i} style={{ marginBottom: 8 }}>
                      <Text style={styles.role}>{edu.degree}</Text>
                      <Text style={styles.company}>{edu.school} - {edu.year} {edu.marks && `(${edu.marks})`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* --- HARVARD TEMPLATE --- */}
        {template === "harvard" && (
          <View style={{ fontFamily: "Times-Roman", fontSize: 11 }}>
            <View style={{ textAlign: "center", borderBottomWidth: 2, borderBottomColor: "black", paddingBottom: 10, marginBottom: 15 }}>
              {personal.photo && <Image src={personal.photo} style={{ ...styles.photoSquare, position: "absolute", right: 0, top: 0, width: 60, height: 80 }} />}
              <Text style={{ ...styles.name, fontSize: 20, letterSpacing: 1 }}>{personal.name || "YOUR NAME"}</Text>
              <Text style={styles.contact}>{personal.address} | {personal.phone} | {personal.email}</Text>
              {personal.linkedin && <Text style={{ fontSize: 10 }}>{personal.linkedin}</Text>}
            </View>
            {personal.summary && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ ...styles.sectionTitle, borderBottomWidth: 1, borderBottomColor: "black", marginTop: 0 }}>Summary</Text>
                <Text style={styles.text}>{personal.summary}</Text>
              </View>
            )}
            {safeExp.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ ...styles.sectionTitle, borderBottomWidth: 1, borderBottomColor: "black" }}>Experience</Text>
                {safeExp.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <View style={styles.row}>
                      <Text style={styles.role}>{exp.role}</Text>
                      <Text style={styles.role}>{exp.start} - {exp.end}</Text>
                    </View>
                    <Text style={{ fontStyle: "italic" }}>{exp.company}</Text>
                    {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && exp.bullets.filter(b=>b.trim()).map((b, j) => (
                      <Text key={j} style={styles.bullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
            {safeEdu.length > 0 && (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ ...styles.sectionTitle, borderBottomWidth: 1, borderBottomColor: "black" }}>Education</Text>
                {safeEdu.map((edu, i) => (
                  <View key={i} style={styles.row}>
                    <View>
                      <Text style={styles.role}>{edu.school}</Text>
                      <Text>{edu.degree} {edu.marks && `| ${edu.marks}`}</Text>
                    </View>
                    <Text>{edu.year}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* --- INDIAN TRADITIONAL TEMPLATE --- */}
        {template === "indian" && (
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", textTransform: "uppercase", borderBottomWidth: 2, borderBottomColor: "black", paddingBottom: 5, marginBottom: 15 }}>RESUME</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>{personal.name || "Your Name"}</Text>
                <Text>{personal.email}</Text>
                <Text>Mob: {personal.phone}</Text>
                <Text>{personal.address}</Text>
                {personal.linkedin && <Text>LinkedIn: {personal.linkedin}</Text>}
              </View>
              {personal.photo && <Image src={personal.photo} style={styles.photoSquare} />}
            </View>

            <View style={{ backgroundColor: "#e5e7eb", padding: 4, marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 11 }}>CAREER OBJECTIVE</Text>
            </View>
            <Text style={{ ...styles.text, marginBottom: 15 }}>{personal.summary || "..."}</Text>

            {safeEdu.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <View style={{ backgroundColor: "#e5e7eb", padding: 4, marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 11 }}>ACADEMIC QUALIFICATION</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Qualification</Text>
                  <Text style={styles.tableHeader}>School/College</Text>
                  <Text style={styles.tableHeader}>Year</Text>
                  <Text style={styles.tableHeader}>Marks</Text>
                </View>
                {safeEdu.map((edu, i) => (
                  <View key={i} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{edu.degree}</Text>
                    <Text style={styles.tableCell}>{edu.school}</Text>
                    <Text style={styles.tableCell}>{edu.year}</Text>
                    <Text style={styles.tableCell}>{edu.marks}</Text>
                  </View>
                ))}
              </View>
            )}

            {safeExp.length > 0 && (
              <View style={{ marginBottom: 15 }}>
                <View style={{ backgroundColor: "#e5e7eb", padding: 4, marginBottom: 8 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 11 }}>WORK EXPERIENCE</Text>
                </View>
                {safeExp.map((exp, i) => (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={styles.role}>{exp.role}</Text>
                    <Text style={{ fontStyle: "italic", color: "#555" }}>{exp.company}</Text>
                    {exp.bullets && exp.bullets.filter(b=>b.trim()).length > 0 && exp.bullets.filter(b=>b.trim()).map((b, j) => (
                      <Text key={j} style={styles.bullet}>• {b}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            <View style={{ marginBottom: 15 }}>
              <View style={{ backgroundColor: "#e5e7eb", padding: 4, marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 11 }}>PERSONAL INFORMATION</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <Text style={{ width: "50%", marginBottom: 4 }}><Text style={{ fontWeight: "bold" }}>Father's Name: </Text>{personal.fatherName}</Text>
                <Text style={{ width: "50%", marginBottom: 4 }}><Text style={{ fontWeight: "bold" }}>DOB: </Text>{personal.dob}</Text>
                <Text style={{ width: "50%", marginBottom: 4 }}><Text style={{ fontWeight: "bold" }}>Languages: </Text>{safeLangs.join(", ")}</Text>
                <Text style={{ width: "50%", marginBottom: 4 }}><Text style={{ fontWeight: "bold" }}>Nationality: </Text>Indian</Text>
              </View>
            </View>
            
            <View style={{ marginTop: 20 }}>
              <View style={{ backgroundColor: "#e5e7eb", padding: 4, marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 11 }}>DECLARATION</Text>
              </View>
              <Text style={{ ...styles.text, marginBottom: 20 }}>I hereby declare that the above information is true to the best of my knowledge.</Text>
              
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <Text>Date: {personal.date || "_____________"}</Text>
                <Text>Signature: {personal.signature || "_____________"}</Text>
              </View>
            </View>
          </View>
        )}

        {/* --- CUSTOM SECTIONS --- */}
        {safeCustom.map((sec, i) => (
          <View key={i} style={{ marginTop: 15 }}>
            <Text style={{ ...styles.sectionTitle, marginTop: 0 }}>{sec.title}</Text>
            <Text style={styles.text}>{sec.content}</Text>
          </View>
        ))}

      </Page>
    </Document>
  );

  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${personal.name || "resume"}-${template}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
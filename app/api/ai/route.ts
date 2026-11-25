import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not found in .env.local" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    let prompt = "";
    if (type === "summary") {
      prompt = `You are an expert resume writer. Rewrite the following summary to be highly professional, ATS-friendly, and impactful. Keep it under 3 sentences. Do not add any extra text, just return the rewritten summary. Raw text: "${text}"`;
    } else if (type === "experience") {
      prompt = `You are an expert resume writer. Rewrite the following job role and company into a highly professional resume bullet point. Start with a strong action verb and add a quantifiable metric if possible. Do not add extra text, just return the bullet point. Raw text: "${text}"`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const enhancedText = response.text;

    return NextResponse.json({ enhancedText });
  } catch (error: any) {
    console.error("🔥 REAL AI ERROR:", error.message); 
    // यहाँ हमने असली एरर मैसेज को सीधे फ्रंटएंड पर भेज दिया है
    return NextResponse.json({ error: error.message || "Failed to enhance" }, { status: 500 });
  }
}
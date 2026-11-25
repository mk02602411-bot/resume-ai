"use client";
import Link from "next/link";
import { Sparkles, LayoutTemplate, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-50 font-sans selection:bg-indigo-500/30">
      
      {/* बैकग्राउंड ग्रिड और ग्लो इफ़ेक्ट */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* 1. NAVBAR */}
        <nav className="h-16 px-4 md:px-12 flex items-center justify-between border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20L8 20H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[18px] font-extrabold tracking-tight text-white">ZenCV</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/builder" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block">
              Open Builder
            </Link>
            <Link 
              href="/builder" 
              className="h-9 px-3 md:px-4 rounded-lg text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all flex items-center gap-1.5 border border-indigo-500/50"
            >
              Create Resume <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>

        {/* 2. HERO SECTION */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] md:text-xs font-semibold mb-6 md:mb-8 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Resume Builder
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-4 md:mb-6 leading-[1.1]">
            Build a Professional Resume <br className="hidden md:block" /> in Minutes. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">For Free.</span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2 md:px-0">
            Create an ATS-friendly resume with our easy-to-use builder. Choose from multiple templates, use AI to enhance your bullet points, and download in high-quality PDF.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/builder" 
              className="h-12 px-8 rounded-xl text-[15px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center border border-indigo-400/50"
            >
              Start Building Now <ArrowRight className="w-5 h-5" />
            </Link>
            <span className="text-sm text-zinc-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> No login required. 100% Free.
            </span>
          </div>

          {/* 3. MOCKUP (मोबाइल पर यह छोटा और सिंपल हो जाएगा) */}
          <div className="mt-12 md:mt-20 relative mx-auto max-w-5xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-[#121214] shadow-2xl">
              <div className="h-7 md:h-9 bg-[#18181b] border-b border-white/5 flex items-center px-4 gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="p-4 md:p-8 bg-[#09090b] flex flex-col md:flex-row gap-4 md:gap-8 h-[300px] md:h-[450px] overflow-hidden">
                {/* Left Panel (मोबाइल पर छिपा हुआ) */}
                <div className="hidden md:block w-1/3 bg-[#121214] rounded-xl border border-white/5 p-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20"></div>
                    <div className="space-y-2">
                      <div className="w-20 h-3 bg-white/10 rounded"></div>
                      <div className="w-12 h-2 bg-white/5 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-10 bg-white/5 rounded-lg border border-white/5"></div>
                    <div className="w-full h-10 bg-white/5 rounded-lg border border-white/5"></div>
                    <div className="w-full h-24 bg-white/5 rounded-lg border border-white/5"></div>
                  </div>
                </div>
                {/* Right Panel (मोबाइल पर पूरी स्क्रीन) */}
                <div className="w-full md:w-2/3 bg-white rounded-lg md:rounded-xl p-4 md:p-10 shadow-2xl">
                  <div className="w-32 md:w-48 h-6 md:h-8 bg-zinc-800 rounded mb-2 md:mb-3"></div>
                  <div className="w-20 md:w-32 h-3 md:h-4 bg-zinc-300 rounded mb-6 md:mb-10"></div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <div className="w-24 md:w-32 h-4 md:h-5 bg-indigo-100 rounded mb-2 md:mb-4"></div>
                      <div className="space-y-2 md:space-y-3">
                        <div className="w-full h-2 md:h-2.5 bg-zinc-100 rounded"></div>
                        <div className="w-11/12 h-2 md:h-2.5 bg-zinc-100 rounded"></div>
                        <div className="w-4/5 h-2 md:h-2.5 bg-zinc-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 4. FEATURES SECTION */}
        <section className="border-t border-white/5 bg-[#09090b]/50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3 md:mb-4">Why choose ZenCV?</h2>
              <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto">Everything you need to create a resume that stands out and gets you hired.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3">AI Writing Assistant</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Write basic text and let our AI enhance it to make it professional, ATS-friendly, and impactful.</p>
              </div>
              
              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3">Multiple Templates</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Choose from Modern, Classic, Minimal, Harvard, and Indian formats to suit your industry.</p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-300 group">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3">Instant PDF Export</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Download your resume instantly in high-quality PDF format without any watermarks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="py-6 md:py-8 text-center text-xs md:text-sm text-zinc-500 border-t border-white/5">
          <p>© 2024 ZenCV. Built for professionals.</p>
        </footer>
      </div>
    </div>
  );
}
"use client";
import { Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useResume } from "@/lib/store";

type HeaderProps = {
  onDownload: () => void;
  isDownloading: boolean;
  zoom: number;
  setZoom: (z: number) => void;
};

export function Header({ onDownload, isDownloading, zoom, setZoom }: HeaderProps) {
  const { resume, setTemplate } = useResume();

  return (
    <header className="sticky top-0 z-40 h-14 px-4 md:px-6 flex items-center justify-between bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 print:hidden">
      
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20L8 20H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-[16px] md:text-[18px] font-extrabold tracking-tight text-white">
          ZenCV
        </span>
      </Link>

      <div className="flex items-center gap-2 md:gap-4">
        
        {/* ज़ूम कंट्रोल सिर्फ बड़ी स्क्रीन पर */}
        <div className="hidden lg:flex items-center bg-white/5 rounded-lg p-1 mr-2 border border-white/10">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-all">
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold w-12 text-center text-zinc-300">
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-all">
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* टेम्पलेट सिलेक्टर */}
        <div className="flex items-center gap-2">
          <select
            value={resume.template}
            onChange={(e) => setTemplate(e.target.value as any)}
            className="text-xs md:text-sm font-medium border border-white/10 rounded-lg px-2 md:px-3 py-1.5 outline-none focus:ring-2 focus:ring-indigo-500/50 bg-[#121214] text-white cursor-pointer hover:border-white/20 transition-colors"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="harvard">Harvard</option>
            <option value="indian">Indian</option>
          </select>
        </div>

        <div className="w-px h-6 bg-white/10 mx-0 md:mx-1 hidden sm:block"></div>

        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="h-8 md:h-9 px-3 md:px-4 rounded-lg text-[12px] md:text-[13px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all flex items-center gap-1.5 md:gap-2 disabled:opacity-70 border border-indigo-500/50"
        >
          {isDownloading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          )}
          <span className="hidden sm:inline">{isDownloading ? "Wait..." : "PDF"}</span>
          <span className="sm:hidden">{isDownloading ? "..." : "PDF"}</span>
        </button>
        
      </div>
    </header>
  );
}
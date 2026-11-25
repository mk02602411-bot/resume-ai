"use client";
import { useState } from "react";
import { Header } from "@/components/Header";
import { FormEditor } from "@/components/FormEditor";
import { LivePreview } from "@/components/LivePreview";
import { downloadPDF } from "@/lib/pdf";
import { useResume } from "@/lib/store";
import toast from "react-hot-toast";

export default function BuilderPage() {
  const { resume } = useResume();
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleDownload = async () => {
    setIsDownloading(true);
    const loadingToast = toast.loading("Generating PDF...");
    try {
      await downloadPDF(resume);
      toast.success("PDF Downloaded successfully!", { id: loadingToast });
    } catch (error) {
      toast.error("Failed to generate PDF", { id: loadingToast });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    // पूरा बैकग्राउंड डार्क (bg-[#09090b]) कर दिया है
    <div className="h-screen flex flex-col bg-[#09090b]">
      <Header 
        onDownload={handleDownload} 
        isDownloading={isDownloading} 
        zoom={zoom} 
        setZoom={setZoom} 
      />
      
      {/* lg:flex-row का मतलब है कि बड़ी स्क्रीन (लैपटॉप) पर यह बगल में होंगे, 
          और मोबाइल पर flex-col से एक के नीचे एक (ऊपर-नीचे) होंगे */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Sidebar - डार्क थीम */}
        <div className="w-full lg:w-[440px] h-[50vh] lg:h-full border-b lg:border-b-0 lg:border-r border-zinc-800 bg-[#09090b] overflow-y-auto z-10 shrink-0">
          <FormEditor />
        </div>

        {/* Right Preview Area - हल्का ग्रे बैकग्राउंड ताकि A4 सफेद दिखे */}
        <div className="w-full lg:flex-1 h-[50vh] lg:h-full overflow-auto bg-[#F3F4F6] relative">
          <LivePreview zoom={zoom} />
        </div>
      </main>
    </div>
  );
}
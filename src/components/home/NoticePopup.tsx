"use client";

import React, { useState, useEffect } from "react";
import { noticesApi } from "@/services/api";
import { X } from "lucide-react";
import DOMPurify from "dompurify";

export default function NoticePopup() {
  const [notices, setNotices] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await noticesApi.getActiveNotices();
        const data = res.data as any[];
        if (res.statusCode === 200 && data && data.length > 0) {
          setNotices(data);
          
          // Check session storage to see if we've already shown this recently to avoid spamming
          // For now we just show it every time or track via state
          const hasSeenNotices = sessionStorage.getItem("hasSeenNotices");
          if (!hasSeenNotices) {
            setIsOpen(true);
            sessionStorage.setItem("hasSeenNotices", "true");
          }
        }
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };
    fetchNotices();
  }, []);

  if (!isOpen || notices.length === 0) return null;

  const currentNotice = notices[currentIndex];

  const handleNext = () => {
    if (currentIndex < notices.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-slate-700 hover:text-slate-900 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {currentNotice.imageUrl && (
          <div className="w-full h-64 sm:h-80 shrink-0 bg-slate-100 relative">
            <img 
              src={currentNotice.imageUrl} 
              alt={currentNotice.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <h2 className="text-2xl sm:text-3xl font-black text-[#002b5b] mb-4 leading-tight">
            {currentNotice.title}
          </h2>
          
          {currentNotice.description && (
            <div 
              className="prose prose-sm sm:prose-base prose-slate max-w-none text-slate-600 font-medium mb-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(currentNotice.description)
              }}
            />
          )}

          {currentNotice.buttonlink && (
            <a 
              href={currentNotice.buttonlink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-[#0077b6] hover:bg-[#023e8a] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#0077b6]/20"
            >
              Explore Now
            </a>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="text-sm font-bold text-slate-500">
            {notices.length > 1 ? `Notice ${currentIndex + 1} of ${notices.length}` : ''}
          </div>
          <button
            onClick={handleNext}
            className="text-[#0077b6] hover:text-[#023e8a] px-4 py-2 font-bold transition-colors"
          >
            {currentIndex < notices.length - 1 ? "Next Notice ➔" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}

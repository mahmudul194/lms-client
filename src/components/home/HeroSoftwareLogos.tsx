"use client";

import { motion } from "motion/react";

export default function HeroSoftwareLogos() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="pt-6 space-y-3 border-t border-slate-200/90"
    >
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-sm">
        {/* 3ds Max */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-teal-600 text-sm sm:text-base">3</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            AUTODESK<br /><span className="font-extrabold">3DS MAX</span>
          </div>
        </div>

        {/* AutoCAD */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-red-600 text-sm sm:text-base">A</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            AUTODESK<br /><span className="font-extrabold">AUTOCAD</span>
          </div>
        </div>

        {/* Navisworks */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-blue-600 text-sm sm:text-base">N</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            AUTODESK<br /><span className="font-extrabold">NAVISWORKS</span>
          </div>
        </div>

        {/* Revit */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-blue-700 text-sm sm:text-base">R</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            AUTODESK<br /><span className="font-extrabold">REVIT</span>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-sm">
        {/* SketchUp */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-red-500 text-sm sm:text-base">S</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            TRIMBLE<br /><span className="font-extrabold">SKETCHUP</span>
          </div>
        </div>

        {/* Tekla */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-sky-700 text-sm sm:text-base">T</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            TRIMBLE<br /><span className="font-extrabold">TEKLA STRUCTURE</span>
          </div>
        </div>

        {/* Lumion */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-blue-500 text-sm sm:text-base">L</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            ACT-3D<br /><span className="font-extrabold">LUMION 3D</span>
          </div>
        </div>

        {/* V-Ray */}
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-slate-800 text-sm sm:text-base">V</span>
          <div className="text-[11px] font-bold leading-tight text-slate-800">
            CHAOS<br /><span className="font-extrabold">V-RAY</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

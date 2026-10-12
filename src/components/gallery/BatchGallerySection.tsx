
"use client";

import { useState } from "react";
import {
  Users,
  ArrowUpRight,
  Image as ImageIcon,
} from "lucide-react";
import { motion } from "motion/react";

interface BatchItem {
  title: string;
  subtitle: string;
  image: string;
  hasImage: boolean;
}

interface BatchGallerySectionProps {
  batches: BatchItem[];
}

interface BatchCardProps {
  batch: BatchItem;
  index: number;
}

function BatchCard({ batch, index }: BatchCardProps) {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  const isComingSoon = !batch.hasImage;

  const isLarge =
    !isComingSoon && (index % 6 === 0 || index % 6 === 5);

  const isWide = !isComingSoon && index % 6 === 3;

  const cardSize = isComingSoon
    ? "lg:col-span-1 lg:row-span-1"
    : isLarge
      ? "lg:col-span-2 lg:row-span-2"
      : isWide
        ? "lg:col-span-2"
        : "lg:col-span-1";

  const handleMouseMove = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setCursor({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08,
        ease: "easeOut",
      }}
      onMouseMove={handleMouseMove}
      className={`group relative isolate min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0077b6]/40 hover:shadow-xl hover:shadow-[#002b5b]/10 ${cardSize}`}
    >
      {/* Cursor-following blue glow */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(260px circle at ${cursor.x}% ${cursor.y}%, rgba(0,119,182,0.16), transparent 75%)`,
        }}
      />

      {/* Image area */}
      <div
        className={`relative overflow-hidden bg-slate-100 ${isLarge
            ? "aspect-[5/4] lg:aspect-auto lg:h-full"
            : "aspect-[5/4] lg:aspect-auto lg:h-full"
          }`}
      >
        {batch.hasImage ? (
          <>
            <img
              src={batch.image}
              alt={batch.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06172c]/90 via-[#06172c]/10 to-[#06172c]/15 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Batch label */}
            <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#06172c]/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {index === 3
                  ? "Currently Running"
                  : `Batch ${index + 1}`}
              </span>
            </div>

            {/* Animated corner icon */}
            <div className="absolute right-3 top-3 z-10 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#002b5b] opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>

            {/* Bottom image caption */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-300 sm:text-xs">
                BIM Student Community
              </p>

              <h3
                className={`font-black leading-tight text-white transition-colors duration-300 group-hover:text-sky-200 ${isLarge
                    ? "text-xl sm:text-2xl lg:text-3xl"
                    : "text-base sm:text-lg"
                  }`}
              >
                {batch.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-200 sm:text-sm">
                {batch.subtitle}
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#0077b6] shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
              <Users className="h-6 w-6" />
            </div>

            <h3 className="text-sm font-bold text-[#002b5b] sm:text-base">
              {batch.title || "Coming Soon"}
            </h3>

            <p className="mt-1.5 max-w-[220px] text-xs leading-5 text-slate-500">
              {batch.subtitle || "New memories are on the way"}
            </p>

            <span className="mt-3 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0077b6]">
              Coming Soon
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function BatchGallerySection({
  batches,
}: BatchGallerySectionProps) {
  const photoCount = batches.filter(
    (batch) => batch.hasImage
  ).length;

  return (
    <section className="space-y-8 sm:space-y-10">
      {/* Section heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0077b6]">
            Moments & Memories
          </p>

          <h2 className="text-2xl font-black tracking-tight text-[#002b5b] sm:text-3xl">
            Student{" "}
            <span className="relative inline-block">
              <span className="text-[#0f4c81]">Gallery</span>

              <svg
                className="absolute -bottom-1.5 left-0 h-3 w-full"
                viewBox="0 0 100 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8C25 2 75 2 98 9"
                  stroke="#0077b6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500">
            A glimpse into our learning community and the students
            growing together through BIM.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <ImageIcon className="h-4 w-4 text-[#0077b6]" />
          <span>{photoCount} photo collections</span>
        </div>
      </div>

      {/* Asymmetric photo grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-[180px] lg:grid-cols-4 lg:gap-5">
        {batches.map((batch, index) => (
          <BatchCard
            key={`${batch.title}-${index}`}
            batch={batch}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

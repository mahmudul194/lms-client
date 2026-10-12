
"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface VideoReview {
  title: string;
  author: string;
  image: string;
  url: string;
}

interface VideoReviewsSectionProps {
  videos: VideoReview[];
  onPlayVideo: (url: string) => void;
}

export default function VideoReviewsSection({
  videos,
  onPlayVideo,
}: VideoReviewsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const pauseUntil = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || videos.length < 2) return;

    let animationFrame = 0;
    let previousTime = 0;

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min(time - previousTime, 32);
      previousTime = time;

      const halfWidth = track.scrollWidth / 2;

      if (!isPaused.current && time > pauseUntil.current && halfWidth > 0) {
        track.scrollLeft += delta * 0.035;

        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }

        if (track.scrollLeft < 0) {
          track.scrollLeft += halfWidth;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [videos.length]);

  const moveGallery = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    const distance = 320 * direction;
    let nextPosition = track.scrollLeft + distance;

    if (nextPosition >= halfWidth) {
      nextPosition -= halfWidth;
    } else if (nextPosition < 0) {
      nextPosition += halfWidth;
    }

    isPaused.current = true;
    track.scrollTo({ left: nextPosition, behavior: "smooth" });
    pauseUntil.current = performance.now() + 900;

    window.setTimeout(() => {
      isPaused.current = false;
    }, 900);
  };

  const duplicatedVideos = [...videos, ...videos];

  return (
    <section className="space-y-7 overflow-hidden pt-8 sm:space-y-9">
      {/* Heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0077b6]">
            Hear from our students
          </p>

          <h2 className="text-2xl font-black tracking-tight text-[#002b5b] sm:text-3xl">
            Video{" "}
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
        </div>

        {videos.length > 1 && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => moveGallery(-1)}
              aria-label="Previous videos"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#002b5b] transition hover:border-[#0077b6] hover:bg-[#0077b6] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => moveGallery(1)}
              aria-label="Next videos"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#002b5b] text-white transition hover:bg-[#0077b6]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Continuous scrolling gallery */}
      {videos.length > 0 && (
        <div
          className="group relative"
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
          onTouchStart={() => {
            isPaused.current = true;
          }}
          onTouchEnd={() => {
            pauseUntil.current = performance.now() + 1000;
            isPaused.current = false;
          }}
        >
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent sm:w-10" />

          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-white to-transparent sm:w-10" />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {duplicatedVideos.map((video, index) => (
              <button
                key={`${video.url}-${index}`}
                type="button"
                onClick={() => onPlayVideo(video.url)}
                tabIndex={index >= videos.length ? -1 : 0}
                aria-hidden={index >= videos.length}
                aria-label={`Play video: ${video.title}`}
                className="group/card w-[280px] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-[#0077b6]/60 hover:shadow-xl hover:shadow-[#002b5b]/10 sm:w-[320px]"
              >
                <div className="relative aspect-video overflow-hidden bg-[#071a2d]">
                  <img
                    src={video.image}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />

                  <div className="absolute inset-0 bg-[#002b5b]/20 transition-colors group-hover/card:bg-[#002b5b]/40" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[#002b5b] shadow-lg transition duration-300 group-hover/card:scale-110 group-hover/card:bg-[#0077b6] group-hover/card:text-white">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-transparent px-4 py-4 transition-colors group-hover/card:border-[#0077b6]">
                  <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition-colors group-hover/card:text-[#0077b6]">
                    {video.title}
                  </h3>

                  <p className="mt-2 truncate text-xs font-medium text-slate-500">
                    {video.author}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

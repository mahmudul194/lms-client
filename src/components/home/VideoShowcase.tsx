"use client";

import React, { useState } from "react";
import CourseFreeVideoGrid from "./CourseFreeVideoGrid";
import VideoModal from "@/components/common/VideoModal";

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoGroups = [
    {
      subtitle: "Free Class Videos",
      title: "Professional Revit Architecture Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      subtitle: "Free Class Videos",
      title: "Professional Revit Structure Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      subtitle: "Free Class Videos",
      title: "Professional Revit MEP Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      subtitle: "Free Class Videos",
      title: "Professional Navisworks Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      subtitle: "Free Class Videos",
      title: "Professional Revit Dynamo Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
    {
      subtitle: "Free Class Videos",
      title: "Professional AutoCAD Course",
      videos: [
        {
          label: "Watch Intro Video",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
        {
          label: "Watch Demo Video",
          image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80",
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        },
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Free Course Preview Video Cards */}
        <CourseFreeVideoGrid
          videoGroups={videoGroups}
          onPlayVideo={(url) => setActiveVideo(url)}
        />

        {/* Video Player Modal */}
        <VideoModal
          videoUrl={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      </div>
    </section>
  );
}

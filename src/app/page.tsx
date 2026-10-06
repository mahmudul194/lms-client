import React from "react";
import HeroSection from "@/components/home/HeroSection";
import RecentBlogsSection from "@/components/home/RecentBlogsSection";
import VideoShowcase from "@/components/home/VideoShowcase";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import TeklaBanner from "@/components/home/TeklaBanner";
import StartToSuccess from "@/components/home/StartToSuccess";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CommunityCards from "@/components/home/CommunityCards";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Recent Engineering & BIM Blogs */}
      <RecentBlogsSection />

      {/* 3. Free Class Videos Showcase */}
      <VideoShowcase />

      {/* 4. 3x3 Course Grid with Discount Badges */}
      <FeaturedCourses />

      {/* 5. Tekla Course & What We Offer */}
      <TeklaBanner />

      {/* 6. Start to Success Stats Bar */}
      <StartToSuccess />

      {/* 7. Testimonials */}
      <TestimonialsSection />

      {/* 8. Social Community Cards (Facebook, YouTube, LinkedIn) */}
      <CommunityCards />
    </div>
  );
}

import React from "react";
import HeroSection from "@/components/home/HeroSection";
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

      {/* 2. Free Class Videos & About Showcase */}
      <VideoShowcase />

      {/* 3. 3x3 Course Grid with Discount Badges */}
      <FeaturedCourses />

      {/* 4. Tekla Course & What We Offer */}
      <TeklaBanner />

      {/* 5. Start to Success Stats Bar */}
      <StartToSuccess />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Social Community Cards (Facebook, YouTube, LinkedIn) */}
      <CommunityCards />
    </div>
  );
}

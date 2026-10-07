"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { batchesApi, BatchItem, reviewsApi } from "@/services/api";
import { getAuthToken } from "@/services/api/apiClient";
import Link from "next/link";

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [batch, setBatch] = useState<BatchItem | any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [playingLesson, setPlayingLesson] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [paymentType, setPaymentType] = useState<"full" | "installment">("full");
  const [reviews, setReviews] = useState<any[]>([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await batchesApi.getBatchById(id);
        if (!isMounted) return;
        if (res.statusCode === 200 && res.data) {
          setBatch(res.data);
          
          // Expand the first module by default if it exists
          if (res.data.course?.modules?.[0]) {
            const firstModId = res.data.course.modules[0].id || 'mod-0';
            setExpandedModules([firstModId]);
          }

          // Fetch reviews for this batch
          const reviewRes = await reviewsApi.getAllReviews();
          if (reviewRes.statusCode === 200 && reviewRes.data) {
            const allReviews = reviewRes.data;
            const batchReviews = allReviews.filter((r: any) => r.batch?.id === id || r.batch?.code === res.data?.code);
            setReviews(batchReviews);
            if (batchReviews.length > 0) {
              const avg = batchReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / batchReviews.length;
              setAvgRating(avg);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch batch details", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => 
      prev.includes(moduleId) ? prev.filter(m => m !== moduleId) : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    if (!termsAccepted) {
      setEnrollError("Please accept the Terms & Conditions to proceed.");
      return;
    }
    
    setEnrollError("");
    const token = getAuthToken();
    if (!token) {
      // Redirect to login, then directly to checkout
      router.push(`/login?redirect=${encodeURIComponent(`/checkout/${batch.id || batch.code}?type=${paymentType}`)}`);
      return;
    }

    // Proceed to checkout/payment page, passing the payment type
    router.push(`/checkout/${batch.id || batch.code}?type=${paymentType}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#002b5b]"></div>
      </div>
    );
  }

  if (!batch || !batch.course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
        <Link href="/" className="px-6 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#002b5b] transition">
          Go Back Home
        </Link>
      </div>
    );
  }

  const { course } = batch;
  const price = batch.price || 16000;
  const discountPrice = batch.discount_price || 12000;

  // Extract mentors
  const mentors = course.mentors || [];

  // Helper to extract Youtube ID for iframe
  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeVideoId(course.intro_video_url);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001e40] to-[#002b5b] text-white pt-24 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm">
              {course.level || "Professional"}
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.15] tracking-tight">
              {course.title || batch.name}
            </h1>
            <p className="text-lg text-blue-100/80 max-w-xl leading-relaxed">
              {course.short_description || course.description || "Learn everything you need to know in this comprehensive course."}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-blue-200/70 uppercase font-bold tracking-wider">Duration</p>
                  <p className="font-semibold">{course.duration || "3"} {course.duration_unit || "Months"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-blue-200/70 uppercase font-bold tracking-wider">Batch Code</p>
                  <p className="font-semibold">{batch.code}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-blue-200/70 uppercase font-bold tracking-wider">Reviews</p>
                  <p className="font-semibold">{avgRating.toFixed(1)} / 5.0 <span className="text-sm font-normal text-blue-200">({reviews.length} reviews)</span></p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 bg-slate-900 group">
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            ) : (course.intro_video_url ? (
              <video 
                src={course.intro_video_url} 
                controls 
                className="w-full h-full object-cover"
                poster={course.thumbnail}
              />
            ) : (course.thumbnail ? (
              <>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001e40]/80 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-500 font-medium">No Course Preview Available</span>
              </div>
            )))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          
          {/* About */}
          <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-extrabold text-[#002b5b] mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077b6]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              About This Course
            </h2>
            <div 
              className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap text-[1.05rem]"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>

          {/* Mentors Section */}
          {mentors && mentors.length > 0 && (
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#002b5b] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077b6]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Your Instructors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor: any) => (
                  <div key={mentor.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 border border-gray-100 rounded-2xl hover:shadow-lg hover:border-gray-200 transition-all duration-300 bg-gray-50/50">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-sm ring-4 ring-white">
                      {(mentor.profileImage || mentor.user?.profile_image) ? (
                        <img 
                          src={mentor.profileImage || mentor.user?.profile_image} 
                          alt={mentor.user?.first_name || "Mentor"} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-full h-full text-gray-300 p-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {mentor.user ? `${mentor.user.first_name || ''} ${mentor.user.last_name || ''}`.trim() : "Instructor"}
                      </h4>
                      <p className="text-sm font-bold text-[#0077b6] mb-2">{mentor.designation || "Course Mentor"}</p>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{mentor.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Curriculum / Modules Accordion */}
          {course.modules && course.modules.length > 0 && (
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-extrabold text-[#002b5b] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077b6]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </span>
                  Course Curriculum
                </h2>
                <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {course.modules.length} Modules
                </span>
              </div>
              
              <div className="space-y-4">
                {course.modules.map((mod: any, idx: number) => {
                  const modId = mod.id || `mod-${idx}`;
                  const isExpanded = expandedModules.includes(modId);
                  const totalLessons = mod.lessons?.length || 0;
                  
                  return (
                    <div key={modId} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-blue-200 shadow-md shadow-blue-900/5 ring-1 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}>
                      <button 
                        onClick={() => toggleModule(modId)}
                        className={`w-full flex items-center justify-between p-5 text-left transition-colors ${isExpanded ? 'bg-blue-50/50' : 'bg-gray-50/50 hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isExpanded ? 'bg-[#0077b6] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}>
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-[#002b5b]' : 'text-gray-900'}`}>
                              {mod.title || mod.name || `Module ${idx + 1}`}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 mt-0.5">
                              {totalLessons} {totalLessons === 1 ? 'Lesson' : 'Lessons'}
                            </p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#0077b6]' : 'text-gray-400'}`}>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      {isExpanded && mod.lessons && mod.lessons.length > 0 && (
                        <div className="bg-white divide-y divide-gray-100 border-t border-blue-100/50">
                          {mod.lessons.map((lesson: any, lIdx: number) => {
                            const isPlaying = playingLesson === (lesson.id || `lesson-${lIdx}`);
                            const lessonYoutubeId = getYoutubeVideoId(lesson.video_url);

                            return (
                            <div 
                              key={lesson.id || lIdx} 
                              className={`p-4 sm:px-6 transition-colors ${lesson.is_preview ? 'cursor-pointer hover:bg-blue-50/30' : 'cursor-not-allowed opacity-80 bg-gray-50'}`}
                              onClick={() => {
                                if (lesson.is_preview) {
                                  setPlayingLesson(isPlaying ? null : (lesson.id || `lesson-${lIdx}`));
                                }
                              }}
                            >
                              <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${lesson.is_preview ? 'bg-green-50 text-green-600 group-hover:bg-green-500 group-hover:text-white' : 'bg-gray-200 text-gray-400 group-hover:bg-gray-300 group-hover:text-gray-700'}`}>
                                    {lesson.is_preview ? (
                                      <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className={`text-[0.95rem] font-semibold transition-colors ${lesson.is_preview ? 'text-gray-900 group-hover:text-green-700' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                      {lesson.title}
                                    </h4>
                                    {lesson.duration > 0 && (
                                      <p className="text-xs font-medium text-gray-500 mt-1 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {lesson.duration} mins
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {lesson.is_preview && (
                                  <span className="bg-green-100 text-green-700 text-[0.7rem] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm ring-1 ring-green-200">
                                    Preview
                                  </span>
                                )}
                              </div>

                              {/* Expanded Inline Video Player */}
                              {isPlaying && lesson.video_url && (
                                <div className="mt-5 w-full bg-black rounded-xl overflow-hidden shadow-lg aspect-video" onClick={(e) => e.stopPropagation()}>
                                  {lessonYoutubeId ? (
                                    <iframe
                                      src={`https://www.youtube.com/embed/${lessonYoutubeId}?autoplay=1`}
                                      title={lesson.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="w-full h-full"
                                    />
                                  ) : (
                                    <video 
                                      src={lesson.video_url} 
                                      controls 
                                      autoPlay
                                      className="w-full h-full object-contain"
                                    />
                                  )}
                                </div>
                              )}
                              
                              {/* If no video URL but it's playing (rare edge case) */}
                              {isPlaying && !lesson.video_url && (
                                <div className="mt-5 w-full bg-gray-100 rounded-xl p-6 text-center border border-gray-200" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-gray-500">Video content is not available for this lesson yet.</span>
                                </div>
                              )}
                            </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Batch Details */}
          <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-extrabold text-[#002b5b] mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0077b6]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Batch Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Start Date</span>
                <p className="text-xl font-bold text-[#002b5b]">
                  {batch.start_date ? new Date(batch.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"}
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Class Mode</span>
                <p className="text-xl font-bold text-[#002b5b] capitalize">
                  {batch.mode || "Online"} - {batch.class_type || "Live"}
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Registration Ends</span>
                <p className="text-xl font-bold text-[#002b5b]">
                  {batch.registration_end ? new Date(batch.registration_end).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"}
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Available Seats</span>
                <p className="text-xl font-bold text-[#002b5b]">
                  {batch.capacity ? (batch.capacity - (batch.enrolled_count || 0)) : "Limited"}
                </p>
              </div>
            </div>
          </div>

          {/* Student Reviews Section */}
          {reviews.length > 0 && (
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-extrabold text-[#002b5b] mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
                Student Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm italic">&ldquo;{review.comment}&rdquo;</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-200 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0077b6] font-bold text-lg">
                        {review.student?.name ? review.student.name.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{review.student?.name || "Anonymous Student"}</p>
                        <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-[#002b5b]/5 border border-gray-100 sticky top-28">
            <h3 className="text-xl font-black text-[#002b5b] mb-3">Enrollment Details</h3>
            <div className="flex flex-col mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black text-[#0077b6]">
                  ৳{paymentType === 'full' ? discountPrice.toLocaleString() : (discountPrice / 2).toLocaleString()}
                </span>
                {paymentType === 'installment' && (
                  <span className="text-lg text-gray-500 font-semibold mb-1">/ 1st payment</span>
                )}
              </div>
              {price > discountPrice && paymentType === 'full' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg text-gray-400 line-through decoration-2 font-semibold">
                    ৳{price.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    Discount
                  </span>
                </div>
              )}
            </div>

            {/* Payment Options Toggle */}
            <div className="mb-8 space-y-3">
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === 'full' ? 'border-[#0077b6] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => setPaymentType('full')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'full' ? 'border-[#0077b6]' : 'border-gray-300'}`}>
                    {paymentType === 'full' && <div className="w-2.5 h-2.5 rounded-full bg-[#0077b6]" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Pay in Full</p>
                    <p className="text-xs text-gray-500">One time payment</p>
                  </div>
                </div>
                <span className="font-bold text-[#002b5b]">৳{discountPrice.toLocaleString()}</span>
              </label>

              <label 
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === 'installment' ? 'border-[#0077b6] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => setPaymentType('installment')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentType === 'installment' ? 'border-[#0077b6]' : 'border-gray-300'}`}>
                    {paymentType === 'installment' && <div className="w-2.5 h-2.5 rounded-full bg-[#0077b6]" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Pay in Installments</p>
                    <p className="text-xs text-gray-500">2 payments of ৳{(discountPrice / 2).toLocaleString()}</p>
                  </div>
                </div>
              </label>
            </div>
            
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium leading-tight">Full access to course materials</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium leading-tight">Live sessions with mentor</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-green-100 p-1 rounded-full text-green-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium leading-tight">Certificate of completion</span>
              </li>
            </ul>

            {enrollError && (
              <p className="text-red-600 text-sm font-semibold mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{enrollError}</p>
            )}

            <div className="mb-6 flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms" 
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) setEnrollError("");
                }}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0077b6] focus:ring-[#0077b6] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 font-medium cursor-pointer">
                I agree to the <a href="/terms" className="text-[#0077b6] hover:underline">Terms & Conditions</a> and Refund Policy.
              </label>
            </div>

            <button 
              onClick={handleEnroll}
              className="w-full py-4 bg-gradient-to-r from-[#0077b6] to-[#005f92] hover:from-[#005f92] hover:to-[#004771] text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#0077b6]/30 transform hover:-translate-y-1"
            >
              Enroll Now {paymentType === 'installment' ? '(Pay 1st Installment)' : ''}
            </button>
            <p className="text-center text-sm font-semibold text-gray-400 mt-4">
              Secure checkout • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

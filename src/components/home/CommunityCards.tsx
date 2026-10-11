"use client";

import { ArrowUpRight, Sparkles, Users } from "lucide-react";
import { motion } from "motion/react";

export default function CommunityCards() {
  const cards = [
    {
      title: "Facebook Community",
      desc: "Connect with fellow engineers, ask questions, and share project updates.",
      action: "Join Community",
      link: "https://www.facebook.com",
      accentBorder: "group-hover:border-[#1877f2]/40",
      topGlow: "via-[#1877f2]",
      badgeBg: "bg-blue-50 text-[#1877f2] group-hover:bg-[#1877f2] group-hover:text-white",
      btnClass: "bg-[#1877f2] hover:bg-[#166fe5]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      title: "YouTube Channel",
      desc: "Watch free tutorials, BIM workflows, and practical engineering guides.",
      action: "Subscribe Channel",
      link: "https://www.youtube.com",
      accentBorder: "group-hover:border-[#ff0000]/40",
      topGlow: "via-[#ff0000]",
      badgeBg: "bg-red-50 text-[#ff0000] group-hover:bg-[#ff0000] group-hover:text-white",
      btnClass: "bg-[#e60000] hover:bg-[#cc0000]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      title: "LinkedIn Network",
      desc: "Stay updated with industry insights, company news, and career opportunities.",
      action: "Follow Page",
      link: "https://www.linkedin.com",
      accentBorder: "group-hover:border-[#0a66c2]/40",
      topGlow: "via-[#0a66c2]",
      badgeBg: "bg-sky-50 text-[#0a66c2] group-hover:bg-[#0a66c2] group-hover:text-white",
      btnClass: "bg-[#0a66c2] hover:bg-[#084e96]",
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-slate-200/70 bg-slate-50/80 py-16 font-sans sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(700px,90%)] -translate-x-1/2 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] space-y-10 px-4 sm:px-8 lg:space-y-12 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0077b6]">
            Stay Connected
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-[#002b5b] sm:text-3xl md:text-4xl">
            Join Our{" "}
            <span className="text-[#0077b6]">Learning Community</span>
          </h2>

          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#0077b6]/70" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Connect with our community, learn from experts, and stay updated
            with the latest tutorials and opportunities.
          </p>
        </motion.div>

        {/* Community Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-7"
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/[0.07] ${card.accentBorder}`}
            >
              {/* Brand Header */}
              <div className="relative flex h-28 items-center justify-between overflow-hidden bg-slate-50 px-7 sm:px-8">
                <div
                  className={`absolute inset-x-0 top-0 h-1 ${card.topGlow}`}
                />

                <div className="pointer-events-none absolute -right-5 -top-12 h-36 w-36 rounded-full border border-slate-200/70 transition-transform duration-500 group-hover:scale-125" />
                <div className="pointer-events-none absolute -right-1 -top-5 h-24 w-24 rounded-full border border-slate-200/70 transition-transform duration-500 group-hover:scale-110" />

                <div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:rotate-[-5deg] group-hover:scale-110 ${card.badgeBg}`}
                >
                  {card.icon}
                </div>

                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition-all duration-300 group-hover:bg-[#002b5b] group-hover:text-white">
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Connect & Explore
                </span>

                <h3 className="text-xl font-bold tracking-tight text-[#002b5b] transition-colors duration-300 group-hover:text-[#0077b6]">
                  {card.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                  {card.desc}
                </p>

                {/* Bottom Action */}
                <div className="mt-7 border-t border-slate-100 pt-5">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0077b6] focus-visible:ring-offset-2 ${card.btnClass}`}
                  >
                    {card.action}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Community Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-2 pt-1 text-center sm:flex-row sm:gap-3"
        >
          <div className="flex items-center gap-2 text-[#0077b6]">
            <Users className="h-4 w-4" />
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <p className="text-xs leading-5 text-slate-500 sm:text-sm">
            Learn together, share knowledge, and grow with the community.
          </p>
        </motion.div>
      </div>
    </section >
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

type ImageType = "achievement" | "event" | "official" | "grid";

type JourneyImage = {
  src: string;
  alt: string;
  type: ImageType;
}

function ImageSlider({ images, isInView }: { images: JourneyImage[]; isInView: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (e: any, { offset }: PanInfo) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && activeIndex < images.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else if (offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const isGoingNext = e.deltaX > 20 || e.deltaY > 20;
      const isGoingPrev = e.deltaX < -20 || e.deltaY < -20;

      if (isGoingNext || isGoingPrev) {
        // Stop the page from scrolling when interacting with the slider
        e.preventDefault();
      }

      if (scrollTimeout.current) return;

      if (isGoingNext && activeIndex < images.length - 1) {
        setActiveIndex((prev) => prev + 1);
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 600);
      } else if (isGoingPrev && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 600);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeIndex, images.length]);

  return (
    <motion.div
      ref={sliderRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full flex flex-col gap-6 overflow-hidden"
    >
      <div className="relative w-full">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex w-full cursor-grab active:cursor-grabbing"
        >
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={img.src}
                className="w-full flex-shrink-0 flex justify-center items-center px-2"
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="relative w-full rounded-[20px] overflow-hidden shadow-2xl border border-white/10">
                  {img.src.endsWith(".mp4") ? (
                    <video
                      src={img.src}
                      controls
                      playsInline
                      className="w-full h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain object-center"
                    />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain object-center pointer-events-none"
                      quality={90}
                      draggable={false}
                    />
                  )}
                  {/* Subtle gradient overlay to integrate with dark theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 mt-2 z-10 relative h-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-400 ease-in-out ${i === activeIndex
              ? "w-8 h-2 bg-white"
              : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

const milestones = [
  {
    year: "2017",
    phase: "The Beginning",
    title: "The First Spark",
    story: "Watching an Ahmed Abou Zaid video about the importance of programming. I started learning Python and HTML, and built my first project: a simple calculator.\n\n\"Every big thing starts with small curiosity.\"",
    tag: "Age 9",
    images: [],
  },
  {
    year: "2020",
    phase: "The Turning Point",
    title: "Joining DECI",
    story: "Passed admission tests at Benha University for the Digital Egypt Cubs Initiative (DECI). This initiative completely changed my path — offering 5 levels by the Ministry of Communications in collaboration with Udacity.",
    tag: "Age 13 · Prep School",
    images: [
      {
        src: "/images/DECI-L2-email.jpeg",
        alt: "DECI Level 2 Admission",
        type: "achievement" as ImageType,
      }
    ],
  },
  {
    year: "2020–2021",
    phase: "Building Strong Foundations",
    title: "DECI Level 2",
    story: "I explored different fields to discover my true passion, learning Programming Fundamentals, Web Development, Cybersecurity, AI & Data Analysis, Embedded Systems, and Digital Arts & UI/UX.",
    tag: "DECI Level 2",
    images: [
      {
        src: "/images/DECI-session-img.jpg",
        alt: "Sessions with teammates",
        type: "event" as ImageType,
      }
    ],
  },
  {
    year: "2021–2022",
    phase: "Specialization",
    title: "DECI Level 3",
    story: "Choosing specialization in AI & Data Analysis. I felt this is the future of the world, even though I loved Web Development. I learned Practical Data Analysis, working with large datasets, Web Scraping, and SQL.",
    tag: "DECI Level 3",
    images: [
      {
        src: "/images/DECI-L3-email.jpeg",
        alt: "DECI Level 3 Specialization",
        type: "achievement" as ImageType,
      }
    ],
  },
  {
    year: "2022–2023",
    phase: "Deep Dive",
    title: "DECI Level 4",
    story: "Diving into advanced AI concepts, mastering Pandas, NumPy, Matplotlib, Seaborn, Machine Learning, and Linear Regression. Completed the initiative in 2024 — 5 levels over a 4-year journey.",
    tag: "DECI Level 4",
    images: [
      {
        src: "/images/DECI-L4-email.jpeg",
        alt: "DECI Completion",
        type: "achievement" as ImageType,
      }
    ],
  },
  {
    year: "2023",
    phase: "Professional Start",
    title: "WE ATS School",
    story: "Joining WE Applied Technology Schools with a focus on Computer Science & Web Development. I am learning HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, MySQL, Data Structures & Algorithms (DSA), and Advanced OOP.",
    tag: "Age 17",
    images: [],
  },
  {
    year: "2024",
    phase: "First International Exposure",
    title: "EduTech Event",
    story: "Attended an EduTech Event where I met representatives of the European Union. My interview was not aired due to copyright restrictions on the school uniform.\n\n\"Every challenge teaches you something new.\"",
    tag: "EduTech 2024",
    images: [
      {
        src: "/images/EDU-teck-event.jpg",
        alt: "EU booth at EduTech",
        type: "event" as ImageType,
      },
      {
        src: "/images/United-Europe.mp4",
        alt: "United Europe Video 1",
        type: "event" as ImageType,
      },
      {
        src: "/images/United-Europe (2).mp4",
        alt: "United Europe Video 2",
        type: "event" as ImageType,
      }
    ],
  },
  {
    year: "2024",
    phase: "First Official School Project",
    title: "Student Grades Management System",
    story: "Presented a Student Grades Management System idea to NASS Academy. The project was approved and execution started.\n\n\"From a student to a solution provider.\"",
    tag: "Client: NASS Academy",
    images: [],
  },
  {
    year: "2024",
    phase: "Leadership Role",
    title: "One of the School Leaders",
    story: "Became a school leader, organizing school operations with management, participating in decision-making, and welcoming new students.\n\n\"Leadership is not a position, it's a responsibility.\"",
    tag: "Student Leadership",
    images: [
      {
        src: "/images/students-admession-support-leader.jpg",
        alt: "Official ceremony photo",
        type: "official" as ImageType,
      },
      {
        src: "/images/student-admession-support-leaders-day-2.jpg",
        alt: "Supporting students on day 2",
        type: "event" as ImageType,
      }
    ],
  },
  {
    year: "2024–2025",
    phase: "Impactful Projects",
    title: "Three Major Systems Created",
    story: "1. Student Grades Lookup System: React + Google Apps Script, Arabic RTL, PDF Reports.\n2. Leaders Violations System: Firebase + Google Sheets Sync, 36 categories, real-time tracking.\n3. NFC Attendance System: ESP32 + MFRC522, Firebase Integration, WhatsApp Notifications.\n\nUnified systems impacting hundreds of students.",
    tag: "Real-world Applications",
    images: [],
  },
  {
    year: "2024",
    phase: "Recognition & Competition",
    title: "Cairo ICT Event - Representing My School and Winning Twice",
    story: "I represented WE Applied Technology School at the Cairo ICT Event for two days. On day one, I stood at the Ministry of Communications and Information Technology booth, showcasing our school's achievements and innovations. On day two, I competed with my teammates in two major challenges — and we won both. First prize in Cybersecurity, and first prize in Video Editing. Each competition came with a 1,000 EGP award. We walked away with recognition, experience, and proof that hard work pays off.",
    tag: "Cairo ICT · Ministry of Communications · 2,000 EGP in prizes",
    images: [
      {
        src: "/images/cairo-ict-img.jpg",
        alt: "Representing school at MCIT booth",
        type: "event" as ImageType,
      },
      {
        src: "/images/cairo-ict-stage-img.jpg",
        alt: "Winning competitions at Cairo ICT",
        type: "official" as ImageType,
      },
      {
        src: "/images/cairo-ict-cypersecurity-competition.jpg",
        alt: "Cybersecurity competition",
        type: "achievement" as ImageType,
      },
      {
        src: "/images/cairo-ict-video-editing-compitition.jpg",
        alt: "Video editing competition",
        type: "achievement" as ImageType,
      }
    ],
  },
  {
    year: "2025",
    phase: "First TV Appearance",
    title: "Featured in a TV Program",
    story: "Featured last month (February 2025) to talk about my tech journey and projects.\n\n\"From following technology to speaking about it on media.\"",
    tag: "Media Feature",
    images: [
      {
        src: "/images/TV-interview.jpg",
        alt: "TV Interview",
        type: "event" as ImageType,
      },
      {
        src: "/images/TV-interveiw-full-video.mp4",
        alt: "TV Interview Full Video",
        type: "event" as ImageType,
      }
    ],
  },
  {
    year: "2025",
    phase: "Present",
    title: "Building the Future",
    story: "Frontend Engineer specializing in AI-powered solutions. Active on Upwork, Mostaql, Khamsat. Building my portfolio and personal brand with active projects like Boostly, Exotics Driver, and my personal portfolio website using React, Next.js, Firebase, and AI Tools.",
    tag: "Current Status",
    images: [],
  },
  {
    year: "2026+",
    phase: "The Vision",
    title: "The Future",
    story: "Become a globally impactful Software Engineer, launch an AI startup solving real-world problems, and contribute to society through technology.\n\n\"The journey has just begun… and the best is yet to come.\"",
    tag: "Future Vision",
    images: [],
  },
];

function MilestoneSection({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <div
      ref={ref}
      className="min-h-[80vh] md:min-h-screen flex items-center justify-center px-6 md:px-20 py-16 md:py-32 relative border-t border-white/5"
    >
      {/* Large background year */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 text-[25vw] md:text-[20vw] font-bold text-white select-none pointer-events-none leading-none z-0 overflow-hidden"
      >
        {milestone.year}
      </motion.div>

      <div className="max-w-[1000px] w-full relative z-10 flex flex-col md:flex-row gap-10 md:gap-24 items-center">

        {/* Text Column */}
        <div className={`w-full ${milestone.images.length > 0 ? 'md:w-1/2' : 'max-w-3xl'} space-y-8 flex-shrink-0`}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-white/30 font-mono"
          >
            {String(index + 1).padStart(2, "0")} / {milestones.length.toString().padStart(2, "0")} — {milestone.phase}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl md:text-5xl font-bold text-white leading-tight"
          >
            {milestone.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base md:text-lg text-white/50 leading-relaxed"
          >
            {milestone.story}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block border border-white/20 text-white/40 text-[10px] md:text-xs uppercase tracking-widest px-4 py-2 rounded-full font-mono bg-white/5"
          >
            {milestone.tag}
          </motion.div>
        </div>

        {/* Images Column */}
        {milestone.images.length > 0 && (
          <div className="w-full md:w-1/2 max-w-[min(100%,calc(100vw-3rem))] mx-auto overflow-hidden">
            {milestone.images.length > 1 ? (
              <ImageSlider images={milestone.images} isInView={isInView} />
            ) : (
              milestone.images.map((img, i) => {
                // Different styles based on type
                const isAchievement = img.type === "achievement";
                const isEvent = img.type === "event";

                return (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
                    className={`relative mx-auto rounded-[20px] overflow-hidden shadow-2xl ${isAchievement ? "border border-white/10 md:max-w-md" :
                      isEvent ? "border border-white/5" :
                        "border border-white/15 drop-shadow-2xl"
                      }`}
                  >
                    {img.src.endsWith(".mp4") ? (
                      <video
                        src={img.src}
                        controls
                        playsInline
                        className="w-full h-auto max-w-full max-h-[70vh] md:max-h-[80vh] object-contain object-center opacity-90 hover:opacity-100 transition-opacity duration-500"
                      />
                    ) : (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={600}
                        className="w-full h-auto max-w-full max-h-[70vh] md:max-h-[80vh] object-contain object-center opacity-90 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        quality={90}
                        draggable={false}
                      />
                    )}
                    {/* Subtle gradient overlay to integrate with dark theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none mix-blend-multiply" />
                  </motion.div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="journey" className="relative">
      {/* Header */}
      <div className="sticky top-0 z-20 px-6 md:px-20 py-4 md:py-6 bg-black/60 backdrop-blur-md border-b border-white/5">
        <p className="text-xs uppercase tracking-widest text-white/30 font-mono">Journey</p>
      </div>

      {milestones.map((m, i) => (
        <MilestoneSection key={i} milestone={m} index={i} />
      ))}
    </section>
  );
}

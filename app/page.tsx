"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Teaser({
  title,
  subtitle,
  description,
  href,
  label,
  imageSrc,
  id
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  label: string;
  imageSrc: string;
  id?: string;
}) {
  const { ref, isInView } = useScrollAnimation(0.2);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[70vh] flex items-center px-6 md:px-20 py-24 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Side: Content */}
        <div className="order-2 md:order-1">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-6">{label}</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-8">
            {title}<br />
            <span className="text-white/30">{subtitle}</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed max-w-xl mb-10">
            {description}
          </p>
          <Link
            href={href}
            className="group inline-flex items-center gap-4 text-white font-medium tracking-wide transition-all duration-300"
          >
            <span className="border-b border-white/20 group-hover:border-white pb-1 transition-colors">
              Explore the {label}
            </span>
            <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src={imageSrc}
              alt={label}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              quality={90}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <main className="relative text-white">
      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* Teasers */}
      <Teaser
        label="About"
        title="I don't just write code."
        subtitle="I build systems that matter."
        description="At 18, I specialize in AI & Data Analysis, lead teams, and ship software that's running in real environments. My journey is driven by a startup mindset and a desire for real-world impact."
        href="/about"
        imageSrc="/images/DECI-session-img.jpg"
      />

      <Teaser
        id="journey"
        label="Journey"
        title="A decade of creation."
        subtitle="From first spark to TV fame."
        description="Follow my path from age 9 to representing my school at Cairo ICT and appearing on national television. A story of curiosity, specialization, and leadership."
        href="/journey"
        imageSrc="/images/cairo-ict-img.jpg"
      />

      <Teaser
        label="Projects"
        title="Built for real people."
        subtitle="With real-world impact."
        description="From student grading systems to productivity platforms like Boostly. I design and deploy solutions that solve actual problems for hundreds of users."
        href="/projects"
        imageSrc="/images/students-admession-support-leader.jpg"
      />

      <Teaser
        label="Media"
        title="The world is noticing."
        subtitle="Sharing the vision."
        description="Interviews on Egyptian national television and meetings with international representatives. See how my work is reaching a wider audience."
        href="/media"
        imageSrc="/images/TV-interview.jpg"
      />

      {/* Final CTA */}
      <section className="min-h-[500px] flex flex-col items-center justify-center px-6 md:px-20 py-32 border-t border-white/5 bg-white/[0.01]">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center">
          Ready to build <br />
          <span className="text-white/30">the future?</span>
        </h2>
        <Link
          href="/contact"
          className="bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform duration-300"
        >
          Let's Connect
        </Link>
      </section>
    </main>
  );
}

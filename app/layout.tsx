import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omar Mohamed Gad — Software Engineer & Future AI Founder",
  description:
    "18-year-old software engineer, AI enthusiast, and student leader building systems that create real impact.",
};

import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Sidebar from "@/components/ui/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {/* Fixed background geo-pattern */}
        <AnimatedBackground />
        {/* Fixed left sidebar */}
        <Sidebar />
        
        {children}
      </body>
    </html>
  );
}

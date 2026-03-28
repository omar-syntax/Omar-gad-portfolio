"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center space-y-6 p-12 border border-white/10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-3xl"
      >
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Message Sent</h3>
          <p className="text-white/40 text-sm md:text-base max-w-xs mx-auto leading-relaxed">
            I've received your inquiry and will reach out to you shortly.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-8 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest text-white/50 hover:text-white hover:border-white transition-all duration-300"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-8 text-left"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-white/30 ml-4">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Omar Gad"
            className="w-full bg-white/[0.02] border border-white/5 rounded-3xl px-7 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all duration-500"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-white/30 ml-4">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="omar@example.com"
            className="w-full bg-white/[0.02] border border-white/5 rounded-3xl px-7 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all duration-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-white/30 ml-4">Your Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project or just say hi..."
          className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] px-7 py-6 text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all duration-500 resize-none"
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-red-400 text-xs bg-red-400/5 px-6 py-4 rounded-2xl border border-red-400/10"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group relative w-full h-[72px] bg-white text-black font-bold rounded-full overflow-hidden hover:scale-[0.99] active:scale-[0.97] transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100"
      >
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-center justify-center gap-3 relative z-10">
          {status === "loading" ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="uppercase tracking-[0.1em] text-sm">Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </>
          )}
        </div>
      </button>
    </motion.form>
  );
}

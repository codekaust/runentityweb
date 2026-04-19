"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StippleBackground from "@/components/ui/StippleBackground";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <section className="relative bg-[#FAFAF8] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <StippleBackground />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(250,250,248,0.85) 0%, rgba(250,250,248,0) 100%)",
          }}
        />
      </div>

      <div className="container-content px-5 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 relative z-10">
        <div className="text-center max-w-[800px] mx-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-[28px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold text-[#1A1A1A] leading-[1.12] tracking-[-0.02em] mb-6"
          >
            India&apos;s first{" "}
            <span className="text-gradient">agentic AI</span>
            <br />
            accounting firm.
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="font-body text-[16px] text-[#6B6B6B] leading-[1.7] max-w-[560px] mx-auto mb-5"
          >
            A team of AI agents that live on top of your books and the GST portal.
            GSTR-2B reconciliation that runs while you sleep. Audits on demand, not on a calendar.
            Ask your books the way you&apos;d ask a junior — get answers the way a partner would.
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
            className="font-display text-[17px] md:text-[19px] font-semibold text-[#1A1A1A] tracking-[-0.01em] mb-6"
          >
            Tally + Zoho from day 1.{" "}
            <span className="text-[#6B6B6B] font-normal">Not a chatbot. Not a dashboard. The actual work.</span>
          </motion.p>

          {/* Email waitlist form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-4"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white rounded-xl font-body text-[15px]"
              >
                You&apos;re on the list. We&apos;ll reach out personally.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-[440px] mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading"}
                  className="w-full sm:flex-1 px-4 py-3.5 rounded-xl border border-[#E5E5E0] bg-white text-[15px] font-body text-[#1A1A1A] placeholder-[#ABABAB] focus:outline-none focus:border-[#1A1A1A] transition-colors disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A1A1A] text-white font-body font-medium text-[15px] rounded-xl tracking-[-0.01em] shadow-[0_2px_8px_rgba(0,0,0,0.12)] disabled:opacity-60 whitespace-nowrap"
                  whileHover={{ scale: 1.02, backgroundColor: "#2A2A2A" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "loading" ? "Joining..." : (
                    <>Get early access <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-[13px] text-red-500 font-body">{errorMsg}</p>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="text-[13px] text-[#ABABAB] font-body"
          >
            First 100 get personally onboarded.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

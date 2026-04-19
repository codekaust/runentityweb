"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EntityMark } from "@/components/entity-mark";

/* ── Stipple art: AI agent (robotic/geometric figure) working on account books ── */
function StippleArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ w: 700, h: 650 });

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 640;
      setDimensions({
        w: isMobile ? Math.min(window.innerWidth * 0.8, 350) : Math.min(window.innerWidth * 0.45, 500),
        h: isMobile ? Math.min(window.innerHeight * 0.35, 280) : Math.min(window.innerHeight * 0.5, 380),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.w * dpr;
    canvas.height = dimensions.h * dpr;
    c.scale(dpr, dpr);
    c.clearRect(0, 0, dimensions.w, dimensions.h);

    function mulberry32(a: number) {
      return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(77);

    // Scale everything to fit the smaller canvas
    const s = dimensions.h / 650;
    c.save();
    c.scale(s, s);
    const cx = (dimensions.w / s) * 0.5;
    const baseY = (dimensions.h / s) * 0.88;

    // Stipple fill for ellipse
    function stippleEllipse(
      x: number, y: number, rx: number, ry: number,
      density: number, opacity: number
    ) {
      const count = Math.floor(rx * ry * density * 0.025);
      for (let i = 0; i < count; i++) {
        const angle = rand() * Math.PI * 2;
        const r = Math.sqrt(rand());
        const px = x + Math.cos(angle) * r * rx + (rand() - 0.5) * 2;
        const py = y + Math.sin(angle) * r * ry + (rand() - 0.5) * 2;
        const size = 0.5 + rand() * 1.1;
        const a = opacity * (0.3 + 0.7 * (1 - r));
        c.beginPath();
        c.arc(px, py, size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${a})`;
        c.fill();
      }
    }

    // Stipple fill for rectangle
    function stippleRect(
      x: number, y: number, w: number, h: number,
      density: number, opacity: number
    ) {
      const count = Math.floor(w * h * density * 0.003);
      for (let i = 0; i < count; i++) {
        const px = x + rand() * w;
        const py = y + rand() * h;
        const size = 0.5 + rand() * 1.0;
        c.beginPath();
        c.arc(px, py, size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity * (0.4 + rand() * 0.6)})`;
        c.fill();
      }
    }

    // Stipple outline for rectangle
    function stippleRectOutline(
      x: number, y: number, w: number, h: number,
      density: number, opacity: number
    ) {
      const perimeter = 2 * (w + h);
      const count = Math.floor(perimeter * density * 0.3);
      for (let i = 0; i < count; i++) {
        let px: number, py: number;
        const pos = rand() * perimeter;
        if (pos < w) { px = x + pos; py = y; }
        else if (pos < w + h) { px = x + w; py = y + (pos - w); }
        else if (pos < 2 * w + h) { px = x + w - (pos - w - h); py = y + h; }
        else { px = x; py = y + h - (pos - 2 * w - h); }
        px += (rand() - 0.5) * 3;
        py += (rand() - 0.5) * 3;
        c.beginPath();
        c.arc(px, py, 0.5 + rand() * 0.8, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity * (0.4 + rand() * 0.6)})`;
        c.fill();
      }
    }

    // Stipple line
    function stippleLine(
      x1: number, y1: number, x2: number, y2: number,
      count: number, opacity: number
    ) {
      for (let i = 0; i < count; i++) {
        const t = rand();
        const px = x1 + (x2 - x1) * t + (rand() - 0.5) * 2;
        const py = y1 + (y2 - y1) * t + (rand() - 0.5) * 2;
        c.beginPath();
        c.arc(px, py, 0.4 + rand() * 0.7, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${opacity})`;
        c.fill();
      }
    }

    /* ── AI Agent (geometric/robotic head + body) ── */
    const agentCx = cx;
    const agentTop = baseY - 380;

    // Head — rounded square shape (AI/robotic)
    stippleRectOutline(agentCx - 40, agentTop, 80, 75, 4, 0.65);
    // Eyes — two small circles (like LED eyes)
    stippleEllipse(agentCx - 16, agentTop + 30, 8, 8, 5, 0.8);
    stippleEllipse(agentCx + 16, agentTop + 30, 8, 8, 5, 0.8);
    // Mouth — horizontal line
    stippleLine(agentCx - 15, agentTop + 52, agentCx + 15, agentTop + 52, 30, 0.5);
    // Antenna
    stippleLine(agentCx, agentTop - 15, agentCx, agentTop, 20, 0.5);
    stippleEllipse(agentCx, agentTop - 20, 5, 5, 5, 0.7);

    // Neck
    stippleRect(agentCx - 12, agentTop + 75, 24, 20, 3, 0.4);

    // Torso
    stippleRectOutline(agentCx - 55, agentTop + 95, 110, 100, 3, 0.5);
    // Chest detail — circuit pattern lines
    stippleLine(agentCx - 30, agentTop + 120, agentCx + 30, agentTop + 120, 40, 0.3);
    stippleLine(agentCx, agentTop + 110, agentCx, agentTop + 150, 30, 0.3);
    // Small circle in chest (power core)
    stippleEllipse(agentCx, agentTop + 135, 10, 10, 4, 0.55);

    // Left arm — reaching down to book
    stippleRect(agentCx - 70, agentTop + 100, 18, 80, 3, 0.4);
    // Left hand area
    stippleEllipse(agentCx - 62, agentTop + 185, 14, 10, 3, 0.45);

    // Right arm — bent, writing
    stippleRect(agentCx + 52, agentTop + 100, 18, 60, 3, 0.4);
    // Right forearm angled down
    stippleRect(agentCx + 40, agentTop + 160, 35, 15, 3, 0.4);
    // Pen in right hand
    stippleLine(agentCx + 75, agentTop + 165, agentCx + 90, agentTop + 200, 25, 0.55);

    /* ── Account Books / Ledgers on desk ── */
    const deskY = baseY - 120;

    // Desk surface
    stippleLine(cx - 200, deskY, cx + 200, deskY, 200, 0.3);

    // Open ledger book (center) — two pages spread
    const bookCx = agentCx - 10;
    const bookY = deskY - 60;
    // Left page
    stippleRectOutline(bookCx - 85, bookY, 80, 55, 3, 0.55);
    stippleRect(bookCx - 85, bookY, 80, 55, 1.5, 0.15);
    // Right page
    stippleRectOutline(bookCx + 5, bookY, 80, 55, 3, 0.55);
    stippleRect(bookCx + 5, bookY, 80, 55, 1.5, 0.15);
    // Spine
    stippleLine(bookCx, bookY, bookCx, bookY + 55, 40, 0.6);
    // Ruled lines on pages
    for (let i = 1; i <= 4; i++) {
      const ly = bookY + i * 11;
      stippleLine(bookCx - 80, ly, bookCx - 10, ly, 20, 0.2);
      stippleLine(bookCx + 10, ly, bookCx + 80, ly, 20, 0.2);
    }
    // Column divider (T-account style)
    stippleLine(bookCx - 45, bookY + 5, bookCx - 45, bookY + 50, 25, 0.25);
    stippleLine(bookCx + 45, bookY + 5, bookCx + 45, bookY + 50, 25, 0.25);

    // Stack of closed books (right side)
    const stackX = cx + 120;
    const stackY = deskY - 40;
    for (let i = 0; i < 3; i++) {
      const sy = stackY + i * 12;
      stippleRectOutline(stackX, sy, 60, 10, 3, 0.4);
      stippleRect(stackX, sy, 60, 10, 2, 0.15);
    }
    // Spine labels — little lines
    for (let i = 0; i < 3; i++) {
      stippleLine(stackX + 5, stackY + i * 12 + 5, stackX + 25, stackY + i * 12 + 5, 10, 0.3);
    }

    // Small scroll/document on left
    stippleRectOutline(cx - 170, deskY - 50, 40, 50, 2, 0.35);
    stippleLine(cx - 165, deskY - 40, cx - 135, deskY - 40, 12, 0.2);
    stippleLine(cx - 165, deskY - 30, cx - 140, deskY - 30, 10, 0.2);
    stippleLine(cx - 165, deskY - 20, cx - 135, deskY - 20, 12, 0.2);

    // Floating data particles around agent (AI working)
    for (let i = 0; i < 60; i++) {
      const angle = rand() * Math.PI * 2;
      const dist = 180 + rand() * 120;
      const px = agentCx + Math.cos(angle) * dist;
      const py = agentTop + 100 + Math.sin(angle) * dist * 0.6;
      if (py > deskY + 10) continue;
      c.beginPath();
      c.arc(px, py, 0.4 + rand() * 0.8, 0, Math.PI * 2);
      c.fillStyle = `rgba(255,255,255,${0.08 + rand() * 0.15})`;
      c.fill();
    }

    // Ambient scatter
    const scaledW = dimensions.w / s;
    const scaledH = dimensions.h / s;
    for (let i = 0; i < 150; i++) {
      const x = rand() * scaledW;
      const y = rand() * scaledH;
      c.beginPath();
      c.arc(x, y, 0.3 + rand() * 0.5, 0, Math.PI * 2);
      c.fillStyle = `rgba(255,255,255,${0.03 + rand() * 0.06})`;
      c.fill();
    }

    c.restore();
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: dimensions.w, height: dimensions.h }}
      className="pointer-events-none"
    />
  );
}

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
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
    <section
      id="waitlist"
      className="relative bg-[#0A0A0A] overflow-hidden"
      ref={sectionRef}
    >
      <div className="container-content px-5 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-16 lg:pt-20 pb-10 sm:pb-16">
        {/* Center content area */}
        <div className="flex flex-col items-center text-center">
          {/* Stipple artwork */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-4"
          >
            <StippleArt />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4"
          >
            The ugly version ships today.
            <br />
            <span className="text-white/50">The final one on 1st May.</span>
          </motion.h2>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body text-[16px] text-white/45 mb-8 max-w-md"
          >
            If you&apos;re a CA firm, a finance lead, or a founder who has ever cried into a Tally screen — drop your email. I&apos;ll personally onboard the first 100.
          </motion.p>

          {/* Email waitlist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white font-body text-[16px]"
              >
                You&apos;re on the list. We&apos;ll reach out personally.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-[420px] mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading"}
                  className="w-full sm:flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-[15px] font-body text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/25 rounded-xl text-white text-[15px] font-body font-medium hover:bg-white hover:text-[#0A0A0A] transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                >
                  {status === "loading" ? "Joining..." : (
                    <>Get early access <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-2 text-[13px] text-red-400 font-body">{errorMsg}</p>
            )}
          </motion.div>
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6 sm:pt-8"
        >
          <div className="flex items-center gap-2">
            <EntityMark size={24} state="idle" theme="dark" />
            <span className="font-body font-bold text-[15px] text-white tracking-tight">
              Entity
            </span>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-white/35 font-body">
            <a href="/terms" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Terms of Service
            </a>
            <a href="/privacy" className="hover:text-white/60 transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
            <span>&copy; Entity 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

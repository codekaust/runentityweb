"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  FileText,
  Sparkles,
  BookOpen,
  Landmark,
  Receipt,
  BarChart3,
  Shield,
  AlertTriangle,
  CalendarCheck,
  Lock,
  Check,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface FloatingBadge {
  icon: LucideIcon;
  label: string;
  x: string;
  y: string;
  delay: number;
}

interface TabVisual {
  mainCard: React.ReactNode;
  badges: FloatingBadge[];
}

interface Tab {
  label: string;
  features: Feature[];
  visual: TabVisual;
}

/* ─── Floating icon badge ─── */
function IconBadge({
  icon: Icon,
  label,
  x,
  y,
  delay,
}: FloatingBadge) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="absolute flex flex-col items-center gap-1.5"
      style={{ left: x, top: y }}
    >
      <div className="w-14 h-14 bg-white rounded-xl shadow-md border border-[#E5E5E0] flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#1A1A1A]" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] text-[#6B6B6B] font-medium">{label}</span>
    </motion.div>
  );
}

/* ─── Placeholder ghost card ─── */
function GhostCard({ className }: { className: string }) {
  return (
    <div
      className={`absolute rounded-xl border border-[#E5E5E0] bg-white/40 ${className}`}
    />
  );
}

/* ─── Tab 1 visual: Bill processing flow ─── */
function RecordVisual() {
  return (
    <div className="relative w-full h-[420px]">
      {/* Ghost cards in background */}
      <GhostCard className="w-32 h-20 top-[8%] left-[2%]" />
      <GhostCard className="w-24 h-16 top-[30%] left-[0%]" />
      <GhostCard className="w-28 h-20 right-[3%] top-[12%]" />
      <GhostCard className="w-20 h-14 right-[0%] top-[55%]" />

      {/* Stacked bills behind main */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-[18%] top-[8%] w-[280px] h-[340px] bg-white rounded-xl border border-[#E5E5E0] shadow-sm rotate-[-4deg]"
      />
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-[20%] top-[6%] w-[280px] h-[340px] bg-white rounded-xl border border-[#E5E5E0] shadow-sm rotate-[-2deg]"
      />

      {/* Main invoice card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute left-[22%] top-[4%] w-[280px] bg-white rounded-xl border border-[#E5E5E0] shadow-lg p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-[#1A1A1A]/10 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-[#1A1A1A]" />
          </div>
          <span className="text-[13px] font-semibold text-[#1A1A1A]">Anthropic</span>
        </div>
        <div className="bg-[#FAFAF8] rounded-lg p-3 mb-3">
          <p className="text-[11px] text-[#999] mb-1">Invoice #INV-2026-0847</p>
          <p className="text-[22px] font-bold text-[#1A1A1A] font-mono">₹1,77,500</p>
          <div className="flex gap-3 mt-2 text-[10px] text-[#6B6B6B]">
            <span>Date: 15 Feb 2026</span>
            <span>Due: 15 Mar 2026</span>
          </div>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Raw Materials</span>
            <span className="font-mono">₹1,50,000</span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>CGST @ 9%</span>
            <span className="font-mono">₹13,500</span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>SGST @ 9%</span>
            <span className="font-mono">₹13,500</span>
          </div>
          <div className="flex justify-between text-[#6B6B6B]">
            <span>Round Off</span>
            <span className="font-mono">₹500</span>
          </div>
          <div className="border-t border-[#E5E5E0] pt-2 flex justify-between font-semibold text-[#1A1A1A]">
            <span>Total</span>
            <span className="font-mono">₹1,77,500</span>
          </div>
        </div>
      </motion.div>

      {/* AI extraction overlay — dark card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute right-[14%] top-[18%] w-[260px] bg-[#0A0A0A] rounded-xl shadow-2xl p-4 text-white"
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-[12px] font-semibold text-white">AI Extracted</span>
          <span className="ml-auto text-[10px] px-2 py-0.5 bg-white/20 text-white rounded-full font-mono">94%</span>
        </div>
        <div className="space-y-2.5 text-[11px]">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            <span className="text-white/60">Vendor:</span>
            <span className="text-white font-medium">Anthropic</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            <span className="text-white/60">Account:</span>
            <span className="text-white font-medium">Raw Materials</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            <span className="text-white/60">GST:</span>
            <span className="text-white font-medium">18% (CGST + SGST)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            <span className="text-white/60">TDS:</span>
            <span className="text-white font-medium">Not applicable</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px]">
          <span className="text-white/40">Journal entry ready</span>
          <ArrowRight className="w-3 h-3 text-white ml-auto" />
          <span className="text-white font-medium">Post</span>
        </div>
      </motion.div>

      {/* Floating badges */}
      <IconBadge icon={FileText} label="Bills" x="2%" y="62%" delay={0.5} />
      <IconBadge icon={Sparkles} label="AI Engine" x="10%" y="80%" delay={0.6} />
      <IconBadge icon={BookOpen} label="Journal" x="78%" y="72%" delay={0.7} />
      <IconBadge icon={Receipt} label="GST" x="88%" y="55%" delay={0.8} />
    </div>
  );
}

/* ─── Tab 2 visual: Reconciliation flow ─── */
function ReconcileVisual() {
  return (
    <div className="relative w-full h-[420px]">
      <GhostCard className="w-28 h-18 top-[5%] left-[1%]" />
      <GhostCard className="w-24 h-16 top-[70%] left-[3%]" />
      <GhostCard className="w-28 h-18 right-[2%] top-[8%]" />
      <GhostCard className="w-20 h-14 right-[1%] bottom-[15%]" />

      {/* Bank statement card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-[12%] top-[5%] w-[250px] bg-white rounded-xl border border-[#E5E5E0] shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Landmark className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-[12px] font-semibold text-[#1A1A1A]">Bank Statement</span>
        </div>
        <div className="text-[10px] text-[#999] mb-2 font-mono">HDFC Bank — Feb 2026</div>
        <div className="space-y-0">
          {[
            { date: "02 Feb", desc: "NEFT — Anthropic", amt: "-1,77,500", matched: true },
            { date: "05 Feb", desc: "UPI — Notion Labs", amt: "-4,200", matched: true },
            { date: "08 Feb", desc: "RTGS — Stripe Inc", amt: "+3,45,000", matched: true },
            { date: "12 Feb", desc: "NEFT — WeWork", amt: "-85,000", matched: false },
            { date: "18 Feb", desc: "CHQ — Figma Inc", amt: "-2,10,000", matched: true },
          ].map((row) => (
            <div key={row.date + row.desc} className="flex items-center py-1.5 border-b border-[#F2F2ED] last:border-0 text-[11px]">
              <span className="text-[#999] w-12 shrink-0 font-mono">{row.date}</span>
              <span className="text-[#1A1A1A] flex-1 truncate">{row.desc}</span>
              <span className={`font-mono ml-2 ${row.amt.startsWith("+") ? "text-[#1A1A1A]" : "text-[#1A1A1A]"}`}>{row.amt}</span>
              {row.matched ? (
                <Check className="w-3 h-3 text-[#1A1A1A] ml-1.5 shrink-0" strokeWidth={3} />
              ) : (
                <div className="w-3 h-3 rounded-full border-2 border-[#F59E0B] ml-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Dark GST return card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute left-[30%] top-[25%] w-[280px] bg-[#0A0A0A] rounded-xl shadow-2xl p-5 text-white z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold">GST Return — GSTR-3B</p>
            <p className="text-[11px] text-white/40">February 2026</p>
          </div>
          <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-mono rounded-full">Auto-drafted</span>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-white/50">Output GST</span>
            <span className="font-mono text-[#3B82F6]">₹4,32,180</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Input GST</span>
            <span className="font-mono text-white">₹2,89,650</span>
          </div>
          <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
            <span className="text-white/70">Net Payable</span>
            <span className="font-mono text-white">₹1,42,530</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">TDS Payable</span>
            <span className="font-mono text-white/70">₹28,500</span>
          </div>
        </div>
      </motion.div>

      {/* Reports preview card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute right-[10%] top-[20%] w-[200px] bg-white rounded-xl border border-[#E5E5E0] shadow-lg p-4"
      >
        <p className="text-[12px] font-semibold text-[#1A1A1A] mb-2">Trial Balance</p>
        <p className="text-[10px] text-[#999] mb-3">As of 28 Feb 2026</p>
        <div className="space-y-1.5 text-[10px]">
          {[
            { name: "Assets", dr: "82,45,000", cr: "" },
            { name: "Liabilities", dr: "", cr: "34,12,000" },
            { name: "Revenue", dr: "", cr: "65,34,500" },
            { name: "Expenses", dr: "17,01,500", cr: "" },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between">
              <span className="text-[#6B6B6B]">{r.name}</span>
              <span className={`font-mono ${r.dr ? "text-[#1A1A1A]" : "text-[#3B82F6]"}`}>
                {r.dr || r.cr}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-[#E5E5E0] flex items-center gap-1">
          <Check className="w-3 h-3 text-[#1A1A1A]" strokeWidth={3} />
          <span className="text-[10px] text-[#1A1A1A] font-medium">Balanced</span>
          <span className="text-[9px] text-[#999] ml-auto font-mono">42ms</span>
        </div>
      </motion.div>

      <IconBadge icon={Landmark} label="Bank" x="3%" y="60%" delay={0.5} />
      <IconBadge icon={Shield} label="GST" x="12%" y="78%" delay={0.6} />
      <IconBadge icon={BarChart3} label="Reports" x="82%" y="70%" delay={0.7} />
      <IconBadge icon={Receipt} label="TDS" x="90%" y="50%" delay={0.8} />
    </div>
  );
}

/* ─── Tab 3 visual: Review & Close flow ─── */
function ReviewVisual() {
  return (
    <div className="relative w-full h-[420px]">
      <GhostCard className="w-28 h-18 top-[5%] left-[2%]" />
      <GhostCard className="w-24 h-14 bottom-[10%] left-[5%]" />
      <GhostCard className="w-28 h-18 right-[2%] top-[10%]" />
      <GhostCard className="w-20 h-14 right-[3%] bottom-[18%]" />

      {/* Anomaly alert card */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute left-[12%] top-[8%] w-[240px] bg-white rounded-xl border border-[#E5E5E0] shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-[12px] font-semibold text-[#1A1A1A]">Anomalies Flagged</span>
          <span className="ml-auto text-[10px] px-2 py-0.5 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full font-mono">3</span>
        </div>
        <div className="space-y-2">
          {[
            { type: "Duplicate", desc: "INV-0412 matches INV-0398", severity: "high" },
            { type: "Unusual Amt", desc: "₹12L from Figma (avg ₹2L)", severity: "medium" },
            { type: "Missing", desc: "No TDS on Stripe payment", severity: "low" },
          ].map((a) => (
            <div key={a.desc} className="flex items-start gap-2 text-[11px]">
              <div
                className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  a.severity === "high"
                    ? "bg-[#EF4444]"
                    : a.severity === "medium"
                    ? "bg-[#F59E0B]"
                    : "bg-[#3B82F6]"
                }`}
              />
              <div>
                <span className="font-medium text-[#1A1A1A]">{a.type}</span>
                <span className="text-[#6B6B6B]"> — {a.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Auto provisions — dark card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute left-[28%] top-[32%] w-[300px] bg-[#0A0A0A] rounded-xl shadow-2xl p-5 text-white z-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-semibold">Month-End Close</p>
            <p className="text-[11px] text-white/40">February 2026</p>
          </div>
          <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-mono rounded-full">6 of 8 done</span>
        </div>
        <div className="space-y-2 text-[11px]">
          {[
            { task: "Depreciation posted", done: true },
            { task: "Prepaid expenses amortized", done: true },
            { task: "Provisions for doubtful debts", done: true },
            { task: "Interest accruals", done: true },
            { task: "GST reconciliation", done: true },
            { task: "TDS returns drafted", done: true },
            { task: "P&L review", done: false },
            { task: "Final sign-off", done: false },
          ].map((item) => (
            <div key={item.task} className="flex items-center gap-2">
              {item.done ? (
                <Check className="w-3.5 h-3.5 text-white shrink-0" strokeWidth={3} />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
              )}
              <span className={item.done ? "text-white/50 line-through" : "text-white"}>{item.task}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Approval card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute right-[6%] top-[25%] w-[180px] bg-white rounded-xl border border-[#E5E5E0] shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <CalendarCheck className="w-4 h-4 text-[#1A1A1A]" />
          <span className="text-[12px] font-semibold text-[#1A1A1A]">Auto Posted</span>
        </div>
        <div className="space-y-2 text-[10px]">
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Depreciation</span>
            <span className="font-mono text-[#1A1A1A]">₹1,25,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Prepaid Exp.</span>
            <span className="font-mono text-[#1A1A1A]">₹42,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Provisions</span>
            <span className="font-mono text-[#1A1A1A]">₹68,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Interest</span>
            <span className="font-mono text-[#1A1A1A]">₹31,200</span>
          </div>
        </div>
      </motion.div>

      <IconBadge icon={AlertTriangle} label="Alerts" x="3%" y="58%" delay={0.5} />
      <IconBadge icon={CalendarCheck} label="Provisions" x="12%" y="76%" delay={0.6} />
      <IconBadge icon={Lock} label="Close" x="85%" y="68%" delay={0.7} />
      <IconBadge icon={Check} label="Approve" x="78%" y="82%" delay={0.8} />
    </div>
  );
}

/* ─── Tab visuals map ─── */
const tabVisuals: Record<number, React.ReactNode> = {
  0: <RecordVisual />,
  1: <ReconcileVisual />,
  2: <ReviewVisual />,
};

const tabs: Tab[] = [
  {
    label: "Record & Categorize",
    features: [
      {
        title: "AI Bill Processing",
        description:
          "Drop a bill/invoice/receipt. AI extracts every line, matches the vendor, suggests the account, and creates the journal entry.",
      },
      {
        title: "Smart Categorization",
        description:
          "Every transaction lands in the right account automatically. AI learns from your corrections and gets better with every entry.",
      },
    ],
    visual: {} as TabVisual,
  },
  {
    label: "Reconcile & Match",
    features: [
      {
        title: "AI Bank Reconciliation",
        description:
          "AI matches bank statements to your books automatically. Fuzzy matching handles partial names, reference mismatches, and split transactions.",
      },
      {
        title: "GST & TDS",
        description:
          "Returns computed automatically from posted transactions. Handles multi-state GSTIN, RCM, multi-rate invoices, credit/debit notes.",
      },
      {
        title: "Custom Reports",
        description:
          "Trial Balance, P&L, Balance Sheet, Ledger, Aging and custom reports.",
      },
    ],
    visual: {} as TabVisual,
  },
  {
    label: "Review & Close",
    features: [
      {
        title: "Anomaly Detection",
        description:
          "Duplicate invoices, unusual amounts, missing entries. AI flags before they compound.",
      },
      {
        title: "Automatic Transactions",
        description:
          "Posts provisions, depreciation, and other month/year end entries automatically.",
      },
      {
        title: "Month-End Close",
        description:
          "AI does the work upfront. You review, approve, close. What took days now takes minutes.",
      },
    ],
    visual: {} as TabVisual,
  },
];

export default function FeatureTabs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-[#FAFAF8] py-20 lg:py-28 overflow-hidden" ref={sectionRef}>
      <div className="container-content px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1A1A1A] text-center leading-[1.15] tracking-[-0.02em] mb-10"
        >
          Built for the way{" "}
          <span className="text-gradient">Indian CA firms</span>{" "}
          actually work
        </motion.h2>

        {/* Pill tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center bg-white rounded-full border border-[#E5E5E0] p-1 sm:p-1.5 shadow-sm">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[14px] font-body font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#1A1A1A] text-white shadow-md"
                    : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Feature cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`features-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={`flex flex-col items-center sm:flex-row sm:items-start justify-center gap-8 sm:gap-16 mb-10 sm:mb-16 max-w-4xl mx-auto ${
              tabs[activeTab].features.length === 2 ? "md:gap-24" : ""
            }`}
          >
            {tabs[activeTab].features.map((feature) => (
              <div
                key={feature.title}
                className="text-center max-w-[260px]"
              >
                <h3 className="font-display text-[17px] font-semibold text-[#1A1A1A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B] text-[15px] leading-relaxed font-body">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Visual composition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`visual-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto hidden md:block"
          >
            {tabVisuals[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

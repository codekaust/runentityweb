"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-[60] bg-[#0A0A0A] text-white overflow-hidden"
        >
          <div className="flex items-center justify-center py-2.5 px-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-white/90 text-[13px] font-body">
                Tally + Zoho integrations from day 1 · Early access open now
              </span>
              <ArrowRight size={12} className="text-white/30" />
            </a>

            {/* Dismiss */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 p-1 text-white/30 hover:text-white/70 transition-colors"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

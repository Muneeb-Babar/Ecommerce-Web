"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dismissAnnouncement } from "@/store/slices/ui-slice";
import { easeOutQuint } from "@/components/shared/motion";

export function AnnouncementBar() {
  const dispatch = useAppDispatch();
  const dismissed = useAppSelector((s) => s.ui.announcementDismissed);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: easeOutQuint }}
          className="relative z-50 overflow-hidden bg-primary text-primary-foreground"
        >
          <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2 px-10 py-2.5 text-center text-xs font-medium sm:text-sm">
            <Sparkles className="hidden size-4 sm:block" />
            <span>
              Free express shipping on orders over $150 ·{" "}
              <span className="font-semibold underline underline-offset-2">
                15% off your first order with code NOVA15
              </span>
            </span>
          </div>
          <button
            onClick={() => dispatch(dismissAnnouncement())}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
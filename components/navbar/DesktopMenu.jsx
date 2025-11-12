"use client";

// components/navbar/DesktopMenu.jsx
// Dropdowns compactos, com indicador ativo e micro-interações.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { navItems } from "./NavItems";
import { scaleIn } from "../../lib/motion";
import { ChevronDown } from "lucide-react";

function isActive(href, pathname) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function DesktopMenu() {
  const [open, setOpen] = useState(null);
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {navItems.map((item, idx) =>
        item.type === "dropdown" ? (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <button className="group relative flex items-center gap-1 px-3 py-2 text-sm text-slate-200/90">
              <span>{item.label}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70 transition group-hover:opacity-100" />
              <span className="absolute inset-x-3 -bottom-[2px] h-[2px] origin-left scale-x-0 bg-white/40 transition group-hover:scale-x-100" />
            </button>

            <AnimatePresence>
              {open === item.label && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={scaleIn}
                  className="absolute left-0 top-full z-30 mt-2 min-w-[240px] rounded-xl border border-white/10 bg-zinc-900/90 p-2 backdrop-blur"
                >
                  {item.items.map((sub, i) => (
                    <Link
                      key={i}
                      href={sub.href}
                      className={`block rounded-md px-3 py-2 text-sm hover:bg-white/5 ${
                        isActive(sub.href, pathname) ? "text-white" : "text-slate-200/90"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={idx}
            href={item.href}
            className={`relative flex items-center px-3 py-2 text-sm ${
              isActive(item.href, pathname) ? "text-white" : "text-slate-200/90"
            }`}
          >
            <span className="flex items-center">{item.label}</span>
            <span
              className={`absolute inset-x-3 -bottom-[2px] h-[2px] origin-left bg-white/60 transition ${
                isActive(item.href, pathname) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        )
      )}
    </nav>
  );
}

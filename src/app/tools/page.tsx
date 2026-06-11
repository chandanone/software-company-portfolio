"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScanIcon, FileImageIcon, ImageIcon, ShieldCheckIcon } from "lucide-react";

const tools = [
  {
    href: "/tools/bg-remover",
    label: "AI Background Remover",
    description: "Remove backgrounds from images using in-browser AI. All processing happens locally.",
    icon: ScanIcon,
    color: "from-blue-500 to-cyan-500",
  },
  {
    href: "/tools/image-to-pdf",
    label: "Image to PDF Converter",
    description: "Combine multiple images into a single PDF. Drag to reorder, choose page size and orientation.",
    icon: FileImageIcon,
    color: "from-orange-500 to-red-500",
  },
  {
    href: "/tools/pdf-rearrange",
    label: "PDF Page Rearranger",
    description: "Upload a PDF, reorder pages or delete unwanted ones, then export a new PDF.",
    icon: ImageIcon,
    color: "from-purple-500 to-pink-500",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
} as const;

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
} as const;

const bannerItem = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } },
} as const;

export default function ToolsPage() {
  return (
    <div>
      <motion.div
        variants={bannerItem}
        initial="hidden"
        animate="show"
        className="mb-8 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
      >
        <ShieldCheckIcon className="h-5 w-5 shrink-0" />
        <span>All processing is done entirely in your browser. No files are uploaded to any server.</span>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tools.map((tool) => (
          <motion.div key={tool.href} variants={cardItem}>
            <Link
              href={tool.href}
              className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex rounded-lg bg-gradient-to-br p-3 text-white ${tool.color}`}
              >
                <tool.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {tool.label}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{tool.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

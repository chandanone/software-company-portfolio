"use client";

import { motion } from "framer-motion";
import { ArrowRight, ScanIcon, FileImageIcon, ImageIcon } from "lucide-react";
import { HeroBackground } from "@/components/ui/hero-background";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const tools = [
  {
    icon: <ScanIcon className="w-8 h-8 text-[#00aaff]" />,
    title: "AI Background Remover",
    description: "Remove backgrounds from images instantly in your browser using on-device AI. 100% private.",
    href: "/tools/bg-remover",
  },
  {
    icon: <FileImageIcon className="w-8 h-8 text-[#00aaff]" />,
    title: "Image to PDF Converter",
    description: "Combine multiple images into a single PDF document. Drag to reorder, choose size and margin.",
    href: "/tools/image-to-pdf",
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-[#00aaff]" />,
    title: "PDF Page Rearranger",
    description: "Upload any PDF, drag and drop pages to rearrange, delete pages, and export a new PDF document.",
    href: "/tools/pdf-rearrange",
  },
];



export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Pattern Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground>
          <div className="flex h-full w-full items-center justify-center pt-20">
            <div className="relative z-10 text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#00aaff] via-[#0088cc] to-[#ff9900] bg-clip-text text-transparent">
                    Charu AI Labs
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                  Transforming ideas into innovative digital solutions that drive
                  business growth
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  <Link href="/portfolio" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200"
                    >
                      View Our Work
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

        </HeroBackground>
      </section>

      {/* Utilities Tools Preview Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent">
                Utilities Tools
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fast, secure, and run 100% locally in your browser. No file uploads required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={tool.href} className="block h-full">
                  <Card hoverable className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <div className="mb-4">{tool.icon}</div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/tools">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white rounded-full font-semibold inline-flex items-center gap-2"
              >
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#00aaff] via-[#0088cc] to-[#ff9900]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's build something amazing together
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#667eea] rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

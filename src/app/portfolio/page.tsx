"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Globe } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Nabagram Ecommerce",
        category: "Web Development",
        image: "https://api.microlink.io?url=https://nabagram-ecommerce.vercel.app/&screenshot=true&embed=screenshot.url",
        description: "A modern e-commerce platform with real-time inventory and payment processing.",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
        results: "300% increase in online sales",
        github: "https://github.com/chandanone/nabagram-ecommerce",
        demo: "https://nabagram-ecommerce.vercel.app/",
    },
    {
        id: 2,
        title: "LoomGrad Technical LMS",
        category: "Web Development",
        image: "https://api.microlink.io?url=https://loomgrad.vercel.app/&screenshot=true&embed=screenshot.url",
        description: "A comprehensive Technical Learning Management System with automated imports and payment integration.",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Razorpay"],
        results: "Streamlined course delivery and student management",
        github: "https://github.com/chandanone/loomgrad",
        demo: "https://loomgrad.vercel.app/",
    },
    {
        id: 3,
        title: "EmpowerHer",
        category: "Social Good",
        image: "https://api.microlink.io?url=https://empower-her-henna.vercel.app/&screenshot=true&embed=screenshot.url",
        description: "A platform dedicated to women's empowerment, resource sharing, and community support.",
        technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
        results: "Providing essential resources to community members",
        github: "https://github.com/chandanone/empowerHer",
        demo: "https://empower-her-henna.vercel.app/",
    },
    {
        id: 4,
        title: "AI Image Generator",
        category: "AI/ML",
        image: "https://api.microlink.io?url=https://image-gen-gold-one.vercel.app/&screenshot=true&embed=screenshot.url",
        description: "Advanced AI tool that generates stunning images from text prompts using cutting-edge models.",
        technologies: ["Next.js", "OpenAI API", "Cloudinary", "Auth.js"],
        results: "Instant creative asset generation",
        github: "https://github.com/chandanone/image_gen",
        demo: "https://image-gen-gold-one.vercel.app/",
    },
    {
        id: 5,
        title: "EcoExchange",
        category: "Sustainability",
        image: "https://api.microlink.io?url=https://eco-exchange-chandan.vercel.app/&screenshot=true&embed=screenshot.url",
        description: "A sustainable marketplace for exchanging eco-friendly products and promoting green living.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        results: "Enabling sustainable trade and reducing waste",
        github: "https://github.com/chandanone/EcoExchange",
        demo: "https://eco-exchange-chandan.vercel.app/",
    },
    {
        id: 6,
        title: "TB-Sense AI",
        category: "AI/ML",
        image: "https://api.microlink.io?url=https://tb-sense.vercel.app&screenshot=true&embed=screenshot.url",
        description: "Advanced diagnostic tool for tuberculosis detection using AI/ML techniques.",
        technologies: ["React", "Python", "TensorFlow", "AWS"],
        results: "High accuracy in diagnostic predictions",
        github: "https://github.com/chandanone/TB-Sense",
        demo: "https://tb-sense.vercel.app",
    },
];

const categories = ["All", "Web Development", "AI/ML", "Social Good", "Sustainability"];

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#00aaff] via-[#0088cc] to-[#ff9900]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Our Portfolio
                        </h1>
                        <p className="text-xl text-white/90">
                            Showcasing our best work and successful client partnerships
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 px-4 bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                    ? "bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white shadow-lg"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid with Parallax */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layoutId={`project-${project.id}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    <div className="relative group/card h-52 bg-gray-100 overflow-hidden border-b">
                                        {/* Browser Header Mockup */}
                                        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 flex items-center px-3 gap-1 z-10">
                                            <div className="w-2 h-2 rounded-full bg-red-400" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                            <div className="ml-2 flex-1 h-3 bg-white rounded-sm text-[8px] text-gray-400 px-2 flex items-center truncate">
                                                {"demo" in project ? project.demo : "loading..."}
                                            </div>
                                        </div>

                                        <div className="mt-6 w-full h-full relative">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top transition-transform duration-700 group-hover/card:scale-105"
                                                unoptimized={project.image.includes('microlink')}
                                            />
                                        </div>

                                        {/* Quick Links Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                                            {"github" in project && (
                                                <a
                                                    href={project.github as string}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-3 bg-white rounded-full hover:bg-gray-100 transition-transform hover:scale-110 shadow-xl text-gray-900"
                                                    title="GitHub Repository"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {"demo" in project && (
                                                <a
                                                    href={project.demo as string}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-3 bg-[#00aaff] rounded-full hover:bg-[#0088cc] transition-transform hover:scale-110 shadow-xl text-white"
                                                    title="Live Website"
                                                >
                                                    <Globe className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-xs font-bold text-[#00aaff] uppercase tracking-wider">
                                                {project.category}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#00aaff] transition-colors">{project.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {project.description}
                                        </p>

                                        <div className="flex gap-4 pt-2 border-t">
                                            {"github" in project && (
                                                <a
                                                    href={project.github as string}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#00aaff] transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    Code
                                                </a>
                                            )}
                                            {"demo" in project && (
                                                <a
                                                    href={project.demo as string}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-semibold text-[#00aaff] hover:text-[#0088cc] transition-colors"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>


        </div>
    );
}

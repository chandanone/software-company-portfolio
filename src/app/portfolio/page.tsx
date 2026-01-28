"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web Development",
        image: "🛒",
        description: "A modern e-commerce platform with real-time inventory and payment processing.",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
        results: "300% increase in online sales",
    },
    {
        id: 2,
        title: "Healthcare App",
        category: "Mobile Development",
        image: "🏥",
        description: "Patient management system with telemedicine capabilities.",
        technologies: ["React Native", "Firebase", "WebRTC"],
        results: "50,000+ active users",
    },
    {
        id: 3,
        title: "AI Analytics Dashboard",
        category: "AI/ML",
        image: "📊",
        description: "Business intelligence platform with predictive analytics.",
        technologies: ["React", "Python", "TensorFlow", "AWS"],
        results: "40% improvement in decision-making speed",
    },
    {
        id: 4,
        title: "FinTech Solution",
        category: "Web Development",
        image: "💰",
        description: "Secure financial management platform with automated reporting.",
        technologies: ["Next.js", "Node.js", "MongoDB", "Plaid"],
        results: "$10M+ transactions processed",
    },
    {
        id: 5,
        title: "Social Media App",
        category: "Mobile Development",
        image: "📱",
        description: "Community-driven social platform with real-time messaging.",
        technologies: ["Flutter", "Firebase", "GraphQL"],
        results: "100,000+ downloads",
    },
    {
        id: 6,
        title: "Cloud Infrastructure",
        category: "DevOps",
        image: "☁️",
        description: "Scalable cloud architecture with automated deployment.",
        technologies: ["AWS", "Kubernetes", "Terraform", "Docker"],
        results: "99.99% uptime achieved",
    },
];

const categories = ["All", "Web Development", "Mobile Development", "AI/ML", "DevOps"];

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
                                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedProject(project.id)}
                                >
                                    <div className="h-48 bg-gradient-to-br from-[#00aaff] to-[#0088cc] flex items-center justify-center text-6xl">
                                        {project.image}
                                    </div>
                                    <div className="p-6">
                                        <div className="text-sm text-[#00aaff] font-medium mb-2">
                                            {project.category}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={`project-${selectedProject}`}
                            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const project = projects.find((p) => p.id === selectedProject)!;
                                return (
                                    <>
                                        <div className="h-64 bg-gradient-to-br from-[#00aaff] to-[#0088cc] flex items-center justify-center text-8xl relative">
                                            {project.image}
                                            <button
                                                onClick={() => setSelectedProject(null)}
                                                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                                            >
                                                <X className="w-6 h-6 text-white" />
                                            </button>
                                        </div>
                                        <div className="p-8">
                                            <div className="text-sm text-[#00aaff] font-medium mb-2">
                                                {project.category}
                                            </div>
                                            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                                            <p className="text-gray-700 mb-6">{project.description}</p>

                                            <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-4 py-2 bg-gradient-to-r from-[#00aaff]/10 to-[#0088cc]/10 text-[#00aaff] rounded-full text-sm font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <h3 className="text-xl font-bold mb-3">Results</h3>
                                            <p className="text-gray-700 mb-6">{project.results}</p>

                                            <button className="w-full px-6 py-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                                                View Case Study
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

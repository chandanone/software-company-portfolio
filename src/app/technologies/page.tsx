"use client";

import { motion } from "framer-motion";
import { FloatingDock } from "@/components/aceternity/floating-dock";

const technologies = [
    { icon: "⚛️", label: "React" },
    { icon: "▲", label: "Next.js" },
    { icon: "📱", label: "React Native" },
    { icon: "🟢", label: "Node.js" },
    { icon: "🐍", label: "Python" },
    { icon: "☕", label: "Java" },
    { icon: "🔷", label: "TypeScript" },
    { icon: "🎨", label: "Tailwind" },
    { icon: "☁️", label: "AWS" },
    { icon: "🔵", label: "Azure" },
    { icon: "🐳", label: "Docker" },
    { icon: "☸️", label: "Kubernetes" },
    { icon: "🗄️", label: "PostgreSQL" },
    { icon: "🍃", label: "MongoDB" },
    { icon: "🔥", label: "Firebase" },
    { icon: "📊", label: "GraphQL" },
];

const categories = [
    {
        title: "Frontend",
        description: "Modern frameworks and libraries for building stunning user interfaces",
        techs: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "Framer Motion"],
    },
    {
        title: "Backend",
        description: "Robust server-side technologies for scalable applications",
        techs: ["Node.js", "Python", "Java", "Go", "Express", "Django"],
    },
    {
        title: "Mobile",
        description: "Cross-platform and native mobile development",
        techs: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
        title: "Cloud & DevOps",
        description: "Infrastructure and deployment automation",
        techs: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    },
    {
        title: "Databases",
        description: "SQL and NoSQL database solutions",
        techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Cassandra"],
    },
    {
        title: "AI/ML",
        description: "Artificial intelligence and machine learning",
        techs: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
    },
];

export default function TechnologiesPage() {
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
                            Our Tech Stack
                        </h1>
                        <p className="text-xl text-white/90">
                            Leveraging cutting-edge technologies to build exceptional solutions
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Floating Icon Cloud */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent"
                    >
                        Technologies We Love
                    </motion.h2>

                    <FloatingDock items={technologies} />
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent"
                    >
                        Technology Categories
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                            >
                                <h3 className="text-2xl font-bold mb-2 text-[#00aaff]">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-gradient-to-r from-[#00aaff]/10 to-[#0088cc]/10 text-[#00aaff] rounded-full text-sm font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

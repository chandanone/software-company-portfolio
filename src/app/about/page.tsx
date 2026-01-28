"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const timeline = [
    {
        year: "2015",
        title: "Foundation",
        description: "Tripund Technologies was founded with a vision to transform digital experiences.",
    },
    {
        year: "2017",
        title: "Expansion",
        description: "Expanded our team and services to include mobile app development and cloud solutions.",
    },
    {
        year: "2019",
        title: "Innovation",
        description: "Launched AI/ML division and delivered cutting-edge intelligent solutions.",
    },
    {
        year: "2021",
        title: "Global Reach",
        description: "Established partnerships worldwide and served clients across 20+ countries.",
    },
    {
        year: "2024",
        title: "Industry Leader",
        description: "Recognized as a leading technology partner with 500+ successful projects.",
    },
];

const values = [
    {
        title: "Innovation",
        description: "We embrace cutting-edge technologies and creative solutions.",
    },
    {
        title: "Quality",
        description: "Excellence in every line of code and every client interaction.",
    },
    {
        title: "Collaboration",
        description: "Working together with clients to achieve shared success.",
    },
    {
        title: "Integrity",
        description: "Transparent, honest, and ethical in all our dealings.",
    },
];

export default function AboutPage() {
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
                            Our Story
                        </h1>
                        <p className="text-xl text-white/90">
                            Building the future of digital innovation, one project at a time
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent"
                    >
                        Our Journey
                    </motion.h2>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00aaff] to-[#0088cc]" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                    }`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-3xl font-bold text-[#00aaff] mb-2">
                                            {item.year}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00aaff] rounded-full border-4 border-white shadow-lg" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent"
                    >
                        Our Values
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
                            >
                                <CheckCircle className="w-12 h-12 text-[#00aaff] mb-4" />
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

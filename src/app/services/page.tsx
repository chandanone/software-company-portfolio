"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code, Smartphone, Cloud, Sparkles, Database, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const services = [
    {
        icon: <Code className="w-12 h-12 text-[#00aaff]" />,
        title: "Web Development",
        shortDesc: "Custom web applications built with modern frameworks.",
        fullDesc: "We create responsive, scalable web applications using React, Next.js, Vue, and Angular. Our solutions are optimized for performance, SEO, and user experience.",
        features: ["React & Next.js", "Vue & Nuxt", "Progressive Web Apps", "E-commerce Solutions"],
    },
    {
        icon: <Smartphone className="w-12 h-12 text-[#00aaff]" />,
        title: "Mobile Apps",
        shortDesc: "Native and cross-platform mobile solutions.",
        fullDesc: "Build beautiful, performant mobile applications for iOS and Android using React Native, Flutter, and native technologies.",
        features: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)"],
    },
    {
        icon: <Cloud className="w-12 h-12 text-[#00aaff]" />,
        title: "Cloud Solutions",
        shortDesc: "Scalable cloud infrastructure and deployment.",
        fullDesc: "Design and implement cloud-native architectures on AWS, Azure, and Google Cloud. We handle everything from migration to optimization.",
        features: ["AWS & Azure", "Kubernetes", "Serverless", "CI/CD Pipelines"],
    },
    {
        icon: <Sparkles className="w-12 h-12 text-[#00aaff]" />,
        title: "AI/ML Integration",
        shortDesc: "Intelligent features powered by AI.",
        fullDesc: "Integrate cutting-edge AI and machine learning capabilities into your applications for enhanced user experiences and business insights.",
        features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Chatbots"],
    },
    {
        icon: <Database className="w-12 h-12 text-[#00aaff]" />,
        title: "Database Design",
        shortDesc: "Robust and scalable database solutions.",
        fullDesc: "Design and optimize databases for performance and reliability using SQL and NoSQL technologies.",
        features: ["PostgreSQL & MySQL", "MongoDB", "Redis", "Data Migration"],
    },
    {
        icon: <Shield className="w-12 h-12 text-[#00aaff]" />,
        title: "Security & DevOps",
        shortDesc: "Secure and automated deployment pipelines.",
        fullDesc: "Implement security best practices and automated DevOps workflows to ensure your applications are secure and deployments are seamless.",
        features: ["Security Audits", "Automated Testing", "Monitoring", "Infrastructure as Code"],
    },
];

export default function ServicesPage() {
    const [selectedService, setSelectedService] = useState<number | null>(null);

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
                            Our Services
                        </h1>
                        <p className="text-xl text-white/90">
                            Comprehensive digital solutions tailored to your business needs
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card
                                    hoverable
                                    className="cursor-pointer h-full"
                                    onClick={() => setSelectedService(index)}
                                >
                                    <CardHeader>
                                        <div className="mb-4">{service.icon}</div>
                                        <CardTitle>{service.title}</CardTitle>
                                        <CardDescription>{service.shortDesc}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedService !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    {services[selectedService].icon}
                                    <h2 className="text-3xl font-bold">
                                        {services[selectedService].title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setSelectedService(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <p className="text-lg text-gray-700 mb-6">
                                {services[selectedService].fullDesc}
                            </p>

                            <h3 className="text-xl font-bold mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {services[selectedService].features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#00aaff] rounded-full" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setSelectedService(null)}
                                className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

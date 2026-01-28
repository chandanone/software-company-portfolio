"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const jobs = [
    {
        title: "Senior Full Stack Developer",
        department: "Engineering",
        location: "Remote / San Francisco",
        type: "Full-time",
        description: "Build scalable web applications using React, Next.js, and Node.js.",
        requirements: ["5+ years experience", "React & Node.js", "Cloud platforms"],
    },
    {
        title: "Mobile Developer",
        department: "Engineering",
        location: "Remote / New York",
        type: "Full-time",
        description: "Create beautiful mobile experiences with React Native or Flutter.",
        requirements: ["3+ years experience", "React Native or Flutter", "iOS/Android"],
    },
    {
        title: "DevOps Engineer",
        department: "Infrastructure",
        location: "Remote",
        type: "Full-time",
        description: "Manage cloud infrastructure and deployment pipelines.",
        requirements: ["4+ years experience", "AWS/Azure", "Kubernetes", "CI/CD"],
    },
    {
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote / Los Angeles",
        type: "Full-time",
        description: "Design intuitive and beautiful user interfaces.",
        requirements: ["3+ years experience", "Figma", "Design systems", "User research"],
    },
    {
        title: "AI/ML Engineer",
        department: "Engineering",
        location: "Remote / Boston",
        type: "Full-time",
        description: "Develop intelligent features using machine learning.",
        requirements: ["4+ years experience", "Python", "TensorFlow/PyTorch", "NLP"],
    },
    {
        title: "Product Manager",
        department: "Product",
        location: "Remote / Seattle",
        type: "Full-time",
        description: "Drive product strategy and roadmap for our flagship products.",
        requirements: ["5+ years experience", "Technical background", "Agile/Scrum"],
    },
];

export default function CareersPage() {
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
                            Join Our Team
                        </h1>
                        <p className="text-xl text-white/90">
                            Build the future of technology with passionate innovators
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent">
                            Why Tripund?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're building a culture where innovation thrives, creativity is
                            celebrated, and every team member makes an impact.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                icon: "🚀",
                                title: "Innovation First",
                                description: "Work with cutting-edge technologies and solve challenging problems.",
                            },
                            {
                                icon: "🌍",
                                title: "Remote Friendly",
                                description: "Work from anywhere with flexible hours and great benefits.",
                            },
                            {
                                icon: "📈",
                                title: "Growth Focused",
                                description: "Continuous learning opportunities and career development.",
                            },
                        ].map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent"
                    >
                        Open Positions
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.05 }}
                            >
                                <Card
                                    variant="glow"
                                    hoverable
                                    className="h-full group cursor-pointer"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-2">
                                            <CardTitle className="group-hover:text-[#00aaff] transition-colors">
                                                {job.title}
                                            </CardTitle>
                                            <ArrowRight className="w-5 h-5 text-[#00aaff] group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <CardDescription>{job.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                {job.department}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {job.type}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {job.requirements.map((req) => (
                                                <span
                                                    key={req}
                                                    className="px-3 py-1 bg-gradient-to-r from-[#00aaff]/10 to-[#0088cc]/10 text-[#00aaff] rounded-full text-xs font-medium"
                                                >
                                                    {req}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

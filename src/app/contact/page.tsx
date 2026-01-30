"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                            Get In Touch
                        </h1>
                        <p className="text-xl text-white/90">
                            Let's discuss how we can help bring your ideas to life
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Have a project in mind? We'd love to hear from you. Send us a
                                message and we'll respond as soon as possible.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] rounded-lg">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Email</h3>
                                        <p className="text-gray-600">info@tripund.com</p>
                                        <p className="text-gray-600">support@tripund.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] rounded-lg">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Phone</h3>
                                        <p className="text-gray-600">+91 8892929292</p>
                                        <p className="text-gray-600">Mon-Fri 9am-6pm PST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] rounded-lg">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Office</h3>
                                        <p className="text-gray-600">Tripund Technologies Pvt. Ltd.</p>
                                        <p className="text-gray-600">NEAR RNTI COLLEGE HATIA</p>
                                        <p className="text-gray-600"> RANCHI Jharkhand 834003</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form with Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <form
                                onSubmit={handleSubmit}
                                className="glass p-8 rounded-2xl shadow-xl"
                            >
                                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                                {/* Name Field */}
                                <div className="mb-6 relative">
                                    <motion.label
                                        htmlFor="name"
                                        animate={{
                                            top: focusedField === "name" || formData.name ? "-0.75rem" : "1rem",
                                            fontSize: focusedField === "name" || formData.name ? "0.875rem" : "1rem",
                                            color: focusedField === "name" ? "#00aaff" : "#6b7280",
                                        }}
                                        className="absolute left-4 bg-white px-2 pointer-events-none transition-all"
                                    >
                                        Name
                                    </motion.label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00aaff] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="mb-6 relative">
                                    <motion.label
                                        htmlFor="email"
                                        animate={{
                                            top: focusedField === "email" || formData.email ? "-0.75rem" : "1rem",
                                            fontSize: focusedField === "email" || formData.email ? "0.875rem" : "1rem",
                                            color: focusedField === "email" ? "#00aaff" : "#6b7280",
                                        }}
                                        className="absolute left-4 bg-white px-2 pointer-events-none transition-all"
                                    >
                                        Email
                                    </motion.label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00aaff] focus:outline-none transition-colors"
                                        required
                                    />
                                </div>

                                {/* Company Field */}
                                <div className="mb-6 relative">
                                    <motion.label
                                        htmlFor="company"
                                        animate={{
                                            top: focusedField === "company" || formData.company ? "-0.75rem" : "1rem",
                                            fontSize: focusedField === "company" || formData.company ? "0.875rem" : "1rem",
                                            color: focusedField === "company" ? "#00aaff" : "#6b7280",
                                        }}
                                        className="absolute left-4 bg-white px-2 pointer-events-none transition-all"
                                    >
                                        Company
                                    </motion.label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("company")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00aaff] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Message Field */}
                                <div className="mb-6 relative">
                                    <motion.label
                                        htmlFor="message"
                                        animate={{
                                            top: focusedField === "message" || formData.message ? "-0.75rem" : "1rem",
                                            fontSize: focusedField === "message" || formData.message ? "0.875rem" : "1rem",
                                            color: focusedField === "message" ? "#00aaff" : "#6b7280",
                                        }}
                                        className="absolute left-4 bg-white px-2 pointer-events-none transition-all"
                                    >
                                        Message
                                    </motion.label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        rows={5}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00aaff] focus:outline-none transition-colors resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[400px] w-full relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2376.32598411206!2d85.3158799973338!3d23.28688179445822!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f51fb7aaaaaaab%3A0x3815776f67179bec!2sRavindra%20Nath%20Tagore%20Inter%20College!5e0!3m2!1sen!2sus!4v1769769818504!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                />
                {/* Overlay to match theme slightly */}
                <div className="absolute inset-0 bg-[#00aaff] mix-blend-overlay opacity-10 pointer-events-none" />
            </section>
        </div>
    );
}

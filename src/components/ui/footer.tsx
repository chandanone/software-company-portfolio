"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Heart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
    company: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Contact", href: "/contact" },
    ],
    services: [
        { name: "Web Development", href: "/services#web" },
        { name: "Mobile Apps", href: "/services#mobile" },
        { name: "Cloud Solutions", href: "/services#cloud" },
        { name: "AI/ML", href: "/services#ai" },
    ],
};

const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:info@charuailabs.com", label: "Email" },
];

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Top Section Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* 1. Brand / Logo */}
                    <div className="col-span-1">
                        <Link href="/" className="inline-block mb-1">
                            <Image
                                src="/logo-1.png"
                                alt="Charu AI Labs"
                                width={100}
                                height={100}
                                className="brightness-125 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:opacity-80 transition-opacity"
                            />
                        </Link>
                        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed">
                            Transforming ideas into <br />innovative digital solutions.
                        </p>
                    </div>

                    {/* 2. Contact Details */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">
                            Contact
                        </h4>
                        <div className="space-y-3 text-[10px] sm:text-sm text-gray-400">
                            <div className="flex items-start space-x-2">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00aaff] shrink-0 mt-0.5" />
                                <span className="leading-tight">Charu AI Labs, Ranchi<br />
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00aaff] shrink-0" />
                                <span>+91 9508205680</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00aaff] shrink-0" />
                                <span className="break-all">chadan868@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Company Column */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">
                            Company
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#00aaff] transition-colors text-xs sm:text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Services Column */}
                    <div className="col-span-1">
                        <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">
                            Services
                        </h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#00aaff] transition-colors text-xs sm:text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-800/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
                            <p className="text-[10px] sm:text-xs text-gray-500">
                                © {new Date().getFullYear()} charuailabs Technologies Private Limited. All rights reserved.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                Crafted with
                                <div className="relative flex items-center justify-center w-4 h-4">
                                    <Heart className="w-4 h-4 text-red-500 hover:scale-110 transition-transform" />
                                    <motion.div
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            times: [0, 0.5, 1],
                                            repeatDelay: 1
                                        }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                    </motion.div>
                                </div>
                                by <span className="text-white font-black tracking-tight hover:text-[#00aaff] transition-colors cursor-pointer">CharuAILabs</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-3 order-1 md:order-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 sm:p-2.5 rounded-full bg-gray-800/40 border border-gray-700 hover:border-[#00aaff] hover:text-[#00aaff] transition-all duration-300"
                                >
                                    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
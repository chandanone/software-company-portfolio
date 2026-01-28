"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

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
    technologies: [
        { name: "React & Next.js", href: "/technologies#react" },
        { name: "Node.js", href: "/technologies#node" },
        { name: "Python", href: "/technologies#python" },
        { name: "DevOps", href: "/technologies#devops" },
    ],
};

const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:info@tripund.com", label: "Email" },
];

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00aaff] to-[#0088cc] bg-clip-text text-transparent">
                                Tripund Technologies
                            </h3>
                        </Link>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Transforming ideas into innovative digital solutions. We build
                            cutting-edge web and mobile applications that drive business
                            growth.
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4" />
                                <span>MAGNET MALL, C-101, Eastern Business District, Bhandup West, Mumbai</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>info@tripund.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Google Map */}
                    <div className="h-[250px] w-full rounded-lg overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Tripund%20Solutions%20Pvt%20Ltd%20-%20Software%20&amp;%20Application%20Development%20Company%20MAGNET%20MALL,%20C-101,%20Eastern%20Business%20District,%20Neptune,%20Lal%20Bahadur%20Shastri%20Marg,%20Bhandup%20West,%20Mumbai,%20Maharashtra%20400078&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                        />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Tripund Technologies. All rights
                            reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 rounded-lg bg-gray-800 hover:bg-gradient-to-r hover:from-[#00aaff] hover:to-[#0088cc] transition-all duration-300 hover:scale-110"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

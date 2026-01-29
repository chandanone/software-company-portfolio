"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingIconProps {
    icon: React.ReactNode;
    delay?: number;
    className?: string;
}

export function FloatingIcon({ icon, delay = 0, className }: FloatingIconProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: [0, -20, 0],
                x: [0, 10, -10, 0],
                rotate: [0, 360],
            }}
            transition={{
                duration: 3,
                delay,
                //repeat: Infinity,
                //repeatType: "loop",
                //ease: "easeInOut",
            }}
            className={cn(
                "p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg",
                className
            )}
        >
            {icon}
        </motion.div>
    );
}

interface FloatingDockProps {
    items: {
        icon: React.ReactNode;
        label: string;
    }[];
    className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
    return (
        <div
            className={cn(
                "flex flex-wrap justify-center items-center gap-8 p-8",
                className
            )}
        >
            {items.map((item, index) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                    <FloatingIcon icon={item.icon} delay={index * 0.2} />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
            ))}
        </div>
    );
}

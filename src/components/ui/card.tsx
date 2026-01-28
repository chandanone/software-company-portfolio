"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "glass" | "glow";
    hoverable?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className,
    variant = "default",
    hoverable = true,
    onClick,
}: CardProps) {
    const baseStyles = "rounded-xl p-6 transition-all duration-300";

    const variantStyles = {
        default: "bg-white shadow-lg hover:shadow-xl",
        glass: "glass",
        glow: "bg-white shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]",
    };

    return (
        <motion.div
            whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
            className={cn(baseStyles, variantStyles[variant], className)}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn("text-xl font-bold text-gray-900", className)}>
            {children}
        </h3>
    );
}

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <p className={cn("text-sm text-gray-600 mt-2", className)}>{children}</p>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn("", className)}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return <div className={cn("mt-4 pt-4 border-t", className)}>{children}</div>;
}

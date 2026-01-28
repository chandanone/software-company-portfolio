"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VortexProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    particleCount?: number;
    rangeY?: number;
    baseHue?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    backgroundColor?: string;
}

export function Vortex({
    children,
    className,
    containerClassName,
    particleCount = 100,
    rangeY = 400,
    baseHue = 240,
    baseSpeed = 0.5,
    rangeSpeed = 1.5,
    baseRadius = 1,
    rangeRadius = 2,
    backgroundColor = "transparent",
}: VortexProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Particle class
        class Particle {
            x: number;
            y: number;
            radius: number;
            speed: number;
            angle: number;
            hue: number;
            canvas: HTMLCanvasElement;

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * rangeY;
                this.radius = baseRadius + Math.random() * rangeRadius;
                this.speed = baseSpeed + Math.random() * rangeSpeed;
                this.angle = Math.random() * Math.PI * 2;
                this.hue = baseHue + Math.random() * 60;
            }

            update() {
                this.angle += 0.01;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // Wrap around screen
                if (this.x < 0) this.x = this.canvas.width;
                if (this.x > this.canvas.width) this.x = 0;
                if (this.y < 0) this.y = rangeY;
                if (this.y > rangeY) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, 0.6)`;
                ctx.fill();
            }
        }

        // Create particles
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas));
        }

        // Animation loop
        const animate = () => {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [
        particleCount,
        rangeY,
        baseHue,
        baseSpeed,
        rangeSpeed,
        baseRadius,
        rangeRadius,
        backgroundColor,
    ]);

    return (
        <div className={cn("relative w-full h-full", containerClassName)}>
            <canvas
                ref={canvasRef}
                className={cn("absolute inset-0 z-0", className)}
            />
            <div className="relative z-10 h-full w-full overflow-hidden">{children}</div>
        </div>
    );
}

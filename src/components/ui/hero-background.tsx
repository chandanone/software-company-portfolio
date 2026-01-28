"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function GridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = "0",
    squares,
    className,
    ...props
}: {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string;
    squares?: [x: number, y: number][];
    className?: string;
} & React.SVGProps<SVGSVGElement>) {
    const id = React.useId();

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width - 1}
                            height={height - 1}
                            x={x * width + 1}
                            y={y * height + 1}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}

export function DotPattern({
    width = 16,
    height = 16,
    x = 0,
    y = 0,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    ...props
}: {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    cx?: number;
    cy?: number;
    cr?: number;
    className?: string;
} & React.SVGProps<SVGSVGElement>) {
    const id = React.useId();

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/20",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
    );
}

export function HeroBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-full bg-white overflow-hidden">
            {/* Grid Pattern */}
            <GridPattern
                className="absolute inset-0 h-full w-full fill-gray-100 dark:fill-gray-900/20 stroke-gray-200 mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)"
                width={50}
                height={50}
                squares={[
                    [4, 4],
                    [5, 1],
                    [8, 2],
                    [6, 6],
                    [10, 5],
                    [2, 8],
                ]}
            />

            {/* Gradient Overlay for Text Contrast */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-white/50" />
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-white/80 opacity-80" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}

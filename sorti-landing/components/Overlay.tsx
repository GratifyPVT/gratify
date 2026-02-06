"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import PostScroll from "@/components/PostScroll";
import { useRef } from "react";
import { clsx } from "clsx";

// A Section is a sticky window into the content
const Section = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={clsx("h-screen w-full flex flex-col justify-center p-10 snap-start", className)}>
            {children}
        </div>
    );
};

export default function Overlay() {
    // Total height of the 3D scroll experience
    // 500vh means we scroll 5 screens worth of length.
    // We map 0-1 scroll progress to the animation.

    // Using framer motion to trigger animations as we scroll into view

    return (
        <div className="relative w-full">
            {/* 3D SCROLL AREA - Ghost spacer to create scroll length */}
            {/* We place content at absolute positions or use sticky behavior */}

            <div className="h-[400vh] w-full relative">
                {/* We can use sticky positioning for the texts.
                    Or just absolute positioning based on % top.
                */}

                {/* BEAT A: Starts at 0 */}
                <div className="absolute top-0 left-0 w-full h-screen flex items-start justify-center p-10 flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.5 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mix-blend-difference">Sorti.</h1>
                        <p className="mt-4 text-lg md:text-xl font-light text-gray-300 max-w-xs md:max-w-md">
                            The AI-enabled smart dustbin by <span className="text-emerald-400 font-semibold">Gratify Ventures</span>.
                            <br /><span className="text-sm text-gray-500 mt-2 block">Sustainability + Smart Advertising</span>
                        </p>
                    </motion.div>
                </div>

                {/* BEAT B: ~25% down (100vh) */}
                <div className="absolute top-[100vh] left-0 w-full h-screen flex items-end justify-end p-10 flex-col text-right">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.5 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                            AUTOMATIC<br />SEGREGATION
                        </h2>
                        <p className="text-base md:text-lg text-gray-400 max-w-xs md:max-w-lg ml-auto">
                            Intelligently separates wet and dry waste, ensuring cleaner cities and efficient recycling.
                        </p>
                    </motion.div>
                </div>

                {/* BEAT C: ~50% down (200vh) */}
                <div className="absolute top-[200vh] left-0 w-full h-screen flex items-center justify-center p-10 flex-col text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.5 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            55" DIGITAL <span className="text-emerald-400">CANVAS</span>.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-xs md:max-w-2xl mx-auto">
                            High-visibility advertising space playing 360+ times a day per brand.
                        </p>
                    </motion.div>
                </div>

                {/* BEAT D: ~75% down (300vh) */}
                <div className="absolute top-[300vh] left-0 w-full h-screen flex items-center justify-start p-10 flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ amount: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            GRATIFY <br />VENTURES.
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-gray-400">
                            Innovating waste management & digital advertising for the future.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Post Scroll Content - Flows naturally after the spacer */}
            <div className="relative z-10 bg-[#050505]">
                <PostScroll />
            </div>
        </div>
    );
}

"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import PostScroll from "@/components/PostScroll";

function BeatCopy({
    progress,
    start,
    end,
    className,
    children,
}: {
    progress: MotionValue<number>;
    start: number;
    end: number;
    className: string;
    children: ReactNode;
}) {
    const fadeIn = Math.max(0, start);
    const visible = start + 0.04;
    const fadeOut = end - 0.04;
    const opacity = useTransform(
        progress,
        [fadeIn, visible, fadeOut, end],
        start === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
    );

    return (
        <motion.div style={{ opacity }} className={`absolute inset-0 flex ${className}`}>
            {children}
        </motion.div>
    );
}

const pad =
    "px-5 sm:px-8 md:p-10 pt-[max(4.25rem,calc(env(safe-area-inset-top)+2.75rem))] pb-[max(1.5rem,env(safe-area-inset-bottom))]";

const copyPanel =
    "relative z-10 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 bg-black/10 backdrop-blur-[1px]";

export default function Overlay({
    sequenceRef,
}: {
    sequenceRef: RefObject<HTMLDivElement | null>;
}) {
    const { scrollYProgress } = useScroll({
        target: sequenceRef,
        offset: ["start start", "end start"],
    });

    return (
        <div className="relative w-full">
            <div ref={sequenceRef} id="sorti-sequence" className="h-[400vh] w-full relative">
                <div className="sticky top-0 h-dvh">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#000000] via-[#000000]/75 to-transparent md:hidden" />

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0}
                        end={0.25}
                        className={`flex-col items-start justify-start ${pad}`}
                    >
                        <div className={`${copyPanel} max-w-[min(100%,22rem)] md:max-w-lg`}>
                            <h1 className="text-[2.75rem] leading-[0.9] sm:text-6xl md:text-9xl font-bold tracking-tighter">
                                Sorti.
                            </h1>
                            <p className="mt-4 text-base sm:text-lg md:text-xl font-light text-gray-300 max-w-xs md:max-w-md">
                                The AI-enabled smart dustbin by <span className="text-emerald-400 font-semibold">Gratify Ventures</span>.
                                <br /><span className="text-sm text-gray-500 mt-2 block">Sustainability + Smart Advertising</span>
                            </p>
                        </div>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.22}
                        end={0.5}
                        className={`flex-col items-start justify-start md:items-end md:justify-end text-left md:text-right ${pad}`}
                    >
                        <div className={`${copyPanel} max-w-[min(100%,22rem)] md:max-w-lg`}>
                            <h2 className="text-[1.85rem] leading-[1.05] sm:text-5xl md:text-7xl font-bold tracking-tight mb-3 md:mb-4">
                                AUTOMATIC<br />SEGREGATION
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xs md:max-w-lg md:ml-auto">
                                Intelligently separates wet and dry waste, ensuring cleaner cities and efficient recycling.
                            </p>
                        </div>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.47}
                        end={0.75}
                        className={`flex-col items-center justify-start md:justify-center text-center ${pad}`}
                    >
                        <div className={`${copyPanel} w-full max-w-xl md:max-w-3xl mx-auto px-4`}>
                            <h2 className="text-[1.85rem] leading-[1.1] sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 break-words">
                                55&quot; DIGITAL <span className="text-emerald-400">CANVAS</span>.
                            </h2>
                            <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-xs md:max-w-2xl mx-auto">
                                High-visibility advertising space playing 360+ times a day per brand.
                            </p>
                        </div>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.72}
                        end={1}
                        className={`flex-col items-start justify-start md:justify-center ${pad}`}
                    >
                        <div className={`${copyPanel} max-w-[min(100%,22rem)] md:max-w-lg`}>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">
                                GRATIFY <br />VENTURES.
                            </h2>
                            <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-400 max-w-xs md:max-w-md">
                                Innovating waste management & digital advertising for the future.
                            </p>
                        </div>
                    </BeatCopy>
                </div>
            </div>

            <div className="relative z-10 bg-[#000000]">
                <PostScroll />
            </div>
        </div>
    );
}

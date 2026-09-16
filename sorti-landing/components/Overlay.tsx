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
    const visible = start + 0.045;
    const fadeOut = end - 0.045;
    const opacity = useTransform(
        progress,
        [fadeIn, visible, fadeOut, end],
        start === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
    );
    const y = useTransform(
        progress,
        [fadeIn, visible, fadeOut, end],
        start === 0 ? [0, 0, 0, -12] : [16, 0, 0, -12]
    );

    return (
        <motion.div style={{ opacity, y }} className={`absolute inset-0 flex ${className}`}>
            {children}
        </motion.div>
    );
}

function CopyBlock({
    align = "left",
    children,
}: {
    align?: "left" | "right" | "center";
    children: ReactNode;
}) {
    const widthClass =
        align === "center"
            ? "max-w-[min(100%,22rem)] md:max-w-3xl mx-auto text-center"
            : align === "right"
              ? "max-w-[min(100%,22rem)] md:max-w-lg ml-auto md:text-right"
              : "max-w-[min(100%,22rem)] md:max-w-lg";

    return (
        <div className={`relative z-10 ${widthClass}`}>
            <div
                className={`pointer-events-none absolute -inset-6 md:-inset-10 rounded-[2rem] bg-gradient-to-b from-black/75 via-black/35 to-transparent blur-2xl ${
                    align === "center" ? "inset-x-[-10%] mx-auto" : ""
                }`}
            />
            <div className="relative [text-shadow:0_2px_28px_rgba(0,0,0,0.8)]">{children}</div>
        </div>
    );
}

function BeatLabel({ children }: { children: ReactNode }) {
    return (
        <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-400/90">
            {children}
        </p>
    );
}

const pad =
    "px-5 sm:px-8 md:px-12 pt-[max(9rem,calc(env(safe-area-inset-top)+7.5rem))] md:pt-32 lg:pt-36 pb-[max(1.5rem,env(safe-area-inset-bottom))]";

export default function Overlay({
    sequenceRef,
}: {
    sequenceRef: RefObject<HTMLDivElement | null>;
}) {
    const { scrollYProgress } = useScroll({
        target: sequenceRef,
        offset: ["start start", "end start"],
    });
    const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

    return (
        <div className="relative w-full">
            <div ref={sequenceRef} id="sorti-sequence" className="h-[400vh] w-full relative">
                <div className="sticky top-0 h-dvh">
                    <div className="pointer-events-none absolute inset-0 hidden md:block">
                        <div className="absolute left-1/2 top-[62%] h-[40%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.06] blur-[110px]" />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.72)_100%)]" />
                    <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#000000] via-[#000000]/70 to-transparent md:hidden" />

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0}
                        end={0.25}
                        className={`flex-col items-start justify-start ${pad}`}
                    >
                        <CopyBlock>
                            <BeatLabel>01 — Product</BeatLabel>
                            <h1 className="font-display text-[2.75rem] leading-[0.9] font-semibold tracking-[-0.04em] sm:text-6xl md:text-8xl lg:text-9xl">
                                Sorti.
                            </h1>
                            <p className="mt-4 max-w-xs text-base font-light leading-relaxed text-gray-300 sm:text-lg md:max-w-md md:text-xl">
                                The AI-enabled smart dustbin by <span className="font-medium text-emerald-400">Gratify Ventures</span>.
                                <br />
                                <span className="mt-2 block text-sm tracking-wide text-gray-500">Sustainability + Smart Advertising</span>
                            </p>
                        </CopyBlock>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.22}
                        end={0.5}
                        className={`flex-col items-start justify-start md:items-end md:justify-end text-left md:text-right ${pad}`}
                    >
                        <CopyBlock align="right">
                            <BeatLabel>02 — Segregation</BeatLabel>
                            <h2 className="mb-3 font-display text-[1.85rem] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl md:mb-4 md:text-7xl">
                                AUTOMATIC<br />SEGREGATION
                            </h2>
                            <p className="max-w-xs text-sm leading-relaxed text-gray-400 sm:text-base md:ml-auto md:max-w-lg md:text-lg">
                                Intelligently separates wet and dry waste, ensuring cleaner cities and efficient recycling.
                            </p>
                        </CopyBlock>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.47}
                        end={0.75}
                        className={`flex-col items-center justify-start md:justify-center text-center ${pad}`}
                    >
                        <CopyBlock align="center">
                            <BeatLabel>03 — Canvas</BeatLabel>
                            <h2 className="mb-4 font-display text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.03em] break-words sm:text-5xl md:mb-6 md:text-7xl">
                                55&quot; DIGITAL <span className="text-emerald-400">CANVAS</span>.
                            </h2>
                            <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-300 sm:text-lg md:max-w-2xl md:text-xl">
                                High-visibility advertising space playing 360+ times a day per brand.
                            </p>
                        </CopyBlock>
                    </BeatCopy>

                    <BeatCopy
                        progress={scrollYProgress}
                        start={0.72}
                        end={1}
                        className={`flex-col items-start justify-start md:justify-center ${pad}`}
                    >
                        <CopyBlock>
                            <BeatLabel>04 — Brand</BeatLabel>
                            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-4xl md:text-6xl">
                                GRATIFY <br />VENTURES.
                            </h2>
                            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400 sm:text-base md:mt-4 md:max-w-md md:text-lg">
                                Innovating waste management & digital advertising for the future.
                            </p>
                        </CopyBlock>
                    </BeatCopy>

                    <motion.div
                        style={{ opacity: scrollCueOpacity }}
                        className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
                    >
                        <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-white/45">Scroll</span>
                        <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-emerald-400/80 to-transparent" />
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 bg-[#000000]">
                <PostScroll />
            </div>
        </div>
    );
}

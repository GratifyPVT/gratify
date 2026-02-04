"use client";

import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import PostScroll from "@/components/PostScroll";

const Section = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={clsx("h-screen w-full flex flex-col justify-center p-10", className)}>
            {children}
        </div>
    );
};

export default function Overlay() {
    const scroll = useScroll();
    const [opacity, setOpacity] = useState(1);

    useFrame(() => {
        // Fade out overlay as we scroll? Or just let standard scrolling handle it?
        // Using Scroll component from Drei puts content in a scrollable HTML div on top of canvas.
        // We can use standard CSS opacity transitions keying off scroll.offset if needed.
    });

    return (
        <Scroll html style={{ width: "100%" }}>
            {/* BEAT A: 0-20% */}
            <Section className="items-start">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <h1 className="text-9xl font-bold tracking-tighter mix-blend-difference">Sorti.</h1>
                    <p className="mt-4 text-xl font-light text-gray-300 max-w-md">
                        The AI-enabled smart dustbin by <span className="text-emerald-400 font-semibold">Gratify Ventures</span>.
                        <br /><span className="text-sm text-gray-500 mt-2 block">Sustainability + Smart Advertising</span>
                    </p>
                </motion.div>
            </Section>

            {/* BEAT B: 25-45% */}
            <Section className="items-end text-right">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <h2 className="text-7xl font-bold tracking-tight mb-4">
                        AUTOMATIC<br />SEGREGATION
                    </h2>
                    <p className="text-lg text-gray-400 max-w-lg ml-auto">
                        Intelligently separates wet and dry waste, ensuring cleaner cities and efficient recycling.
                    </p>
                </motion.div>
            </Section>

            {/* BEAT C: 50-70% */}
            <Section className="items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.6 }}
                >
                    <h2 className="text-7xl font-bold tracking-tight mb-6">
                        55" DIGITAL <span className="text-emerald-400">CANVAS</span>.
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        High-visibility advertising space playing 360+ times a day per brand.
                    </p>
                </motion.div>
            </Section>

            {/* BEAT D: 75-95% */}
            <Section className="items-start">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <h2 className="text-6xl font-bold tracking-tighter">
                        GRATIFY <br />VENTURES.
                    </h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Innovating waste management & digital advertising for the future.
                    </p>
                </motion.div>
            </Section>

            {/* EXTRA SPACE FOR SCROLL ENDING + POST SCROLL CONTENT */}
            <Section className="items-center justify-center p-0">
                <div className="pointer-events-auto w-full">
                    <PostScroll />
                </div>
            </Section>
        </Scroll>
    );
}

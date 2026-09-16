"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState, type RefObject } from "react";
import ImageSequence from "./ImageSequence";

export default function Scene({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return (
        <div className="fixed inset-0 z-0 h-dvh w-full bg-[#000000]">
            <Canvas
                dpr={isMobile ? 1 : [1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: isMobile ? "low-power" : "high-performance",
                    stencil: false,
                    depth: false,
                }}
            >
                <color attach="background" args={["#000000"]} />
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <ImageSequence scrollTarget={scrollTarget} />
            </Canvas>
        </div>
    );
}

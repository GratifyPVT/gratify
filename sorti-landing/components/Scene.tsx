"use client";

import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import ImageSequence from "./ImageSequence";

export default function Scene({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    return (
        <div className="fixed inset-0 z-0 h-dvh w-full bg-[#000000]">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: false,
                    alpha: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false,
                }}
            >
                <color attach="background" args={["#000000"]} />
                <ImageSequence scrollTarget={scrollTarget} />
            </Canvas>
        </div>
    );
}

"use client";

import { Canvas } from "@react-three/fiber";
import ImageSequence from "./ImageSequence";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0 h-screen w-full bg-[#050505]">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <color attach="background" args={["#050505"]} />
                <ambientLight intensity={0.5} />
                {/* Studio Lighting Setup */}
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <ImageSequence />
            </Canvas>
        </div>
    );
}

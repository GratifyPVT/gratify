"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Text, Html } from "@react-three/drei";
import * as THREE from "three";

export default function SortiModel() {
    const scroll = useScroll();
    const group = useRef<THREE.Group>(null);
    const sensorGroup = useRef<THREE.Group>(null);
    const screenGroup = useRef<THREE.Group>(null);

    // Materials
    const bodyMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#1a1a1a",
                roughness: 0.2, // Matte but slightly reflective
                metalness: 0.8,
            }),
        []
    );

    const screenMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#000000",
                roughness: 0.1,
                metalness: 0.9,
                emissive: "#ffffff",
                emissiveIntensity: 0.1,
            }),
        []
    );

    const sensorMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#00ff88",
                emissive: "#00ff88",
                emissiveIntensity: 0.5,
                toneMapped: false,
            }),
        []
    );

    useFrame((state, delta) => {
        // Scroll progress: 0 to 1
        const r1 = scroll.range(0, 0.2); // 0-20%
        const r2 = scroll.range(0.25, 0.2); // 25-45%
        const r3 = scroll.range(0.5, 0.2); // 50-70%
        const r4 = scroll.range(0.75, 0.2); // 75-95%

        if (group.current) {
            // --- BEAT A: INTRO (0-20%) ---
            // Basic rotation reset or subtle float
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, r1 * 0.2, 0.1);
        }

        if (sensorGroup.current && group.current) {
            // --- BEAT B: SENSORS (25-45%) ---
            // Rotate to show sensors and expand them out
            const sensorsVisible = r2; // 0 to 1 during this range

            // Rotate the main bin to reveal side/back
            group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, sensorsVisible * Math.PI, 0.1);

            // Explode sensors outwards
            sensorGroup.current.position.x = THREE.MathUtils.lerp(0, 1.5, sensorsVisible);
            sensorGroup.current.scale.setScalar(THREE.MathUtils.lerp(0, 1, sensorsVisible));
        }

        if (screenGroup.current) {
            // --- BEAT C: SCREEN (50-70%) ---
            const screenFocus = r3;

            // Bring screen forward
            screenGroup.current.position.z = THREE.MathUtils.lerp(0.8, 2, screenFocus);

            // Screen glow pulse
            if (Array.isArray(screenGroup.current.children)) {
                const mesh = screenGroup.current.children[0] as THREE.Mesh;
                if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
                    mesh.material.emissiveIntensity = THREE.MathUtils.lerp(0.1, 2.0, screenFocus);
                }
            }
        }

        // --- BEAT D: COMPOSITION (75-95%) ---
        // Could reassemble or show wireframe
        // For now, let's just stabilize
    });

    return (
        <group ref={group} position={[0, -1, 0]}>
            {/* Main Body Monolith */}
            <mesh material={bodyMaterial} castShadow receiveShadow>
                {/* Using box for now as placeholder, scale it to be bin-like */}
                <boxGeometry args={[1.5, 3, 1.5]} />
            </mesh>

            {/* 55-inch Screen Panel */}
            <group ref={screenGroup} position={[0, 0.5, 0.8]}>
                <mesh material={screenMaterial}>
                    <planeGeometry args={[1.2, 2]} />
                </mesh>
                {/* Bezel */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[1.3, 2.1, 0.1]} />
                    <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
                </mesh>
            </group>

            {/* Sensor Array (Initially Hidden/Internal) */}
            <group ref={sensorGroup} position={[0, 0, 0]} scale={[0, 0, 0]}>
                {/* Mock Sensors */}
                <mesh position={[0.5, 1, 0]} material={sensorMaterial}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                </mesh>
                <mesh position={[0.5, 0, 0]} material={sensorMaterial}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                </mesh>
                <mesh position={[0.5, -1, 0]} material={sensorMaterial}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                </mesh>
            </group>
        </group>
    );
}

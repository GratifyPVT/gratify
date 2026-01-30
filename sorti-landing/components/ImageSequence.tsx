"use client";

import { useScroll, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState, useRef } from "react";
import * as THREE from "three";

const FRAME_COUNT = 192;

export default function ImageSequence() {
    const scroll = useScroll();
    const { viewport } = useThree();
    const meshRef = useRef<THREE.Mesh>(null);

    // Generate URLs
    const urls = useMemo(() => {
        return Array.from({ length: FRAME_COUNT }, (_, i) =>
            `/frames/sequence_${String(i).padStart(3, '0')}.jpg`
        );
    }, []);

    // Preload textures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textures = useTexture(urls) as any as THREE.Texture[];

    // Fix aspect ratio if needed, or cover
    // The images are likely 1:1 or specific aspect. 
    // We want to cover the screen? Or contain?
    // User said "contain" fit logic to ensure bin stays "heroed".

    // Let's assume standard 16:9 or similar, but we should calculate aspect from first texture.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const firstTexture = textures[0] as any;
    const textureAspect = firstTexture && firstTexture.image ? firstTexture.image.width / firstTexture.image.height : 1;
    const viewportAspect = viewport.width / viewport.height;

    let scale: [number, number, number] = [viewport.width, viewport.height, 1];

    if (viewportAspect > textureAspect) {
        // Viewport is wider than image -> fit height, width will be smaller (contain)
        // Actually user said "contain".
        // Contain means the WHOLE image is visible.
        // So if viewport is wider, we map height to viewport height, width is derived.
        scale = [viewport.height * textureAspect, viewport.height, 1];
    } else {
        // Viewport is taller -> fit width
        scale = [viewport.width, viewport.width / textureAspect, 1];
    }

    useFrame(() => {
        // Scroll offset 0..1
        const offset = scroll.offset;

        // Map to frame index
        const frameIndex = Math.floor(offset * (FRAME_COUNT - 1));
        const clamppedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

        if (meshRef.current) {
            // Check if material map is different
            const material = meshRef.current.material as THREE.MeshBasicMaterial;
            if (material.map !== textures[clamppedIndex]) {
                material.map = textures[clamppedIndex];
                material.needsUpdate = true;
            }
        }
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={textures[0]} transparent={true} />
        </mesh>
    );
}

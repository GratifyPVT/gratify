"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useScroll, useSpring, useTransform } from "framer-motion";

const FRAME_COUNT = 192;

export default function ImageSequence() {
    // Native Framer Motion scroll hook (works in client components)
    const { scrollYProgress } = useScroll();

    // Create a smooth spring physics value
    // Damping: Higher = less oscillation. Stiffness: Higher = faster response.
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 20,
        stiffness: 100,
        restDelta: 0.001
    });

    const { viewport } = useThree();
    const meshRef = useRef<THREE.Mesh>(null);

    // Generate URLs
    const urls = useMemo(() => {
        return Array.from({ length: FRAME_COUNT }, (_, i) =>
            `/frames/sequence_${String(i).padStart(3, '0')}.jpg`
        );
    }, []);

    // Load ONLY the first texture initially to unblock Suspense
    const firstTexture = useTexture(urls[0]);

    // Store all textures in a ref to avoid re-renders
    const textureRefs = useRef<(THREE.Texture | null)[]>([]);

    // Initialize refs with the first texture
    if (textureRefs.current.length === 0) {
        textureRefs.current = new Array(FRAME_COUNT).fill(null);
        textureRefs.current[0] = firstTexture;
    }

    // Trigger for re-render if needed? Actually we don't need to re-render component
    // We just need the textures to be available in the useFrame loop.
    // However, fast scroll might hit a null texture if background loading isn't fast enough.
    // In that case, we should probably show the closest loaded frame or the first frame.

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        let cancel = false;

        const loadTextures = async () => {
            // Load the rest in chunks to not freeze the thread
            for (let i = 1; i < FRAME_COUNT; i += 5) {
                if (cancel) return;

                // Load a chunk of 5
                const chunkPromises = [];
                for (let j = 0; j < 5 && i + j < FRAME_COUNT; j++) {
                    chunkPromises.push(
                        loader.loadAsync(urls[i + j]).then(tex => {
                            tex.colorSpace = THREE.SRGBColorSpace; // Ensure correct color space
                            textureRefs.current[i + j] = tex;
                        }).catch(e => console.error(e))
                    );
                }

                await Promise.all(chunkPromises);
                // primitive yield to let main thread breathe
                await new Promise(r => setTimeout(r, 10));
            }
        };

        loadTextures();

        return () => { cancel = true; };
    }, [urls]);


    // Aspect Ratio Logic
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textureAspect = (firstTexture as any).image ? (firstTexture as any).image.width / (firstTexture as any).image.height : 1;
    const viewportAspect = viewport.width / viewport.height;
    let scale: [number, number, number] = [viewport.width, viewport.height, 1];

    if (viewportAspect > textureAspect) {
        scale = [viewport.height * textureAspect, viewport.height, 1];
    } else {
        scale = [viewport.width, viewport.width / textureAspect, 1];
    }

    useFrame(() => {
        // Get the current spring-smoothed scroll value (0 to 1)
        // Note: The page isn't infinitely long, but we want the 3D sequence 
        // to complete before the post-scroll content triggers fully?
        // Actually, our Overlay is 400vh long for the sequence.
        // And scrollYProgress 0->1 covers the WHOLE page including PostScroll.
        // We probably want the animation to finish by the time we hit the end of the spacer.
        // The spacer is 400vh. The total page might be 500vh+ with PostScroll.
        // Let's assume we map 0-0.8 of total page scroll to 0-1 of animation.
        // Or simpler: Just map 0-1 scroll to 0-1 frames.

        const rawProgress = smoothProgress.get();

        // Use a transform to complete animation faster if needed, 
        // but for now 1:1 mapping is fine if we tune the Overlay height.
        // Let's map 0 -> 0.8 progress to frame 0 -> 191
        // So the bin finishes opening *before* we scroll past it?
        // Actually, mapping 0-1 is safest for sync.

        const frameIndex = Math.floor(rawProgress * (FRAME_COUNT - 1));
        const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshBasicMaterial;

            // Texture lookup strategy (same as before)
            let tex = textureRefs.current[clampedIndex];

            if (!tex) {
                for (let i = clampedIndex - 1; i >= 0; i--) {
                    if (textureRefs.current[i]) {
                        tex = textureRefs.current[i];
                        break;
                    }
                }
            }
            if (!tex) tex = firstTexture;

            if (material.map !== tex) {
                material.map = tex;
                material.needsUpdate = true;
            }
        }
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={firstTexture} transparent={true} />
        </mesh>
    );
}

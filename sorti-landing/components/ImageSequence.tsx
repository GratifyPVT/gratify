"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useMotionValue } from "framer-motion";

const FRAME_COUNT = 192;
const MOBILE_BREAKPOINT = 768;
const LOAD_CONCURRENCY = 10;

function prepareTexture(tex: THREE.Texture) {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
}

function nearestFrame(
    frames: (THREE.Texture | null)[],
    index: number,
    fallback: THREE.Texture
) {
    if (frames[index]) return frames[index];
    for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = index - d;
        const hi = index + d;
        if (lo >= 0 && frames[lo]) return frames[lo];
        if (hi < FRAME_COUNT && frames[hi]) return frames[hi];
    }
    return fallback;
}

export default function ImageSequence({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    const sequenceProgress = useMotionValue(0);
    const displayedProgress = useRef(0);

    useEffect(() => {
        const update = () => {
            const el = scrollTarget.current ?? document.getElementById("sorti-sequence");
            const key = document.getElementById("key-features");
            if (!el) return;

            const sequenceTop = el.getBoundingClientRect().top + window.scrollY;
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;

            let endY: number;
            if (key) {
                const keyTop = key.getBoundingClientRect().top + window.scrollY;
                endY = keyTop - window.innerHeight * (mobile ? 1.06 : 1);
            } else {
                endY = sequenceTop + el.offsetHeight - window.innerHeight;
            }

            const p = (window.scrollY - sequenceTop) / Math.max(1, endY - sequenceTop);
            sequenceProgress.set(Math.max(0, Math.min(1, p)));
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [scrollTarget, sequenceProgress]);

    const { viewport } = useThree();
    const meshRef = useRef<THREE.Mesh>(null);

    const urls = useMemo(() => {
        return Array.from({ length: FRAME_COUNT }, (_, i) =>
            `/frames/sequence_${String(i).padStart(3, "0")}.jpg`
        );
    }, []);

    const firstTexture = useTexture(urls[0]);
    const textureRefs = useRef<(THREE.Texture | null)[]>([]);

    if (textureRefs.current.length === 0) {
        textureRefs.current = new Array(FRAME_COUNT).fill(null);
        textureRefs.current[0] = firstTexture;
    }

    useEffect(() => {
        prepareTexture(firstTexture);
    }, [firstTexture]);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        let cancel = false;
        let nextIndex = 1;

        const loadNext = async () => {
            while (!cancel) {
                const index = nextIndex++;
                if (index >= FRAME_COUNT) return;
                try {
                    const tex = await loader.loadAsync(urls[index]);
                    if (cancel) {
                        tex.dispose();
                        return;
                    }
                    textureRefs.current[index] = prepareTexture(tex);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        void Promise.all(Array.from({ length: LOAD_CONCURRENCY }, () => loadNext()));

        return () => {
            cancel = true;
        };
    }, [urls]);

    const imageSize = firstTexture.image as { width?: number; height?: number } | undefined;
    const textureAspect =
        imageSize?.width && imageSize?.height ? imageSize.width / imageSize.height : 16 / 9;
    const viewportAspect = viewport.width / viewport.height;
    const isPortrait = viewportAspect < 1;

    let width = viewport.width;
    let height = viewport.height;
    let x = 0;

    if (isPortrait) {
        const zoom = 1.5;
        width = viewport.width * zoom;
        height = width / textureAspect;
        x = -width * 0.05;
    } else if (viewportAspect > textureAspect) {
        height = viewport.height;
        width = height * textureAspect;
    } else {
        width = viewport.width;
        height = width / textureAspect;
    }

    // Pin the video's bottom edge to the bottom of the screen.
    const y = -(viewport.height / 2 - height / 2);
    const scale: [number, number, number] = [width, height, 1];
    const position: [number, number, number] = [x, y, 0];

    useFrame((_, delta) => {
        const target = sequenceProgress.get();
        const smoothing = 1 - Math.exp(-18 * delta);
        displayedProgress.current += (target - displayedProgress.current) * smoothing;

        const frameIndex = Math.round(displayedProgress.current * (FRAME_COUNT - 1));
        const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshBasicMaterial;
            const tex = nearestFrame(textureRefs.current, clampedIndex, firstTexture);

            if (material.map !== tex) {
                material.map = tex;
                material.needsUpdate = true;
            }
        }
    });

    return (
        <mesh ref={meshRef} scale={scale} position={position}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={firstTexture} toneMapped={false} />
        </mesh>
    );
}

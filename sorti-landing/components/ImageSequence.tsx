"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useMotionValue, useSpring } from "framer-motion";

const FRAME_COUNT = 192;
const MOBILE_BREAKPOINT = 768;
const MOBILE_MAX_TEXTURE = 1024;

function downscaleTexture(tex: THREE.Texture, maxSize: number) {
    const image = tex.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap | undefined;
    if (!image || !("width" in image) || image.width <= maxSize) return tex;

    const scale = maxSize / image.width;
    const canvas = document.createElement("canvas");
    canvas.width = maxSize;
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return tex;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    tex.image = canvas;
    tex.needsUpdate = true;
    return tex;
}

function prepareTexture(tex: THREE.Texture, maxSize?: number) {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    if (maxSize) downscaleTexture(tex, maxSize);
    return tex;
}

export default function ImageSequence({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    const sequenceProgress = useMotionValue(0);
    const smoothProgress = useSpring(sequenceProgress, {
        damping: 20,
        stiffness: 100,
        restDelta: 0.001,
    });

    useEffect(() => {
        const update = () => {
            const el = scrollTarget.current ?? document.getElementById("sorti-sequence");
            const key = document.getElementById("key-features");
            if (!el) return;

            const sequenceTop = el.getBoundingClientRect().top + window.scrollY;
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;

            // Finish the clip as Key Features enters the viewport.
            // On mobile, complete slightly before so the last frame is already held.
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
        prepareTexture(firstTexture, window.innerWidth < MOBILE_BREAKPOINT ? MOBILE_MAX_TEXTURE : undefined);
    }, [firstTexture]);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        let cancel = false;
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
        const step = isMobile ? 2 : 1;
        const maxSize = isMobile ? MOBILE_MAX_TEXTURE : undefined;

        const loadTextures = async () => {
            for (let i = 1; i < FRAME_COUNT; i += step * 4) {
                if (cancel) return;

                const chunkPromises = [];
                for (let j = 0; j < 4 && i + j * step < FRAME_COUNT; j++) {
                    const index = i + j * step;
                    chunkPromises.push(
                        loader
                            .loadAsync(urls[index])
                            .then((tex) => {
                                textureRefs.current[index] = prepareTexture(tex, maxSize);
                            })
                            .catch((e) => console.error(e))
                    );
                }

                await Promise.all(chunkPromises);
                await new Promise((r) => setTimeout(r, isMobile ? 24 : 10));
            }
        };

        loadTextures();

        return () => {
            cancel = true;
        };
    }, [urls]);

    const textureAspect = firstTexture.image
        ? firstTexture.image.width / firstTexture.image.height
        : 16 / 9;
    const viewportAspect = viewport.width / viewport.height;
    const isPortrait = viewportAspect < 1;

    let scale: [number, number, number] = [viewport.width, viewport.height, 1];
    let position: [number, number, number] = [0, 0, 0];

    if (isPortrait) {
        const zoom = 1.5;
        const width = viewport.width * zoom;
        const height = width / textureAspect;
        const maxDown = Math.max(0, viewport.height / 2 - height / 2 - viewport.height * 0.03);
        const down = Math.min(viewport.height * 0.12, maxDown);
        scale = [width, height, 1];
        position = [-width * 0.05, -down, 0];
    } else if (viewportAspect > textureAspect) {
        scale = [viewport.height * textureAspect, viewport.height, 1];
    } else {
        scale = [viewport.width, viewport.width / textureAspect, 1];
    }

    useFrame(() => {
        const rawProgress = smoothProgress.get();
        const frameIndex = Math.floor(rawProgress * (FRAME_COUNT - 1));
        const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshBasicMaterial;

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
        <mesh ref={meshRef} scale={scale} position={position}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={firstTexture} transparent={true} />
        </mesh>
    );
}

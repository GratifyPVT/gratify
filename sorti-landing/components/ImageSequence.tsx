"use client";

import { useEffect, useRef, type RefObject } from "react";

const FRAME_COUNT = 192;
const MOBILE_BREAKPOINT = 768;
const LOAD_CONCURRENCY = 12;

function nearestFrame(frames: (ImageBitmap | HTMLImageElement | null)[], index: number) {
    if (frames[index]) return frames[index];
    for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = index - d;
        const hi = index + d;
        if (lo >= 0 && frames[lo]) return frames[lo];
        if (hi < FRAME_COUNT && frames[hi]) return frames[hi];
    }
    return null;
}

async function loadBitmap(url: string) {
    const res = await fetch(url, { cache: "force-cache" });
    const blob = await res.blob();
    if (typeof createImageBitmap === "function") {
        return createImageBitmap(blob);
    }
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    await img.decode();
    return img;
}

export default function ImageSequence({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    const progressRef = useRef(0);
    const displayedRef = useRef(0);
    const lastDrawnRef = useRef(-1);

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
            progressRef.current = Math.max(0, Math.min(1, p));
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [scrollTarget]);

    useEffect(() => {
        const urls = Array.from({ length: FRAME_COUNT }, (_, i) =>
            `/frames/sequence_${String(i).padStart(3, "0")}.jpg`
        );
        let cancel = false;
        let nextIndex = 0;

        const loadNext = async () => {
            while (!cancel) {
                const index = nextIndex++;
                if (index >= FRAME_COUNT) return;
                try {
                    const bitmap = await loadBitmap(urls[index]);
                    if (cancel) {
                        if ("close" in bitmap) bitmap.close();
                        return;
                    }
                    framesRef.current[index] = bitmap;
                    if (index === 0) lastDrawnRef.current = -1;
                } catch (e) {
                    console.error(e);
                }
            }
        };

        void Promise.all(Array.from({ length: LOAD_CONCURRENCY }, () => loadNext()));

        return () => {
            cancel = true;
            framesRef.current.forEach((frame) => {
                if (frame && "close" in frame) frame.close();
            });
            framesRef.current = new Array(FRAME_COUNT).fill(null);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = Math.max(1, Math.round(w * dpr));
            canvas.height = Math.max(1, Math.round(h * dpr));
            lastDrawnRef.current = -1;
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const draw = (image: ImageBitmap | HTMLImageElement) => {
            const w = canvas.width;
            const h = canvas.height;
            const iw = "width" in image ? image.width : 1280;
            const ih = "height" in image ? image.height : 720;
            const aspect = iw / Math.max(1, ih);
            const viewAspect = w / h;
            const isPortrait = viewAspect < 1;

            let dw: number;
            let dh: number;
            let dx = 0;

            if (isPortrait) {
                dw = w * 1.5;
                dh = dw / aspect;
                dx = (w - dw) / 2 - dw * 0.05;
            } else if (viewAspect > aspect) {
                dh = h;
                dw = dh * aspect;
                dx = (w - dw) / 2;
            } else {
                dw = w;
                dh = dw / aspect;
            }

            const dy = h - dh;
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, w, h);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(image, dx, dy, dw, dh);
        };

        let raf = 0;
        const loop = () => {
            const target = progressRef.current;
            displayedRef.current += (target - displayedRef.current) * 0.28;
            if (Math.abs(target - displayedRef.current) < 0.0004) {
                displayedRef.current = target;
            }

            const frameIndex = Math.max(
                0,
                Math.min(FRAME_COUNT - 1, Math.round(displayedRef.current * (FRAME_COUNT - 1)))
            );

            if (frameIndex !== lastDrawnRef.current) {
                const frame = nearestFrame(framesRef.current, frameIndex);
                if (frame) {
                    draw(frame);
                    lastDrawnRef.current = frameIndex;
                }
            }

            raf = requestAnimationFrame(loop);
        };

        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full bg-black"
            style={{ transform: "translateZ(0)", willChange: "contents" }}
        />
    );
}

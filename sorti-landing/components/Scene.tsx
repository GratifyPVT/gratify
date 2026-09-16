"use client";

import type { RefObject } from "react";
import ImageSequence from "./ImageSequence";

export default function Scene({
    scrollTarget,
}: {
    scrollTarget: RefObject<HTMLElement | null>;
}) {
    return (
        <div className="fixed inset-0 z-0 h-[100svh] w-full bg-black">
            <ImageSequence scrollTarget={scrollTarget} />
        </div>
    );
}

"use client";

import { useRef } from "react";
import Scene from "@/components/Scene";
import Overlay from "@/components/Overlay";

export default function Home() {
  const sequenceRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full bg-[#000000] min-h-dvh text-white">
      {/* 1. Fixed 3D Background */}
      <div className="fixed inset-0 z-0 h-dvh w-full pointer-events-none">
        <Scene scrollTarget={sequenceRef} />
      </div>

      {/* 2. Scrollable Overlay */}
      <div className="relative z-10 w-full">
        <Overlay sequenceRef={sequenceRef} />
      </div>
    </main>
  );
}

"use client";

import Scene from "@/components/Scene";
import Overlay from "@/components/Overlay";

export default function Home() {
  return (
    <main className="w-full bg-[#050505] min-h-screen text-white">
      {/* 1. Fixed 3D Background */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <Scene />
      </div>

      {/* 2. Scrollable Overlay */}
      <div className="relative z-10 w-full">
        <Overlay />
      </div>
    </main>
  );
}

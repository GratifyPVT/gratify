"use client";

import { useRef } from "react";
import Scene from "@/components/Scene";
import Overlay from "@/components/Overlay";
import Nav from "@/components/Nav";

export default function Home() {
  const sequenceRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full min-h-dvh bg-[#000000] text-white">
      <Nav />

      <div className="pointer-events-none fixed inset-0 z-0 h-dvh w-full">
        <Scene scrollTarget={sequenceRef} />
      </div>

      <div className="relative z-10 w-full">
        <Overlay sequenceRef={sequenceRef} />
      </div>
    </main>
  );
}

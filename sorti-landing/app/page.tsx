"use client";

import Scene from "@/components/Scene";
import PostScroll from "@/components/PostScroll";

export default function Home() {
  return (
    <main className="w-full bg-[#050505] min-h-screen text-white overflow-hidden text-sans">
      <div className="relative h-screen w-full">
        <Scene />
      </div>

      {/* Post-Scroll Sections */}
      {/* Since Scene is fixed h-screen with ScrollControls, it handles its own scrolling. 
          PostScroll content needs to appear after the 3D scroll sequence. 
          The overlay inside the Scene handles the scroll pages. 
          To make this flow naturally, we'd typically append HTML after the canvas's ScrollControls pages.
          However, simplest way to "append" is to just put it below the fold here, 
          BUT ScrollControls in Scene.tsx will hijack scroll. 
          
          Correct R3F Pattern: Put DOM content INSIDE ScrollControls <Scroll html>. 
          
          So we update Overlay.tsx to include PostScroll content at the end.
      */}
    </main>
  );
}

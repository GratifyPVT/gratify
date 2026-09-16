"use client";

import { useEffect, useState } from "react";

export default function Nav() {
    const [solid, setSolid] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const seq = document.getElementById("sorti-sequence");
            if (!seq) {
                setSolid(window.scrollY > 80);
                return;
            }
            setSolid(window.scrollY > seq.offsetHeight - window.innerHeight * 0.55);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-500 ${
                solid ? "border-b border-white/10 bg-black/70 backdrop-blur-sm" : "border-b border-transparent bg-transparent"
            }`}
        >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-10">
                <a href="#sorti-sequence" className="font-display text-lg font-semibold tracking-[-0.04em] text-white md:text-xl">
                    Gratify
                </a>
                <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                    <a href="#plans" className="transition-colors hover:text-emerald-400">
                        Plans
                    </a>
                    <a href="#contact" className="transition-colors hover:text-emerald-400">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
}

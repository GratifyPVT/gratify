"use client";

import { Lock, BarChart3, Zap } from "lucide-react";

export default function PostScroll() {
    return (
        <div className="relative z-10 bg-[#050505] text-white py-24 px-6 md:px-20">

            {/* FEATURES GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <Lock className="w-10 h-10 text-emerald-400 mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">IoT Integration</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Seamlessly connects with city infrastructure to monitor fill levels, maintenance needs, and user engagement metrics in real-time.
                    </p>
                </div>
                <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <BarChart3 className="w-10 h-10 text-emerald-400 mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">Real-time Analytics</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Dashboard access for civic partners to track waste generation patterns and optimize collection routes dynamically.
                    </p>
                </div>
                <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <Zap className="w-10 h-10 text-emerald-400 mb-6" />
                    <h3 className="text-2xl font-semibold mb-4">Operational Efficiency</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Reduce collection costs by up to 40% through intelligent routing and predictive maintenance alerts.
                    </p>
                </div>
            </div>

            {/* TESTIMONIALS */}
            <div className="mb-32 text-center">
                <h2 className="text-sm font-light tracking-widest uppercase text-gray-500 mb-12">Trusted by Civic Partners</h2>
                <div className="max-w-4xl mx-auto">
                    <blockquote className="text-3xl md:text-5xl font-light leading-tight">
                        "Sorti has completely redefined how we perceive public sanitation infrastructure. It's not just a bin; it's a smart city node."
                    </blockquote>
                    <cite className="block mt-8 text-xl text-emerald-400 not-italic">
                        — Municipal Director, Smart City Initiative
                    </cite>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center py-20 border-t border-white/10">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
                    BRAND YOUR CITY
                </h2>
                <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full text-lg transition-all transform hover:scale-105">
                    Explore Advertising Plans
                </button>
            </div>

        </div>
    );
}

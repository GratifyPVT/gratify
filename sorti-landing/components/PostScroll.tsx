"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Phone, Instagram, Linkedin, Leaf, Monitor, Split } from "lucide-react";

function CountUp({
    value,
    suffix = "",
    prefix = "",
    label,
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [n, setN] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                const start = performance.now();
                const duration = 1000;
                const tick = (now: number) => {
                    const p = Math.min(1, (now - start) / duration);
                    const eased = 1 - Math.pow(1 - p, 3);
                    setN(Math.round(value * eased));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                io.disconnect();
            },
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-6">
            <div className="font-display text-2xl font-semibold tracking-tight text-emerald-400 md:text-4xl">
                {prefix}
                {n}
                {suffix}
            </div>
            <div className="mt-2 text-xs tracking-wide text-gray-400 md:text-sm">{label}</div>
        </div>
    );
}

function FeatureCard({
    index,
    icon,
    title,
    body,
    delay,
}: {
    index: string;
    icon: ReactNode;
    title: string;
    body: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(52,211,153,0.12)] md:p-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-400/20">
                    {icon}
                </div>
                <span className="font-display text-sm tracking-[0.2em] text-white/25">{index}</span>
            </div>
            <h3 className="mb-3 font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
            <p className="text-[15px] leading-relaxed text-gray-400 md:text-base">{body}</p>
        </motion.div>
    );
}

export default function PostScroll() {
    return (
        <div className="relative z-10 bg-[#000000] px-5 pt-20 pb-[max(4rem,calc(env(safe-area-inset-bottom)+3rem))] font-sans text-white sm:px-8 md:px-20 md:pt-28">

            <div id="key-features" className="mb-24 md:mb-36">
                <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-400">
                    Capabilities
                </p>
                <h2 className="mb-10 text-center font-display text-3xl font-semibold tracking-tight md:mb-14 md:text-5xl">
                    Key Features
                </h2>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
                    <FeatureCard
                        index="01"
                        delay={0}
                        icon={<Split className="h-5 w-5 md:h-6 md:w-6" />}
                        title="Automatic Segregation"
                        body="Smart sensors automatically separate wet and dry waste, making recycling effortless and efficient."
                    />
                    <FeatureCard
                        index="02"
                        delay={0.08}
                        icon={<Monitor className="h-5 w-5 md:h-6 md:w-6" />}
                        title="55&quot; Digital Canvas"
                        body="A massive high-definition screen delivers impactful brand messages with high public visibility."
                    />
                    <FeatureCard
                        index="03"
                        delay={0.16}
                        icon={<Leaf className="h-5 w-5 md:h-6 md:w-6" />}
                        title="Eco-Friendly Impact"
                        body="Promoting sustainability while creating a smart city infrastructure that benefits everyone."
                    />
                </div>
            </div>

            <div id="plans" className="mb-24 md:mb-36">
                <div className="mb-10 text-center md:mb-16">
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-400">
                        For brands
                    </p>
                    <h2 className="mb-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">Advertising Plans</h2>
                    <p className="text-base text-gray-400 md:text-xl">High impact visibility for your brand.</p>
                </div>

                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-8 md:items-stretch">
                    <div className="relative overflow-hidden rounded-3xl border border-emerald-400/40 bg-emerald-950/25 p-6 shadow-[0_0_50px_rgba(52,211,153,0.12)] md:scale-[1.03] md:p-10">
                        <div className="absolute top-0 right-0 rounded-bl-lg bg-emerald-400 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-black">
                            POPULAR
                        </div>
                        <h3 className="mb-2 pr-16 font-display text-xl font-semibold md:text-2xl">Starter Plan</h3>
                        <div className="mb-6 flex flex-wrap items-baseline gap-x-2">
                            <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">₹500</span>
                            <span className="text-sm text-gray-400 md:text-base">/ dustbin / month</span>
                        </div>
                        <ul className="mb-8 space-y-3 text-[15px] text-gray-300 md:space-y-4 md:text-base">
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> 12-second advertisement</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Loop throughout the day</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> ~360 plays per day</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Ultra-HD Display</li>
                        </ul>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-premium min-h-12 w-full rounded-xl border border-emerald-400 py-3 font-semibold text-emerald-400 transition-colors"
                        >
                            <span>Select Plan</span>
                        </button>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-400/30 md:p-10">
                        <h3 className="mb-2 font-display text-xl font-semibold md:text-2xl">Growth Plan</h3>
                        <div className="mb-6">
                            <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Custom</span>
                        </div>
                        <ul className="mb-8 space-y-3 text-[15px] text-gray-300 md:space-y-4 md:text-base">
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Multiple Locations</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Higher Brand Reach</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Regional Targeting</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Analytics Report</li>
                        </ul>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-premium min-h-12 w-full rounded-xl border border-white/20 py-3 font-semibold text-white transition-colors"
                        >
                            <span>Contact Sales</span>
                        </button>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-emerald-400/30 md:p-10">
                        <h3 className="mb-2 font-display text-xl font-semibold md:text-2xl">Enterprise</h3>
                        <div className="mb-6">
                            <span className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Exclusive</span>
                        </div>
                        <ul className="mb-8 space-y-3 text-[15px] text-gray-300 md:space-y-4 md:text-base">
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Custom Placements</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Full Branding Wrap</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Priority Sequencing</li>
                            <li className="flex items-start"><Check className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-emerald-400" /> Dedicated Support</li>
                        </ul>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-premium min-h-12 w-full rounded-xl border border-white/20 py-3 font-semibold text-white transition-colors"
                        >
                            <span>Partner With Us</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto mb-24 max-w-5xl text-center md:mb-36">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-400">
                    Proof
                </p>
                <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight md:mb-12 md:text-4xl">
                    Why Advertise With Us?
                </h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                    <CountUp value={360} suffix="+" label="Daily plays" />
                    <CountUp value={100} suffix="%" label="Public visibility" />
                    <CountUp value={55} suffix='"' label="Digital canvas" />
                    <CountUp value={24} suffix="/7" label="Smart infrastructure" />
                </div>
            </div>

            <div className="mx-auto mb-24 max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/40 to-black p-6 sm:p-10 md:mb-36 md:p-14">
                <div className="flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="md:mr-10">
                        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-400">
                            The company
                        </p>
                        <h2 className="mb-4 font-display text-2xl font-semibold tracking-tight md:text-4xl">About Gratify Ventures</h2>
                        <p className="max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
                            Gratify Ventures Private Limited is a smart sustainability startup focused on waste management innovation and digital advertising integration. We are building the future of cleaner, smarter cities.
                        </p>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-premium mt-8 min-h-12 rounded-xl border border-emerald-400 px-7 py-3 font-semibold text-emerald-400"
                        >
                            <span>Get in touch</span>
                        </button>
                    </div>
                    <div className="shrink-0">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/25 md:h-24 md:w-24">
                            <Leaf className="h-8 w-8 text-emerald-400 md:h-10 md:w-10" />
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact" className="border-t border-white/10 pt-16 md:pt-24">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
                    <div>
                        <h2 className="mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text font-display text-4xl font-semibold tracking-[-0.05em] text-transparent md:mb-8 md:text-6xl">
                            Let&apos;s Talk.
                        </h2>
                        <p className="mb-8 text-lg text-gray-400 md:text-xl">
                            Ready to transform your brand visibility?
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/gratify_ventures/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 p-3 transition-all hover:bg-emerald-400 hover:text-black">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="https://www.linkedin.com/company/108105189/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 p-3 transition-all hover:bg-emerald-400 hover:text-black">
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6 text-base text-gray-300 md:text-lg">
                        <div className="flex items-start">
                            <Mail className="mt-0.5 mr-4 h-6 w-6 shrink-0 text-emerald-400" />
                            <a href="mailto:support@gratifyventures.in" className="break-all hover:text-white">support@gratifyventures.in</a>
                        </div>
                        <div className="flex items-start">
                            <Phone className="mt-0.5 mr-4 h-6 w-6 shrink-0 text-emerald-400" />
                            <div className="flex flex-col">
                                <a href="tel:+919317093242" className="py-1 hover:text-white">9317093242</a>
                                <a href="tel:+919012101010" className="py-1 hover:text-white">9012101010</a>
                            </div>
                        </div>
                        <div className="pt-4 text-sm text-gray-500">
                            © {new Date().getFullYear()} Gratify Ventures Pvt Ltd. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Check, Mail, Phone, Instagram, Linkedin, Leaf, Monitor, Split } from "lucide-react";

export default function PostScroll() {
    return (
        <div className="relative z-10 bg-[#000000] text-white py-16 px-5 sm:px-8 md:py-24 md:px-20 font-sans pb-[max(4rem,calc(env(safe-area-inset-bottom)+3rem))]">

            {/* PRODUCT FEATURES */}
            <div id="key-features" className="mb-20 md:mb-32">
                <h2 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-8 md:mb-12 text-center">Key Features</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-12">
                    <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Split className="w-9 h-9 md:w-10 md:h-10 text-emerald-400 mb-5 md:mb-6" />
                        <h3 className="text-xl md:text-2xl font-semibold mb-3">Automatic Segregation</h3>
                        <p className="text-gray-400 leading-relaxed text-[15px] md:text-base">
                            Smart sensors automatically separate wet and dry waste, making recycling effortless and efficient.
                        </p>
                    </div>
                    <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Monitor className="w-9 h-9 md:w-10 md:h-10 text-emerald-400 mb-5 md:mb-6" />
                        <h3 className="text-xl md:text-2xl font-semibold mb-3">55&quot; Digital Canvas</h3>
                        <p className="text-gray-400 leading-relaxed text-[15px] md:text-base">
                            A massive high-definition screen delivers impactful brand messages with high public visibility.
                        </p>
                    </div>
                    <div className="p-6 md:p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Leaf className="w-9 h-9 md:w-10 md:h-10 text-emerald-400 mb-5 md:mb-6" />
                        <h3 className="text-xl md:text-2xl font-semibold mb-3">Eco-Friendly Impact</h3>
                        <p className="text-gray-400 leading-relaxed text-[15px] md:text-base">
                            Promoting sustainability while creating a smart city infrastructure that benefits everyone.
                        </p>
                    </div>
                </div>
            </div>

            {/* ADVERTISING PLANS */}
            <div className="mb-20 md:mb-32">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Advertising Plans</h2>
                    <p className="text-base md:text-xl text-gray-400">High impact visibility for your brand.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                    {/* Starter Plan */}
                    <div className="p-6 md:p-10 border border-emerald-500/30 rounded-3xl bg-emerald-950/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 pr-16">Starter Plan</h3>
                        <div className="flex flex-wrap items-baseline gap-x-2 mb-6">
                            <span className="text-3xl md:text-4xl font-bold">₹500</span>
                            <span className="text-sm md:text-base text-gray-400">/ dustbin / month</span>
                        </div>
                        <ul className="space-y-3 md:space-y-4 mb-8 text-[15px] md:text-base text-gray-300">
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> 12-second advertisement</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Loop throughout the day</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> ~360 plays per day</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Ultra-HD Display</li>
                        </ul>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full min-h-12 py-3 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold rounded-xl transition-all">
                            Select Plan
                        </button>
                    </div>

                    {/* Growth Plan */}
                    <div className="p-6 md:p-10 border border-white/10 rounded-3xl bg-white/5 group hover:border-emerald-500/50 transition-colors">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Growth Plan</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-3xl md:text-4xl font-bold">Custom</span>
                        </div>
                        <ul className="space-y-3 md:space-y-4 mb-8 text-[15px] md:text-base text-gray-300">
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Multiple Locations</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Higher Brand Reach</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Regional Targeting</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Analytics Report</li>
                        </ul>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full min-h-12 py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all">
                            Contact Sales
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="p-6 md:p-10 border border-white/10 rounded-3xl bg-white/5 group hover:border-emerald-500/50 transition-colors">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Enterprise</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-3xl md:text-4xl font-bold">Exclusive</span>
                        </div>
                        <ul className="space-y-3 md:space-y-4 mb-8 text-[15px] md:text-base text-gray-300">
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Custom Placements</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Full Branding Wrap</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Priority Sequencing</li>
                            <li className="flex items-start"><Check className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" /> Dedicated Support</li>
                        </ul>
                        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full min-h-12 py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </div>

            {/* WHY ADVERTISE */}
            <div className="mb-20 md:mb-32 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Why Advertise With Us?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-bold text-emerald-400 mb-2">High</div>
                        <div className="text-xs md:text-sm text-gray-400">Daily Impressions</div>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-bold text-emerald-400 mb-2">100%</div>
                        <div className="text-xs md:text-sm text-gray-400">Public Visibility</div>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-bold text-emerald-400 mb-2">Eco</div>
                        <div className="text-xs md:text-sm text-gray-400">Friendly Branding</div>
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 rounded-2xl">
                        <div className="text-2xl md:text-4xl font-bold text-emerald-400 mb-2">Smart</div>
                        <div className="text-xs md:text-sm text-gray-400">City Infrastructure</div>
                    </div>
                </div>
            </div>

            {/* ABOUT US */}
            <div className="mb-20 md:mb-32 bg-gradient-to-r from-emerald-950/30 to-black p-6 sm:p-10 md:p-12 rounded-3xl max-w-5xl mx-auto border border-white/5">
                <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="md:mr-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">About Gratify Ventures</h2>
                        <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                            Gratify Ventures Private Limited is a smart sustainability startup focused on waste management innovation and digital advertising integration. We are building the future of cleaner, smarter cities.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Leaf className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTACT FOOTER */}
            <div id="contact" className="border-t border-white/10 pt-14 md:pt-20 pb-6 md:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 md:mb-8 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
                            Let&apos;s Talk.
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-6">
                            Ready to transform your brand visibility?
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/gratify_ventures/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-3 min-w-12 min-h-12 inline-flex items-center justify-center bg-white/10 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com/company/108105189/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 min-w-12 min-h-12 inline-flex items-center justify-center bg-white/10 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6 text-base md:text-lg text-gray-300">
                        <div className="flex items-start">
                            <Mail className="w-6 h-6 text-emerald-400 mr-4 mt-0.5 shrink-0" />
                            <a href="mailto:support@gratifyventures.in" className="hover:text-white break-all">support@gratifyventures.in</a>
                        </div>
                        <div className="flex items-start">
                            <Phone className="w-6 h-6 text-emerald-400 mr-4 mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                                <a href="tel:+919317093242" className="hover:text-white py-1">9317093242</a>
                                <a href="tel:+919012101010" className="hover:text-white py-1">9012101010</a>
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

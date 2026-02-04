"use client";

import { Check, Mail, Phone, Instagram, Linkedin, Leaf, Monitor, Split, ArrowRight } from "lucide-react";

export default function PostScroll() {
    return (
        <div className="relative z-10 bg-[#050505] text-white py-24 px-6 md:px-20 font-sans">

            {/* PRODUCT FEATURES */}
            <div className="mb-32">
                <h2 className="text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-12 text-center">Key Features</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Split className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-semibold mb-3">Automatic Segregation</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Smart sensors automatically separate wet and dry waste, making recycling effortless and efficient.
                        </p>
                    </div>
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Monitor className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-semibold mb-3">55" Digital Canvas</h3>
                        <p className="text-gray-400 leading-relaxed">
                            A massive high-definition screen delivers impactful brand messages with high public visibility.
                        </p>
                    </div>
                    <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <Leaf className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-2xl font-semibold mb-3">Eco-Friendly Impact</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Promoting sustainability while creating a smart city infrastructure that benefits everyone.
                        </p>
                    </div>
                </div>
            </div>

            {/* ADVERTISING PLANS */}
            <div className="mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Advertising Plans</h2>
                    <p className="text-xl text-gray-400">High impact visibility for your brand.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    <div className="p-10 border border-emerald-500/30 rounded-3xl bg-emerald-950/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                        <h3 className="text-2xl font-bold mb-2">Starter Plan</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">₹500</span>
                            <span className="text-gray-400 ml-2">/ dustbin / month</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> 12-second advertisement</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Loop throughout the day</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> ~360 plays per day</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Ultra-HD Display</li>
                        </ul>
                        <button className="w-full py-3 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black font-semibold rounded-xl transition-all">
                            Select Plan
                        </button>
                    </div>

                    {/* Growth Plan */}
                    <div className="p-10 border border-white/10 rounded-3xl bg-white/5 group hover:border-emerald-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 text-white">Growth Plan</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Multiple Locations</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Higher Brand Reach</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Regional Targeting</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Analytics Report</li>
                        </ul>
                        <button className="w-full py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all">
                            Contact Sales
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="p-10 border border-white/10 rounded-3xl bg-white/5 group hover:border-emerald-500/50 transition-colors">
                        <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">Exclusive</span>
                        </div>
                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Custom Placements</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Full Branding Wrap</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Priority Sequencing</li>
                            <li className="flex items-center"><Check className="w-5 h-5 text-emerald-400 mr-3" /> Dedicated Support</li>
                        </ul>
                        <button className="w-full py-3 border border-white/20 hover:border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </div>

            {/* WHY ADVERTISE */}
            <div className="mb-32 max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12">Why Advertise With Us?</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">High</div>
                        <div className="text-sm text-gray-400">Daily Impressions</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
                        <div className="text-sm text-gray-400">Public Visibility</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">Eco</div>
                        <div className="text-sm text-gray-400">Friendly Branding</div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">Smart</div>
                        <div className="text-sm text-gray-400">City Infrastructure</div>
                    </div>
                </div>
            </div>

            {/* ABOUT US */}
            <div className="mb-32 bg-gradient-to-r from-emerald-950/30 to-black p-12 rounded-3xl max-w-5xl mx-auto border border-white/5">
                <div className="md:flex items-center justify-between">
                    <div className="mb-8 md:mb-0 md:mr-10">
                        <h2 className="text-3xl font-bold mb-4">About Gratify Ventures</h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Gratify Ventures Private Limited is a smart sustainability startup focused on waste management innovation and digital advertising integration. We are building the future of cleaner, smarter cities.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Leaf className="w-10 h-10 text-emerald-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTACT FOOTER */}
            <div className="border-t border-white/10 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-5xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
                            Let's Talk.
                        </h2>
                        <p className="text-xl text-gray-400 mb-6">
                            Ready to transform your brand visibility?
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/gratify_ventures/" target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com/company/108105189/" target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6 text-lg text-gray-300">
                        <div className="flex items-center">
                            <Mail className="w-6 h-6 text-emerald-400 mr-4" />
                            <a href="mailto:support@gratifyventures.in" className="hover:text-white">support@gratifyventures.in</a>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-6 h-6 text-emerald-400 mr-4" />
                            <div className="flex flex-col">
                                <span>9317093242</span>
                                <span>9012101010</span>
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

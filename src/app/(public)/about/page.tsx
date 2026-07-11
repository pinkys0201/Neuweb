'use client';

import { aboutData } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10"></div>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 border border-purple-200 rounded-full text-purple-600 text-sm font-semibold tracking-wider mb-6 bg-white/50 backdrop-blur-md shadow-sm">
                        OUR STORY
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x">NeuApex</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        {aboutData.subtitle || 'We are a collective of dreamers, builders, and strategists defining the digital future.'}
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-24 bg-white/80 backdrop-blur-sm relative rounded-[3rem] mx-4 md:mx-10 shadow-sm border border-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200 via-purple-200 to-cyan-200 rounded-[2.5rem] -z-10 transform rotate-1 group-hover:rotate-2 transition-transform duration-700 blur-sm opacity-70"></div>
                            {aboutData.image ? (
                                <img src={aboutData.image} alt="About" className="rounded-3xl shadow-2xl w-full object-cover h-[500px] transform group-hover:scale-[1.01] transition-transform duration-500" />
                            ) : (
                                <div className="h-[500px] w-full bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">About Image</div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                                {aboutData.title || 'Innovation meets Execution.'}
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
                                {aboutData.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
                                ) : (
                                    <>
                                        <p>Founded with a vision to transform how businesses interact with the digital world, NeuApex has grown into a global agency known for excellence.</p>
                                        <p>We believe in the power of design to trigger emotion and technology to drive action.</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {aboutData.stats && aboutData.stats.length > 0 ? aboutData.stats.map((stat: any, i: number) => (
                            <div key={i} className="p-6 bg-white/50 rounded-3xl border border-white shadow-sm hover:shadow-lg transition-all duration-300">
                                <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
                            </div>
                        )) : (
                            <div className="text-center w-full">Loading Stats...</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

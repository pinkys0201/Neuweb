'use client';

import { motion } from 'framer-motion';
import { FaCode, FaBullhorn, FaCloud, FaEnvelope, FaLinkedin } from 'react-icons/fa';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    accentClass: string;
}

const team: TeamMember[] = [
    {
        name: 'Alex Mercer',
        role: 'CEO &amp; Strategy Director',
        bio: 'Bridging technical product vision with target audience growth campaigns. Previously scaled two SaaS models to exits.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        accentClass: 'border-marketing-purple/40 hover:border-marketing-purple hover:shadow-marketing-purple/10'
    },
    {
        name: 'Siddharth Nair',
        role: 'Head of Engineering',
        bio: 'React/Next.js Core contributor and performance architect. Obsessed with sub-100ms LCP scores and clean code.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        accentClass: 'border-webdev-cyan/40 hover:border-webdev-cyan hover:shadow-webdev-cyan/10'
    },
    {
        name: 'Elena Rostova',
        role: 'VP of Infrastructure',
        bio: 'DevOps and cloud engineer specializing in Kubernetes orchestration, AWS security group audits, and auto-failovers.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        accentClass: 'border-devops-blue/40 hover:border-devops-blue hover:shadow-devops-blue/10'
    },
    {
        name: 'Marcus Vance',
        role: 'Director of Growth',
        bio: 'SEO programmatic indexing architect and funnel optimizer. Turned $2M/yr ad spend into $12M/yr client revenue loops.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        accentClass: 'border-marketing-pink/40 hover:border-marketing-pink hover:shadow-marketing-pink/10'
    }
];

export default function AboutPage() {
    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative overflow-hidden">
            {/* Background ambient light */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-marketing-purple/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-webdev-cyan/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* HERO */}
                <div className="text-center mb-24 max-w-3xl mx-auto space-y-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40 mb-2">
                        OUR PHILOSOPHY
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
                        Unifying Code, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple">Cloud, and Growth.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                        NeuApex was founded to close the gap between engineering execution and user acquisition. We operate as a single unified team.
                    </p>
                </div>

                {/* OUR STORY */}
                <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-webdev-cyan via-devops-blue to-marketing-purple rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                            alt="NeuApex team collaborating" 
                            className="rounded-2xl border border-white/10 w-full object-cover h-[450px]"
                        />
                    </div>
                    
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-3xl font-bold text-white tracking-tight">The Silo Problem (And Our Solution)</h2>
                        <div className="space-y-4 text-slate-400 font-light leading-relaxed text-sm md:text-base">
                            <p>
                                Traditionally, agencies operate in silos. A development house builds a beautiful product, but leaves cloud configurations and server clusters to manual hosting setups. Meanwhile, a marketing agency buys paid ads directing traffic to a product that crashes under load.
                            </p>
                            <p>
                                At NeuApex, we unified these pipelines. We created a team where designers build, DevOps automate, and marketers drive traffic under a single cohesive feedback loop.
                            </p>
                            <p>
                                By aligning Core Web Vitals optimizations, containerized cloud auto-scaling, and target organic search models, we launch systems that convert clicks into scalable revenue.
                            </p>
                        </div>
                    </div>
                </section>

                {/* OUR PRINCIPLES */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-white">Our Core Principles</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Principle 1 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl hover:border-webdev-cyan/30 transition-all flex flex-col justify-between h-[280px]">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-webdev-cyan/10 border border-webdev-cyan/20 flex items-center justify-center text-webdev-cyan mb-6">
                                    <FaCode size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Quality Code First</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    React frameworks built with strict semantic HTML, sub-100ms Core Web Vitals, and modular, TypeScript component architecture.
                                </p>
                            </div>
                        </div>

                        {/* Principle 2 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl hover:border-marketing-purple/30 transition-all flex flex-col justify-between h-[280px]">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-marketing-purple/10 border border-marketing-purple/20 flex items-center justify-center text-marketing-purple mb-6">
                                    <FaBullhorn size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Data-Driven Campaigns</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Ad spend optimization routed through custom funnel tracking scripts. We target acquisition ROI, not clicks.
                                </p>
                            </div>
                        </div>

                        {/* Principle 3 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl hover:border-devops-blue/30 transition-all flex flex-col justify-between h-[280px]">
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-devops-blue/10 border border-devops-blue/20 flex items-center justify-center text-devops-blue mb-6">
                                    <FaCloud size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Bulletproof Infrastructure</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Docker deployments, Kubernetes autoscaling nodes, automated VPC firewalls, and active 24/7 cloud logs tracking.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE TEAM */}
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-white">Meet Our Leaders</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="group flex flex-col items-center text-center">
                                {/* Glowing profile image frame */}
                                <div className={`w-48 h-48 rounded-full overflow-hidden border-2 p-1 bg-slate-950 transition-all duration-500 shadow-xl ${member.accentClass} mb-6`}>
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 pointer-events-none" 
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block mb-4">{member.role}</span>
                                <p className="text-slate-400 text-xs font-light leading-relaxed max-w-xs px-2">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

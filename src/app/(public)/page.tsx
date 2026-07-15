'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaArrowRight, 
    FaCode, 
    FaBullhorn, 
    FaLayerGroup, 
    FaServer, 
    FaChartLine, 
    FaShieldAlt, 
    FaChevronLeft, 
    FaChevronRight, 
    FaQuoteLeft,
    FaCheckCircle,
    FaArrowDown
} from 'react-icons/fa';
import ThreeBackground from '@/components/ThreeBackground';
import Hero3D from '@/components/Hero3D';
import { testimonialsData } from '@/lib/mockData';

// Custom Counter Component
function MetricCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const end = value;
                    if (start === end) return;

                    const totalMiliseconds = duration;
                    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
                    if (incrementTime < 10) incrementTime = 10;

                    const timer = setInterval(() => {
                        start += Math.ceil(end / (totalMiliseconds / incrementTime));
                        if (start >= end) {
                            clearInterval(timer);
                            setCount(end);
                        } else {
                            setCount(start);
                        }
                    }, incrementTime);

                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [value, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [dashboardInView, setDashboardInView] = useState(false);
    const [activeRoute, setActiveRoute] = useState<'marketing' | 'webdev' | 'devops' | null>(null);
    const [nodes, setNodes] = useState<number[]>(new Array(24).fill(0));
    
    const dashboardRef = useRef<HTMLDivElement>(null);

    // Node grid blinking simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setNodes(prev => prev.map(() => Math.random() > 0.85 ? 1 : 0));
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    // Observer for dashboard animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setDashboardInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.15 });

        if (dashboardRef.current) {
            observer.observe(dashboardRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    };

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    };

    return (
        <div className="bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
                <ThreeBackground />
                <div className="absolute top-[-25%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-marketing-purple/10 to-marketing-pink/15 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute top-[30%] left-[-15%] w-[800px] h-[800px] bg-gradient-to-tr from-devops-blue/10 to-webdev-cyan/15 rounded-full blur-[140px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 z-10 px-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Heading and CTAs */}
                    <div className="lg:col-span-7 text-left space-y-8 max-w-2xl lg:max-w-none">
                        <span className="inline-block px-4 py-1.5 border border-white/10 rounded-full text-xs font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-marketing-purple bg-white/5 backdrop-blur-md shadow-2xl">
                            UNIFIED GROWTH AND ENGINEERING ENGINE
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-white">
                            We Build. <br />
                            We Automate. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple animate-pulse">We Scale.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                            NeuApex bridges the gap between high-performance product development, bulletproof DevOps hosting infrastructure, and creative results-driven marketing systems.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                            <Link href="/contact" className="group relative px-10 py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-marketing-purple text-white rounded-full font-bold text-lg overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-cyan-400/25 transition-all duration-300 hover:-translate-y-1 text-center">
                                <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative z-10 flex items-center justify-center">
                                    Book a Strategy Call <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <a 
                                href="#split-selector" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('split-selector')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="px-10 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center cursor-pointer flex items-center justify-center"
                            >
                                Explore Services <FaArrowDown className="ml-2 text-sm text-slate-400" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column: WebGL Scene */}
                    <div className="lg:col-span-5 relative w-full flex justify-center">
                        <Hero3D />
                    </div>
                </div>
            </section>

            {/* SPLIT-ROUTE SELECTOR SECTION */}
            <section id="split-selector" className="py-28 bg-slate-950 relative z-10 overflow-hidden border-t border-white/5">
                {/* Dynamic Accent Glow Mesh */}
                <div className="absolute inset-0 pointer-events-none transition-all duration-1000 flex items-center justify-center z-0">
                    <div className={`w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 transition-all duration-1000 ${
                        activeRoute === 'marketing' ? 'bg-marketing-purple scale-125' :
                        activeRoute === 'webdev' ? 'bg-webdev-cyan scale-125' :
                        activeRoute === 'devops' ? 'bg-devops-blue scale-125' :
                        'bg-blue-900/10'
                    }`}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 max-w-xl mx-auto">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40 mb-4">
                            CHOOSE YOUR ROUTE
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            Select Your Dynamic Objective
                        </h2>
                        <p className="text-slate-400 text-sm mt-3 font-light">
                            Hover over a sector to align the grid accent glow. Click to explore core features.
                        </p>
                    </div>

                    {/* 3-Column Split selector */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sector 1: Digital Marketing */}
                        <Link 
                            href="/services/digital-marketing"
                            onMouseEnter={() => setActiveRoute('marketing')}
                            onMouseLeave={() => setActiveRoute(null)}
                            className={`group relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between h-[360px] cursor-pointer ${
                                activeRoute === 'marketing' 
                                    ? 'bg-slate-900/50 border-marketing-purple/40 shadow-2xl shadow-marketing-purple/5'
                                    : 'bg-white/[0.01] border-white/5'
                            }`}
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-marketing-purple/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div>
                                <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                                    activeRoute === 'marketing' 
                                        ? 'bg-marketing-purple/20 border-marketing-purple/40 text-marketing-pink scale-110' 
                                        : 'bg-white/5 border-white/10 text-slate-400'
                                }`}>
                                    <FaBullhorn className="text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white transition-colors group-hover:text-marketing-pink">Digital Marketing</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    SEO scale engines, conversions audit, and performance ads that turn visibility into measurable revenue metrics.
                                </p>
                            </div>
                            <span className="text-xs uppercase tracking-wider font-bold text-marketing-pink flex items-center group-hover:translate-x-1.5 transition-transform duration-300">
                                Growth &amp; Analytics &rarr;
                            </span>
                        </Link>

                        {/* Sector 2: Web Dev */}
                        <Link 
                            href="/services/web-development"
                            onMouseEnter={() => setActiveRoute('webdev')}
                            onMouseLeave={() => setActiveRoute(null)}
                            className={`group relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between h-[360px] cursor-pointer ${
                                activeRoute === 'webdev' 
                                    ? 'bg-slate-900/50 border-webdev-cyan/40 shadow-2xl shadow-webdev-cyan/5'
                                    : 'bg-white/[0.01] border-white/5'
                            }`}
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-webdev-cyan/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div>
                                <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                                    activeRoute === 'webdev' 
                                        ? 'bg-webdev-cyan/20 border-webdev-cyan/40 text-webdev-cyan scale-110' 
                                        : 'bg-white/5 border-white/10 text-slate-400'
                                }`}>
                                    <FaCode className="text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white transition-colors group-hover:text-webdev-cyan">Web Development</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Engineering pixel-perfect Next.js SaaS apps, rapid load architectures, and e-commerce with flawless user experiences.
                                </p>
                            </div>
                            <span className="text-xs uppercase tracking-wider font-bold text-webdev-cyan flex items-center group-hover:translate-x-1.5 transition-transform duration-300">
                                Engineering &amp; Design &rarr;
                            </span>
                        </Link>

                        {/* Sector 3: DevOps */}
                        <Link 
                            href="/services/cloud-solutions"
                            onMouseEnter={() => setActiveRoute('devops')}
                            onMouseLeave={() => setActiveRoute(null)}
                            className={`group relative p-10 rounded-3xl backdrop-blur-xl border transition-all duration-500 flex flex-col justify-between h-[360px] cursor-pointer ${
                                activeRoute === 'devops' 
                                    ? 'bg-slate-900/50 border-devops-blue/40 shadow-2xl shadow-devops-blue/50'
                                    : 'bg-white/[0.01] border-white/5'
                            }`}
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-devops-blue/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div>
                                <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                                    activeRoute === 'devops' 
                                        ? 'bg-devops-blue/20 border-devops-blue/40 text-devops-blue scale-110' 
                                        : 'bg-white/5 border-white/10 text-slate-400'
                                }`}>
                                    <FaLayerGroup className="text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white transition-colors group-hover:text-devops-blue">DevOps &amp; Security</h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Zero downtime deployments, autoscaling Kubernetes clusters, CI/CD pipelines, and bulletproof cloud nodes monitoring.
                                </p>
                            </div>
                            <span className="text-xs uppercase tracking-wider font-bold text-devops-blue flex items-center group-hover:translate-x-1.5 transition-transform duration-300">
                                Infrastructure &amp; Security &rarr;
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* PERFORMANCE METRICS / SOCIAL PROOF GRID */}
            <section className="py-24 bg-slate-900/40 relative z-10 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">PROVEN OUTCOMES</p>
                        <h2 className="text-3xl md:text-4xl font-black text-white">Critical Impact Indicators</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Indicator 1: Marketing ROI */}
                        <div className="bg-slate-950/80 border border-white/10 p-8 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-marketing-purple to-marketing-pink"></div>
                            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-marketing-purple to-marketing-pink mb-4 block font-mono">
                                <MetricCounter value={300} suffix="%" />
                            </span>
                            <h3 className="text-lg font-bold text-white mb-2">Average Campaign ROI</h3>
                            <p className="text-slate-500 text-sm font-light">
                                Scaled paid search and SEO loops to drive 3x ROI margins within 6 months.
                            </p>
                        </div>

                        {/* Indicator 2: DevOps Uptime */}
                        <div className="bg-slate-950/80 border border-white/10 p-8 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4 block font-mono">
                                <MetricCounter value={99} suffix=".99%" />
                            </span>
                            <h3 className="text-lg font-bold text-white mb-2">Infrastructure Uptime</h3>
                            <p className="text-slate-500 text-sm font-light">
                                Resilient clusters and auto-failovers that guarantee absolute zero application downtime.
                            </p>
                        </div>

                        {/* Indicator 3: Web Performance */}
                        <div className="bg-slate-950/80 border border-white/10 p-8 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-webdev-cyan to-emerald-400"></div>
                            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan to-emerald-400 mb-4 block font-mono">
                                <MetricCounter value={100} suffix="" />
                            </span>
                            <h3 className="text-lg font-bold text-white mb-2">Lighthouse Score</h3>
                            <p className="text-slate-500 text-sm font-light">
                                Clean code architecture, server components, and asset loading built for maximum speed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE "ALL-IN-ONE" VALUE PROP FLYWHEEL SECTION */}
            <section className="py-32 bg-slate-950 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-marketing-pink uppercase bg-marketing-pink/10 rounded-full border border-marketing-pink/20">
                                OUR WORKFLOW
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                How Code, Cloud, and Growth Connect.
                            </h2>
                            <p className="text-slate-400 text-base font-light leading-relaxed">
                                Most agencies work in silos—designers build sites they can&apos;t host, developers write code marketers can&apos;t index, and marketers run traffic to pages that crash. 
                            </p>
                            <p className="text-slate-400 text-base font-light leading-relaxed">
                                NeuApex integrates all three fields. We build fast frontends, deploy them on autoscaling secure cloud infrastructure, and build high-conversion landing structures to maximize ROI.
                            </p>
                        </div>

                        {/* Visual Flywheel Map */}
                        <div className="lg:col-span-7">
                            <div className="border border-white/5 bg-slate-900/20 backdrop-blur-xl p-10 rounded-3xl relative">
                                <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
                                    Unified Flywheel Map
                                </div>
                                
                                <div className="space-y-8 relative">
                                    {/* Line connecting the steps */}
                                    <div className="absolute top-8 bottom-8 left-8 w-[1px] bg-gradient-to-b from-webdev-cyan via-devops-blue to-marketing-purple"></div>

                                    {/* Step 1 */}
                                    <div className="flex items-start space-x-6 relative">
                                        <div className="w-16 h-16 rounded-full bg-webdev-cyan/15 border border-webdev-cyan/30 flex items-center justify-center text-webdev-cyan text-lg z-10 shrink-0 font-bold font-mono">
                                            01
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Create (Web Dev)</h3>
                                            <p className="text-slate-400 text-sm font-light">
                                                We construct lightning-fast layouts focusing on clean hierarchy, Core Web Vitals, and premium user interaction.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start space-x-6 relative">
                                        <div className="w-16 h-16 rounded-full bg-devops-blue/15 border border-devops-blue/30 flex items-center justify-center text-devops-blue text-lg z-10 shrink-0 font-bold font-mono">
                                            02
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Automate &amp; Scale (DevOps)</h3>
                                            <p className="text-slate-400 text-sm font-light">
                                                We wrap your code in auto-scaling cloud microservices, automate deployment logs, and guard against spikes in traffic.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start space-x-6 relative">
                                        <div className="w-16 h-16 rounded-full bg-marketing-purple/15 border border-marketing-purple/30 flex items-center justify-center text-marketing-pink text-lg z-10 shrink-0 font-bold font-mono">
                                            03
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">Acquire &amp; Convert (Marketing)</h3>
                                            <p className="text-slate-400 text-sm font-light">
                                                We optimize funnels, scale paid search channels, and audit organic index structures to route qualified leads.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY US SECTION (DASHBOARD) */}
            <section ref={dashboardRef} className="py-32 bg-slate-900/50 border-t border-white/5 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        {/* Left Side: Stats and Info */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-marketing-pink uppercase bg-marketing-pink/10 rounded-full border border-marketing-pink/20 mb-4">
                                    PERFORMANCE ADVANTAGE
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-6">
                                    Built for Speed. <br />
                                    Secured for Uptime.
                                </h2>
                                <p className="text-slate-400 text-lg font-light leading-relaxed">
                                    Startups need to ship rapidly without breaking infrastructure. We implement secure environments, blazing fast rendering pipelines, and data acquisition funnels that scale seamlessly.
                                </p>
                            </div>

                            {/* Counter Grid */}
                            <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                                <div>
                                    <div className="text-5xl font-black text-white mb-2 font-mono">
                                        <MetricCounter value={99} suffix="%" />
                                    </div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Uptime Guaranteed</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-webdev-cyan mb-2 font-mono">
                                        <MetricCounter value={95} suffix="ms" />
                                    </div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Average LCP Load Time</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-marketing-pink mb-2 font-mono">
                                        <MetricCounter value={320} suffix="%" />
                                    </div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Avg Client Revenue Growth</div>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-devops-blue mb-2 font-mono">
                                        <MetricCounter value={24} suffix="/7" />
                                    </div>
                                    <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Infrastructure Monitoring</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Interactive Dashboard Mockup */}
                        <div className="lg:col-span-7">
                            <div className="bg-slate-950 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                                {/* Top bar mimicking OS window */}
                                <div className="flex items-center space-x-2 border-b border-white/5 pb-4 mb-6">
                                    <div className="w-3 w-3 h-3 rounded-full bg-rose-500/80"></div>
                                    <div className="w-3 w-3 h-3 rounded-full bg-amber-500/80"></div>
                                    <div className="w-3 w-3 h-3 rounded-full bg-emerald-500/80"></div>
                                    <span className="text-xs text-slate-500 font-mono ml-4">analytics-dashboard</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Sub-Card 1: Traffic Chart */}
                                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-semibold text-slate-400">Monthly Traffic</span>
                                            <FaChartLine className="text-devops-blue text-sm" />
                                        </div>
                                        <div className="h-28 flex items-end">
                                            <svg viewBox="0 0 300 120" className="w-full h-full">
                                                <defs>
                                                    <linearGradient id="chartGradientHome" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.0" />
                                                    </linearGradient>
                                                </defs>
                                                <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.03)" />
                                                <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.03)" />
                                                <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.03)" />
                                                
                                                <path
                                                    d="M 10 100 Q 80 90 120 60 T 220 40 T 290 15"
                                                    fill="none"
                                                    stroke="#00d2ff"
                                                    strokeWidth="3.5"
                                                    strokeDasharray="400"
                                                    strokeDashoffset={dashboardInView ? "0" : "400"}
                                                    className="transition-all duration-1200 ease-out"
                                                />
                                                <path
                                                    d="M 10 100 Q 80 90 120 60 T 220 40 T 290 15 L 290 110 L 10 110 Z"
                                                    fill="url(#chartGradientHome)"
                                                    opacity={dashboardInView ? 1 : 0}
                                                    className="transition-opacity duration-1000 delay-500 ease-out"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-2 text-right">
                                            <span className="text-xs font-mono font-bold text-emerald-400">+320.4%</span>
                                        </div>
                                    </div>

                                    {/* Sub-Card 2: Speed Gauge */}
                                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center">
                                        <div className="relative w-28 h-28 flex items-center justify-center mb-2">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="56"
                                                    cy="56"
                                                    r="44"
                                                    stroke="rgba(255,255,255,0.03)"
                                                    strokeWidth="7.5"
                                                    fill="transparent"
                                                />
                                                <circle
                                                    cx="56"
                                                    cy="56"
                                                    r="44"
                                                    stroke="url(#speedGradientHome)"
                                                    strokeWidth="7.5"
                                                    fill="transparent"
                                                    strokeDasharray={2 * Math.PI * 44}
                                                    strokeDashoffset={dashboardInView ? (2 * Math.PI * 44) * (1 - 0.99) : 2 * Math.PI * 44}
                                                    className="transition-all duration-1000 delay-200 ease-out"
                                                />
                                                <defs>
                                                    <linearGradient id="speedGradientHome" x1="0" y1="0" x2="1" y2="1">
                                                        <stop offset="0%" stopColor="#00f6ff" />
                                                        <stop offset="100%" stopColor="#00d2ff" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute flex flex-col items-center">
                                                <span className="text-3xl font-black text-white leading-none font-mono">99</span>
                                                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">PageSpeed</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-400">Core Web Vitals Optimized</span>
                                    </div>

                                    {/* Sub-Card 3: Kubernetes Servers Node Status */}
                                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-semibold text-slate-400">Kubernetes Pod Status</span>
                                            <FaServer className="text-webdev-cyan text-sm" />
                                        </div>
                                        {/* Blinking Node Grid */}
                                        <div className="grid grid-cols-6 gap-2">
                                            {nodes.map((state, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-5 rounded-md transition-all duration-500 ${
                                                        state === 1 
                                                            ? 'bg-devops-blue shadow-md shadow-devops-blue/50 scale-105' 
                                                            : 'bg-emerald-500/20 border border-emerald-500/40'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                                            <span>Nodes Active: 24/24</span>
                                            <span className="text-emerald-400 font-bold animate-pulse">● HEALTHY</span>
                                        </div>
                                    </div>

                                    {/* Sub-Card 4: Security Firewall */}
                                    <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-semibold text-slate-400">Threat Shield</span>
                                            <FaShieldAlt className="text-marketing-pink text-sm" />
                                        </div>
                                        
                                        <div className="flex items-center space-x-4 my-2">
                                            <div className="relative w-12 h-12 flex items-center justify-center bg-marketing-pink/10 border border-marketing-pink/30 rounded-full">
                                                <FaShieldAlt className="text-marketing-pink text-xl animate-pulse" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white font-mono">100% BLOCKED</p>
                                                <p className="text-[10px] text-slate-500 font-mono">Firewall Shield Active</p>
                                            </div>
                                        </div>
                                        
                                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-marketing-pink h-full w-[100%] rounded-full animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-32 bg-slate-950 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 max-w-2xl mx-auto">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-marketing-purple uppercase bg-marketing-purple/10 rounded-full border border-marketing-purple/20 mb-4">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
                            Voices of Scaling Startups
                        </h2>
                    </div>

                    {/* Testimonial Slider Container */}
                    <div className="relative max-w-4xl mx-auto px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="glass-panel p-8 md:p-14 rounded-3xl relative shadow-2xl bg-white/[0.01]"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-8 text-7xl text-white/5 font-serif pointer-events-none">
                                    <FaQuoteLeft />
                                </div>

                                <div className="space-y-8">
                                    <div className="flex text-yellow-400 text-sm">
                                        {[...Array(5)].map((_, i) => <span key={i} className="mr-1">★</span>)}
                                    </div>
                                    
                                    <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed font-light">
                                        &ldquo;{testimonialsData[activeTestimonial].message}&rdquo;
                                    </p>

                                    <div className="flex items-center border-t border-white/5 pt-6">
                                        <div className="w-14 h-14 bg-slate-800 rounded-full overflow-hidden mr-4 shadow-inner border-2 border-white/10 shrink-0">
                                            {testimonialsData[activeTestimonial].image ? (
                                                <img 
                                                    src={testimonialsData[activeTestimonial].image} 
                                                    alt={testimonialsData[activeTestimonial].name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                                                    {testimonialsData[activeTestimonial].name[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base">{testimonialsData[activeTestimonial].name}</h4>
                                            <p className="text-xs text-cyan-400 font-medium tracking-wider uppercase">
                                                {testimonialsData[activeTestimonial].role} &bull; {testimonialsData[activeTestimonial].company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="flex justify-center md:justify-end md:absolute md:-bottom-20 md:right-0 space-x-4 mt-8 md:mt-0">
                            <button 
                                onClick={prevTestimonial}
                                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                                aria-label="Previous testimonial"
                            >
                                <FaChevronLeft />
                            </button>
                            <button 
                                onClick={nextTestimonial}
                                className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white transition-all shadow-lg hover:shadow-cyan-400/20 active:scale-95"
                                aria-label="Next testimonial"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRE-FOOTER FINAL CTA BLOCK */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-950 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent)] pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tight text-white leading-tight">
                        Scale Fast. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple">Deploy with Confidence</span>.
                    </h2>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Join companies that scaled their tech architectures by 10x and grew search engine traffic by over 300%. Our developers and marketers are ready.
                    </p>
                    <a 
                        href="#contact" 
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-block px-12 py-5 bg-white text-slate-950 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
                    >
                        Start Your Growth Loop
                    </a>
                </div>
            </section>
        </div>
    );
}

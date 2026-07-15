'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    FaArrowLeft, 
    FaCheck, 
    FaBullhorn, 
    FaCode, 
    FaCloud, 
    FaServer, 
    FaChartLine, 
    FaSearch, 
    FaDollarSign,
    FaArrowRight,
    FaShieldAlt,
    FaSync,
    FaHdd,
    FaLock
} from 'react-icons/fa';

// Simplified SVG Logos for Tech Stack
const nextjsLogo = (
    <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM90 167C47.4741 167 13 132.526 13 90C13 47.4741 47.4741 13 90 13C132.526 13 167 47.4741 167 90C167 132.526 132.526 167 90 167Z" />
        <path d="M135.5 137.5L88 77H77V115H88V88.5L127.5 138.5C130.334 136.233 133.012 133.722 135.5 137.5Z" />
    </svg>
);

const reactLogo = (
    <svg className="w-8 h-8 fill-current text-cyan-400 animate-spin-slow" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [chartInView, setChartInView] = useState(false);
    const [activeDiagramNode, setActiveDiagramNode] = useState<number | null>(null);
    const chartRef = useRef<SVGSVGElement>(null);

    // Observer for chart animations on Marketing Page
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setChartInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.15 });

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }
        return () => observer.disconnect();
    }, [slug]);

    // Render 1: Digital Marketing
    if (slug === 'digital-marketing') {
        return (
            <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative">
                {/* Background ambient light */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-marketing-purple/10 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/services" className="inline-flex items-center text-marketing-pink hover:opacity-85 mb-10 transition-opacity text-sm font-bold tracking-wide uppercase">
                        <FaArrowLeft className="mr-2" /> Back to Services
                    </Link>

                    {/* HERO */}
                    <div className="max-w-3xl mb-20 space-y-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-marketing-pink uppercase bg-marketing-pink/10 rounded-full border border-marketing-pink/20">
                            ACQUISITION &amp; GROWTH
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
                            Acquire Qualified Leads. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-marketing-purple via-marketing-pink to-yellow-300">Scale Conversion Channels.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                            Stop burning venture capital on untracked campaigns. We audit funnel leakage, optimize paid acquisition algorithms, and execute technical SEO architecture that targets real revenue margins.
                        </p>
                    </div>

                    {/* STRATEGY STACK */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28">
                        {/* Channel 1 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl space-y-4 hover:border-marketing-pink/30 hover:bg-white/[0.02] transition-all">
                            <div className="w-12 h-12 bg-marketing-pink/10 rounded-xl flex items-center justify-center text-marketing-pink">
                                <FaSearch size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Technical SEO</h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                Index indexing structure adjustments, programmatic landing engines, and core ranking systems engineered for discovery.
                            </p>
                        </div>
                        {/* Channel 2 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl space-y-4 hover:border-marketing-pink/30 hover:bg-white/[0.02] transition-all">
                            <div className="w-12 h-12 bg-marketing-pink/10 rounded-xl flex items-center justify-center text-marketing-pink">
                                <FaDollarSign size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">PPC Management</h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                Budget bidding automation, custom landing structure matches, and cohort tracking tools that optimize CAC models.
                            </p>
                        </div>
                        {/* Channel 3 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl space-y-4 hover:border-marketing-pink/30 hover:bg-white/[0.02] transition-all">
                            <div className="w-12 h-12 bg-marketing-pink/10 rounded-xl flex items-center justify-center text-marketing-pink">
                                <FaBullhorn size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Paid Social scale</h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                Dynamic creative execution and visual funnel frameworks designed to engage startup cohorts and raise conversion clicks.
                            </p>
                        </div>
                        {/* Channel 4 */}
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-2xl space-y-4 hover:border-marketing-pink/30 hover:bg-white/[0.02] transition-all">
                            <div className="w-12 h-12 bg-marketing-pink/10 rounded-xl flex items-center justify-center text-marketing-pink">
                                <FaChartLine size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Funnel Optimization</h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                User recording audits, custom split testing layouts, and UI changes designed to maximize user checkout loops.
                            </p>
                        </div>
                    </div>

                    {/* INTERACTIVE CHART SHOWCASE */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-28 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <span className="text-xs font-mono font-bold tracking-wider text-marketing-pink uppercase">REAL RESULTS CASE</span>
                            <h2 className="text-3xl md:text-4xl font-black text-white">Watch Traffic Growth Climb</h2>
                            <p className="text-slate-400 font-light leading-relaxed">
                                Below is a performance indicator of a SaaS client. By refactoring programmatic search landing layouts and targeting paid search optimization, traffic scaled from a flatline to over +340%.
                            </p>
                            <div className="border-t border-white/5 pt-6 space-y-4 text-sm text-slate-300 font-light">
                                <div className="flex items-center"><FaCheck className="text-marketing-pink mr-3" /> Zero search visibility loss during migration</div>
                                <div className="flex items-center"><FaCheck className="text-marketing-pink mr-3" /> Average CAC decreased by 40%</div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative">
                            <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Interactive Traffic Scale</span>
                            <h4 className="text-sm font-bold mb-6 text-white font-mono">Organic Clicks Over Time (Before vs After)</h4>
                            <div className="h-60 flex items-end">
                                <svg ref={chartRef} viewBox="0 0 400 160" className="w-full h-full">
                                    <defs>
                                        <linearGradient id="marketingChartGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#ff007a" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#ff007a" stopOpacity="0.0" />
                                        </linearGradient>
                                    </defs>
                                    <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.03)" />
                                    <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.03)" />
                                    <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.03)" />
                                    
                                    {/* Flat line before */}
                                    <path
                                        d="M 10 130 L 150 130"
                                        fill="none"
                                        stroke="#64748b"
                                        strokeWidth="2"
                                        strokeDasharray="5"
                                    />
                                    {/* Climbed line after */}
                                    <path
                                        d="M 150 130 Q 180 125 210 90 T 300 40 T 390 15"
                                        fill="none"
                                        stroke="#ff007a"
                                        strokeWidth="3.5"
                                        strokeDasharray="400"
                                        strokeDashoffset={chartInView ? "0" : "400"}
                                        className="transition-all duration-1200 ease-out"
                                    />
                                    <path
                                        d="M 150 130 Q 180 125 210 90 T 300 40 T 390 15 L 390 150 L 150 150 Z"
                                        fill="url(#marketingChartGlow)"
                                        opacity={chartInView ? 1 : 0}
                                        className="transition-opacity duration-1000 delay-500 ease-out"
                                    />
                                    <text x="70" y="150" fill="#64748b" className="text-[10px] font-mono">Platform Audit</text>
                                    <text x="310" y="150" fill="#ff007a" className="text-[10px] font-mono font-bold">Optimization Active</text>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-marketing-purple/20 via-marketing-pink/15 to-transparent border border-white/10 p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-white">Find Out Where Your Traffic Is Leaking.</h2>
                        <p className="text-slate-400 font-light max-w-xl mx-auto">
                            We will audit your index settings, paid ad keywords, and visual checkout latency. Get a comprehensive diagnostic report.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-base hover:scale-105 transition-transform">
                            Get a Free Marketing Audit <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render 2: Website Development
    if (slug === 'web-development') {
        return (
            <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative">
                {/* Background ambient light */}
                <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-webdev-cyan/10 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/services" className="inline-flex items-center text-webdev-cyan hover:opacity-85 mb-10 transition-opacity text-sm font-bold tracking-wide uppercase">
                        <FaArrowLeft className="mr-2" /> Back to Services
                    </Link>

                    {/* HERO */}
                    <div className="max-w-3xl mb-20 space-y-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-webdev-cyan uppercase bg-webdev-cyan/10 rounded-full border border-webdev-cyan/20">
                            CRAFT &amp; PERFORMANCE
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
                            Load in Milliseconds. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-emerald-400">Flawless User Experience.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                            A slow website costs conversions. We construct high-performance React/Next.js SaaS panels, custom API backends, and headless e-commerce structures optimized for speed and SEO structure.
                        </p>
                    </div>

                    {/* TECH STACK LOGO GRID */}
                    <div className="mb-28">
                        <h2 className="text-2xl font-bold mb-10 text-white text-center">Engineered on Modern Frameworks</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-webdev-cyan/30 transition-all">
                                {nextjsLogo}
                                <span className="text-white text-sm font-bold">Next.js</span>
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-webdev-cyan/30 transition-all">
                                {reactLogo}
                                <span className="text-white text-sm font-bold">React</span>
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-webdev-cyan/30 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-xs">TS</div>
                                <span className="text-white text-sm font-bold">TypeScript</span>
                            </div>
                            <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-webdev-cyan/30 transition-all">
                                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 font-black text-xs">API</div>
                                <span className="text-white text-sm font-bold">Custom REST/GraphQL</span>
                            </div>
                        </div>
                    </div>

                    {/* KEY FEATURES LAYOUT */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
                        <div className="bg-white/[0.01] border border-white/5 p-10 rounded-3xl space-y-4">
                            <h3 className="text-2xl font-bold text-white">100/100 Core Web Vitals</h3>
                            <p className="text-slate-400 font-light leading-relaxed">
                                We utilize static pre-rendering, progressive asset optimization, and CDN routing layouts. Your page will load in milliseconds, securing rank in Google Core ranking metrics.
                            </p>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 p-10 rounded-3xl space-y-4">
                            <h3 className="text-2xl font-bold text-white">Custom Scalable API Layer</h3>
                            <p className="text-slate-400 font-light leading-relaxed">
                                Secure, modular integration loops for databases (Mongoose/SQL), payment processing portals (Stripe), and SaaS dashboards designed to grow with user size.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-webdev-cyan/20 via-blue-500/10 to-transparent border border-white/10 p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-white">Need a High-Performance Web App?</h2>
                        <p className="text-slate-400 font-light max-w-xl mx-auto">
                            Tell us about your SaaS goals, headless store integrations, or specific dashboard scope. Let&apos;s build.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-base hover:scale-105 transition-transform">
                            Start Your Project <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render 3: DevOps & Infrastructure
    if (slug === 'cloud-solutions' || slug === 'devops') {
        return (
            <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative">
                {/* Background ambient light */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-devops-blue/10 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/services" className="inline-flex items-center text-devops-blue hover:opacity-85 mb-10 transition-opacity text-sm font-bold tracking-wide uppercase">
                        <FaArrowLeft className="mr-2" /> Back to Services
                    </Link>

                    {/* HERO */}
                    <div className="max-w-3xl mb-20 space-y-6">
                        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-devops-blue uppercase bg-devops-blue/10 rounded-full border border-devops-blue/20">
                            INFRASTRUCTURE &amp; SCALE
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-none">
                            Zero Downtime Uptime. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-devops-blue to-webdev-cyan">Automated CI/CD Scalability.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                            Stop wrestling with cloud servers. We automate your continuous deployment loops (CI/CD), secure databases, optimize load balancing configurations, and structure cluster nodes.
                        </p>
                    </div>

                    {/* INTERACTIVE DIAGRAM */}
                    <div className="bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-3xl mb-28">
                        <h2 className="text-2xl font-bold mb-2 text-white text-center">Interactive Cloud Node Architecture</h2>
                        <p className="text-slate-400 text-sm mb-12 text-center font-light">Hover over nodes to inspect active load balances</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
                            {/* Node 1 */}
                            <div 
                                onMouseEnter={() => setActiveDiagramNode(1)}
                                onMouseLeave={() => setActiveDiagramNode(null)}
                                className={`p-6 rounded-2xl border transition-all relative ${
                                    activeDiagramNode === 1 ? 'bg-devops-blue/15 border-devops-blue text-white shadow-lg shadow-devops-blue/5' : 'bg-white/[0.01] border-white/5 text-slate-400'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <FaSync className={`text-xl ${activeDiagramNode === 1 ? 'animate-spin' : ''}`} />
                                    <h4 className="font-bold text-white">CI/CD Deploy Pipeline</h4>
                                </div>
                                <p className="text-xs leading-relaxed font-light text-slate-400">
                                    GitHub actions push triggers automatic compilation, tests run loops, and bundles to container nodes.
                                </p>
                            </div>

                            {/* Node 2 */}
                            <div 
                                onMouseEnter={() => setActiveDiagramNode(2)}
                                onMouseLeave={() => setActiveDiagramNode(null)}
                                className={`p-6 rounded-2xl border transition-all relative ${
                                    activeDiagramNode === 2 ? 'bg-devops-blue/15 border-devops-blue text-white shadow-lg shadow-devops-blue/5' : 'bg-white/[0.01] border-white/5 text-slate-400'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <FaServer />
                                    <h4 className="font-bold text-white">Kubernetes Clusters</h4>
                                </div>
                                <p className="text-xs leading-relaxed font-light text-slate-400">
                                    Active node instances scale automatically with traffic spikes. Failover routing isolates node issues.
                                </p>
                            </div>

                            {/* Node 3 */}
                            <div 
                                onMouseEnter={() => setActiveDiagramNode(3)}
                                onMouseLeave={() => setActiveDiagramNode(null)}
                                className={`p-6 rounded-2xl border transition-all relative ${
                                    activeDiagramNode === 3 ? 'bg-devops-blue/15 border-devops-blue text-white shadow-lg shadow-devops-blue/5' : 'bg-white/[0.01] border-white/5 text-slate-400'
                                }`}
                            >
                                <div className="flex items-center space-x-3 mb-4">
                                    <FaCloud />
                                    <h4 className="font-bold text-white">AWS Infrastructure</h4>
                                </div>
                                <p className="text-xs leading-relaxed font-light text-slate-400">
                                    S3 CDN hosting, database caches (Redis), and secure private firewall modules (VPC).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* KEY PILLARS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
                        <div className="flex items-start space-x-4 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                            <FaShieldAlt className="text-2xl text-devops-blue mt-1 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Security &amp; Compliance</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    AWS security groups audits, database backup automation, VPC isolation, and compliance validation.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                            <FaHdd className="text-2xl text-devops-blue mt-1 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Scalable Load Balancing</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Nginx routing, traffic analysis tools, and cluster size adjustments designed to handle load spike events.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                            <FaSync className="text-2xl text-devops-blue mt-1 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Automated CI/CD Deploy</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Automated build and test suites that check code logic before shipping to cloud server configurations.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                            <FaDollarSign className="text-2xl text-devops-blue mt-1 shrink-0" />
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">Cost Optimization</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    We analyze CPU usage profiles, optimize EC2 cluster sizes, and slash server bills by up to 50%.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-devops-blue/20 via-cyan-500/10 to-transparent border border-white/10 p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black text-white">Struggling with server latency or costs?</h2>
                        <p className="text-slate-400 font-light max-w-xl mx-auto">
                            Our DevOps architects will review your cloud build, trace performance latency, and identify savings.
                        </p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-base hover:scale-105 transition-transform">
                            Get a Cloud Assessment <FaArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Default Fallback details layout
    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <Link href="/services" className="inline-flex items-center text-cyan-400 hover:opacity-85 mb-10 transition-opacity text-sm font-bold tracking-wide uppercase">
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500"></div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        {slug ? slug.replace('-', ' ').toUpperCase() : 'Capabilities'}
                    </h1>
                    
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
                        We deliver high-fidelity technical agency services tailored to support startup growth, secure environments, and optimize performance parameters.
                    </p>

                    <div className="border-t border-white/5 pt-8 space-y-6">
                        <h3 className="text-xl font-bold text-white">Capabilities Includes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["Custom Strategy Alignment", "Agile Iteration Execution", "Continuous Metrics Audits", "Scalable Systems Architecture"].map((cap, i) => (
                                <div key={i} className="flex items-center space-x-3 text-slate-300 font-light text-sm">
                                    <FaCheck className="text-cyan-400 text-xs shrink-0" />
                                    <span>{cap}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-bold text-white mb-2">Need a custom technical roadmap?</h4>
                            <p className="text-slate-400 text-xs font-light">Tell our developers and operations architects about your project details.</p>
                        </div>
                        <Link href="/contact" className="px-6 py-3 bg-white text-slate-950 font-bold rounded-full hover:scale-105 transition-transform text-sm shrink-0">
                            Book a Call
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

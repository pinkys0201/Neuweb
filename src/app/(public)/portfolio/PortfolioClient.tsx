'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter, FaArrowRight, FaCheck } from 'react-icons/fa';

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    category: 'marketing' | 'webdev' | 'devops' | 'fullsuite';
    categoryLabel: string;
    metric: string;
    metricLabel: string;
    challenge: string;
    solution: string;
    image: string;
}

const portfolioCaseStudies: CaseStudy[] = [
    {
        id: '1',
        title: 'TechFlow Enterprise SaaS Platform',
        slug: 'techflow-saas',
        category: 'webdev',
        categoryLabel: 'Web Development',
        metric: '100 Score',
        metricLabel: 'Lighthouse Performance Speed',
        challenge: 'TechFlow legacy dashboards suffered from 3-second render delays and asset inflation, leading to user drops during onboarding.',
        solution: 'Rebuilt as a Next.js server component layout, cached REST calls via GraphQL queries, and routed visual media assets via optimized CDNs.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '2',
        title: 'FinRise High-Volume Lead Engine',
        slug: 'finrise-marketing',
        category: 'marketing',
        categoryLabel: 'Digital Marketing',
        metric: '+300% ROI',
        metricLabel: 'Paid Search Campaigns Conversion',
        challenge: 'FinRise was running un-targeted ads with a high CAC ($85) and zero programmatic ranking discovery loops.',
        solution: 'Refactored Google Search ads bidding scripts, designed cohort pricing structures, and launched authority SEO index engines.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '3',
        title: 'CloudShield Kubernetes Migrations',
        slug: 'cloudshield-devops',
        category: 'devops',
        categoryLabel: 'DevOps & Infrastructure',
        metric: '-50% Cost',
        metricLabel: 'Monthly Cloud Infrastructure Bill',
        challenge: 'CloudShield was wasting $42,000/month on over-provisioned idle clusters, and pipelines took 45 minutes to manually build.',
        solution: 'Consolidated nodes under autoscaling groups, restructured Kubernetes network load routing, and built automated GitHub actions pipelines.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
        id: '4',
        title: 'VeloPay Unified Launch & Scale',
        slug: 'velopay-fullsuite',
        category: 'fullsuite',
        categoryLabel: 'Full-Suite Scale',
        metric: '10x Leads',
        metricLabel: 'Customer Acquisition Scale & Speed',
        challenge: 'VeloPay launched their app but had server timeout spikes during traffic, a slow landing design, and zero paid search visibility.',
        solution: 'Implemented Next.js app structures, deployed scalable nodes, and routed traffic through optimized Google Ad scripts.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
];

export default function PortfolioClient({ projects }: { projects?: any[] }) {
    const [filter, setFilter] = useState<'all' | 'marketing' | 'webdev' | 'devops' | 'fullsuite'>('all');

    const filteredStudies = portfolioCaseStudies.filter(
        (study) => filter === 'all' || study.category === filter
    );

    return (
        <div className="pt-36 pb-24 bg-slate-950 min-h-screen text-slate-100 font-sans relative overflow-hidden">
            {/* Background ambient mesh */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-marketing-purple/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-devops-blue/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 relative z-10 max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40 mb-4 animate-pulse">
                        CASE STUDIES
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                        Real results. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple">Proven engineering.</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                        Read how our development workflows, cloud scale audits, and search optimizations drive client growth.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                    <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mr-2 flex items-center">
                        <FaFilter className="mr-2 text-xs" /> Filter Projects:
                    </span>
                    {[
                        { key: 'all', label: 'All Cases' },
                        { key: 'marketing', label: 'Marketing' },
                        { key: 'webdev', label: 'Web Dev' },
                        { key: 'devops', label: 'DevOps' },
                        { key: 'fullsuite', label: 'Full-Suite' }
                    ].map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setFilter(btn.key as any)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                                filter === btn.key
                                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 border-transparent text-white shadow-lg shadow-blue-500/20'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Case Study Cards */}
                <div className="space-y-16 max-w-5xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {filteredStudies.map((study) => (
                            <motion.div
                                layout
                                key={study.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center group transition-all"
                            >
                                {/* Left Side: visual & metric */}
                                <div className="lg:col-span-5 relative w-full aspect-video lg:aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
                                    <img 
                                        src={study.image} 
                                        alt={study.title} 
                                        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                    
                                    {/* Giant Metric Card */}
                                    <div className="absolute bottom-6 left-6 right-6 bg-slate-950/95 backdrop-blur border border-white/10 p-5 rounded-xl shadow-2xl">
                                        <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-marketing-pink font-mono leading-none mb-1">
                                            {study.metric}
                                        </p>
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-none">
                                            {study.metricLabel}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Challenge / Solution */}
                                <div className="lg:col-span-7 space-y-6">
                                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                                        {study.categoryLabel}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors leading-tight">
                                        {study.title}
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">The Challenge</span>
                                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                                {study.challenge}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">Our Solution</span>
                                            <p className="text-slate-300 text-sm font-light leading-relaxed">
                                                {study.solution}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link 
                                            href={`/portfolio/${study.slug}`} 
                                            className="inline-flex items-center font-bold text-sm text-cyan-400 group-hover:text-white transition-colors"
                                        >
                                            View Full Metrics Breakdown &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {filteredStudies.length === 0 && (
                        <div className="text-center text-slate-500 py-10 font-light">No projects found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

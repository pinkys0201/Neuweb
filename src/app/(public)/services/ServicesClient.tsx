'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaCode, FaBullhorn, FaLayerGroup, FaMobileAlt, FaShoppingCart, FaCloud } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

interface Service {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    icon?: string;
}

interface ServicesClientProps {
    services: Service[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
    const mainRef = useRef<HTMLDivElement>(null);

    // Color theme mapping matching the global design system
    const serviceThemes: Record<string, { accentClass: string; hoverBorder: string; glowClass: string; textClass: string; iconBg: string }> = {
        'web-development': { 
            accentClass: 'text-webdev-cyan', 
            hoverBorder: 'hover:border-webdev-cyan/40', 
            glowClass: 'from-webdev-cyan/5', 
            textClass: 'text-webdev-cyan', 
            iconBg: 'bg-webdev-cyan/10 border-webdev-cyan/20' 
        },
        'digital-marketing': { 
            accentClass: 'text-marketing-pink', 
            hoverBorder: 'hover:border-marketing-pink/40', 
            glowClass: 'from-marketing-pink/5', 
            textClass: 'text-marketing-pink', 
            iconBg: 'bg-marketing-pink/10 border-marketing-pink/20' 
        },
        'cloud-solutions': { 
            accentClass: 'text-devops-blue', 
            hoverBorder: 'hover:border-devops-blue/40', 
            glowClass: 'from-devops-blue/5', 
            textClass: 'text-devops-blue', 
            iconBg: 'bg-devops-blue/10 border-devops-blue/20' 
        },
        'mobile-app-dev': { 
            accentClass: 'text-marketing-purple', 
            hoverBorder: 'hover:border-marketing-purple/40', 
            glowClass: 'from-marketing-purple/5', 
            textClass: 'text-marketing-purple', 
            iconBg: 'bg-marketing-purple/10 border-marketing-purple/20' 
        },
        'ui-ux-design': { 
            accentClass: 'text-webdev-cyan', 
            hoverBorder: 'hover:border-webdev-cyan/40', 
            glowClass: 'from-webdev-cyan/5', 
            textClass: 'text-webdev-cyan', 
            iconBg: 'bg-webdev-cyan/10 border-webdev-cyan/20' 
        },
        'e-commerce': { 
            accentClass: 'text-marketing-pink', 
            hoverBorder: 'hover:border-marketing-pink/40', 
            glowClass: 'from-marketing-pink/5', 
            textClass: 'text-marketing-pink', 
            iconBg: 'bg-marketing-pink/10 border-marketing-pink/20' 
        },
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
            if (cards.length) {
                gsap.from(cards, {
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: 'top 80%',
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    clearProps: 'opacity,transform'
                });
            }
        }, mainRef);
        return () => ctx.revert();
    }, []);

    const getTheme = (slug: string) => {
        return serviceThemes[slug] || {
            accentClass: 'text-cyan-400',
            hoverBorder: 'hover:border-cyan-400/40',
            glowClass: 'from-cyan-400/5',
            textClass: 'text-cyan-400',
            iconBg: 'bg-cyan-400/10 border-cyan-400/20'
        };
    };

    const getIcon = (iconName?: string, title?: string) => {
        const name = iconName || title || '';
        if (name.includes('Code') || name.includes('Web')) return <FaCode />;
        if (name.includes('Bullhorn') || name.includes('Marketing')) return <FaBullhorn />;
        if (name.includes('Layer') || name.includes('Cloud') || name.includes('DevOps')) return <FaCloud />;
        if (name.includes('Mobile') || name.includes('App')) return <FaMobileAlt />;
        if (name.includes('Shopping') || name.includes('Commerce')) return <FaShoppingCart />;
        return <FaLayerGroup />;
    };

    return (
        <div ref={mainRef} className="pt-36 pb-24 bg-slate-950 min-h-screen overflow-hidden font-sans text-slate-100 relative">
            {/* Background Orbs */}
            <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-marketing-purple/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[700px] h-[700px] bg-devops-blue/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 relative z-10 max-w-2xl mx-auto">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40 mb-4 animate-pulse">
                        OUR EXPERTISE
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
                        Our specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple">capabilities</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                        We deploy integrated technical systems and conversion marketing loops to build high-performance products.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => {
                        const theme = getTheme(service.slug);
                        return (
                            <div 
                                key={service._id} 
                                className={`service-card group relative p-10 rounded-3xl bg-white/[0.01] border border-white/5 ${theme.hoverBorder} hover:bg-white/[0.02] transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[380px]`}
                            >
                                {/* Radial hover glow */}
                                <div className={`absolute inset-0 bg-radial ${theme.glowClass} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                <div>
                                    {/* Icon Area */}
                                    <div className={`relative z-10 mb-8 w-14 h-14 ${theme.iconBg} rounded-2xl flex items-center justify-center border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                        <div className={`text-xl ${theme.accentClass}`}>
                                            {getIcon(service.icon, service.title)}
                                        </div>
                                    </div>

                                    <h3 className="relative z-10 text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="relative z-10 text-slate-400 mb-8 text-sm font-light leading-relaxed">
                                        {service.shortDescription}
                                    </p>
                                </div>

                                <Link 
                                    href={`/services/${service.slug}`} 
                                    className={`relative z-10 inline-flex items-center font-bold text-sm ${theme.accentClass} hover:opacity-80 transition-opacity group/link`}
                                >
                                    View Details 
                                    <span className={`ml-3 w-7 h-7 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center group-hover/link:translate-x-1 transition-all`}>
                                        <FaArrowRight size={10} className="text-white" />
                                    </span>
                                </Link>
                            </div>
                        );
                    })}
                    {services.length === 0 && (
                        <div className="col-span-3 text-center text-slate-500 py-10">No services found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

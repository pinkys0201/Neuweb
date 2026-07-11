'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaCode, FaBullhorn, FaMobileAlt, FaLayerGroup } from 'react-icons/fa';

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

    // Color palette for services (matching homepage)
    const serviceColors = [
        { from: 'from-pink-500', to: 'to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600', border: 'group-hover:border-pink-500', shadow: 'hover:shadow-pink-200' },
        { from: 'from-cyan-500', to: 'to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'group-hover:border-cyan-500', shadow: 'hover:shadow-cyan-200' },
        { from: 'from-purple-500', to: 'to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600', border: 'group-hover:border-purple-500', shadow: 'hover:shadow-purple-200' },
        { from: 'from-orange-500', to: 'to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600', border: 'group-hover:border-orange-500', shadow: 'hover:shadow-orange-200' },
        { from: 'from-emerald-500', to: 'to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'group-hover:border-emerald-500', shadow: 'hover:shadow-emerald-200' },
        { from: 'from-violet-500', to: 'to-fuchsia-500', bg: 'bg-violet-50', text: 'text-violet-600', border: 'group-hover:border-violet-500', shadow: 'hover:shadow-violet-200' },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.service-card') as HTMLElement[];

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'opacity,transform'
            });
        }, mainRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="pt-32 pb-20 bg-slate-50 min-h-screen overflow-hidden font-sans">
            {/* Background Orbs */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 relative z-10">
                    <span className="inline-block py-1 px-3 border border-purple-200 rounded-full text-purple-600 text-sm font-semibold tracking-wider mb-4 bg-white/80 backdrop-blur-sm shadow-sm">
                        OUR EXPERTISE
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x">Services</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                        From concept to launch, we provide end-to-end digital solutions that help your business thrive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const colorTheme = serviceColors[index % serviceColors.length];
                        return (
                            <div key={service._id} className={`service-card group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                                {/* Hover Gradient Background (Fills card) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${colorTheme.from} ${colorTheme.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                                {/* Icon Area */}
                                <div className={`relative z-10 mb-8 w-16 h-16 ${colorTheme.bg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 group-hover:bg-white/20`}>
                                    <div className={`text-2xl ${colorTheme.text} group-hover:text-white`}>
                                        {/* Simple heuristic for icons based on what might be in DB or fallback */}
                                        {service.icon?.includes('Code') || service.title.includes('Web') ? <FaCode /> :
                                            service.icon?.includes('Bullhorn') || service.title.includes('Marketing') ? <FaBullhorn /> :
                                                service.icon?.includes('Mobile') || service.title.includes('Mobile') || service.title.includes('App') ? <FaMobileAlt /> :
                                                    <FaLayerGroup />}
                                    </div>
                                </div>

                                <h3 className="relative z-10 text-2xl font-bold mb-4 text-slate-900 group-hover:text-white transition-colors">{service.title}</h3>
                                <p className="relative z-10 text-slate-500 mb-8 font-light leading-relaxed group-hover:text-white/90">{service.shortDescription}</p>

                                <Link href={`/services/${service.slug}`} className={`relative z-10 inline-flex items-center font-bold ${colorTheme.text} group-hover:text-white hover:opacity-80 transition-opacity`}>
                                    View Details <span className={`ml-3 w-8 h-8 rounded-full ${colorTheme.bg} group-hover:bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform`}><FaArrowRight size={12} className="group-hover:text-white" /></span>
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

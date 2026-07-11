'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { servicesData } from '@/lib/mockData';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

export default function ServiceDetailPage() {
    const params = useParams(); // { slug: string }
    const [service, setService] = useState<any>(null);
    const [colorTheme, setColorTheme] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Reusing the same color palette array for consistency
    const serviceColors = [
        { name: 'Pink', from: 'from-pink-500', to: 'to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-200', checkBg: 'bg-pink-100', checkText: 'text-pink-600' },
        { name: 'Cyan', from: 'from-cyan-500', to: 'to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', checkBg: 'bg-cyan-100', checkText: 'text-cyan-600' },
        { name: 'Purple', from: 'from-purple-500', to: 'to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', checkBg: 'bg-purple-100', checkText: 'text-purple-600' },
        { name: 'Orange', from: 'from-orange-500', to: 'to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', checkBg: 'bg-orange-100', checkText: 'text-orange-600' },
        { name: 'Emerald', from: 'from-emerald-500', to: 'to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', checkBg: 'bg-emerald-100', checkText: 'text-emerald-600' },
        { name: 'Violet', from: 'from-violet-500', to: 'to-fuchsia-500', bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200', checkBg: 'bg-violet-100', checkText: 'text-violet-600' },
    ];

    useEffect(() => {
        if (params?.slug) {
            const foundIndex = servicesData.findIndex((s: any) => s.slug === params.slug);
            if (foundIndex !== -1) {
                setService(servicesData[foundIndex]);
                // Assign color based on the same index logic
                setColorTheme(serviceColors[foundIndex % serviceColors.length]);
            }
            setLoading(false);
        }
    }, [params?.slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
    );

    if (!service || !colorTheme) return (
        <div className="pt-32 text-center text-slate-500 min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <Link href="/services" className="text-purple-600 hover:underline">Return to Services</Link>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen font-sans selection:bg-gray-200 selection:text-gray-900 overflow-hidden">
            {/* Dynamic Background Blob */}
            <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full blur-[100px] opacity-20 pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 bg-gradient-to-br ${colorTheme.from} ${colorTheme.to}`}></div>

            <div className="pt-32 pb-20 container mx-auto px-6 relative z-10">
                <Link href="/services" className={`inline-flex items-center ${colorTheme.text} hover:opacity-80 mb-8 transition-opacity text-sm font-bold tracking-wide uppercase`}>
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white p-10 md:p-14 relative overflow-hidden">
                            {/* Decorative Top Gradient */}
                            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${colorTheme.from} ${colorTheme.to}`}></div>

                            <span className={`inline-block py-1.5 px-4 ${colorTheme.bg} ${colorTheme.text} rounded-full text-xs font-bold tracking-widest uppercase mb-8`}>
                                Service Detail
                            </span>

                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                                {service.title}
                            </h1>

                            <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed font-light">
                                <p className="text-xl mb-6 text-slate-800 font-medium">
                                    {service.shortDescription}
                                </p>
                                <p>
                                    {service.longDescription || "We provide comprehensive solutions tailored to your specific needs. Our team of experts ensures that every project is delivered with the highest quality standards, using the latest technologies and methodologies to drive your business forward."}
                                </p>
                            </div>

                            {/* Features List */}
                            <div className={`mt-12 p-8 ${colorTheme.bg} rounded-3xl border ${colorTheme.border}`}>
                                <h3 className="text-2xl font-bold mb-6 text-slate-900">Key Capabilities</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.features && service.features.length > 0 ? service.features.map((f: string, i: number) => (
                                        <div key={i} className="flex items-start">
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 shadow-sm ${colorTheme.checkText}`}>
                                                <FaCheck size={10} />
                                            </div>
                                            <span className="text-slate-700 font-medium">{f}</span>
                                        </div>
                                    )) : (
                                        // Default features if none exist in mock data
                                        ["Custom Strategy", "Agile Development", "24/7 Support", "Scalable Architecture"].map((f, i) => (
                                            <div key={i} className="flex items-start">
                                                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 mt-1 shadow-sm ${colorTheme.checkText}`}>
                                                    <FaCheck size={10} />
                                                </div>
                                                <span className="text-slate-700 font-medium">{f}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-4 space-y-8 sticky top-32">
                        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colorTheme.from} ${colorTheme.to} rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2`}></div>

                            <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to start?</h3>
                            <p className="text-slate-300 mb-8 font-light relative z-10">
                                Let's collaborate to bring your vision to life with our {service.title} expertise.
                            </p>
                            <Link href="/contact" className={`block w-full py-4 rounded-full text-center font-bold text-slate-900 bg-white hover:scale-105 transition-transform shadow-lg relative z-10`}>
                                Get a Quote
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg">
                            <h4 className="font-bold text-slate-900 mb-2">Need Help?</h4>
                            <p className="text-slate-500 text-sm mb-4">
                                Not sure if this is the right service for you?
                            </p>
                            <Link href="/contact" className={`text-sm font-bold ${colorTheme.text} hover:underline`}>
                                Contact Support →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

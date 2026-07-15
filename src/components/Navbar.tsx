
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
    _id: string;
    title: string;
    slug: string;
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [isServiceHover, setIsServiceHover] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch services for submenu
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error('Failed to fetch services', error);
            }
        };
        fetchServices();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        // Services will be handled separately
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    const navClass = scrolled
        ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-black/50 text-white'
        : 'bg-transparent py-6 text-white';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    NeuApex
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>
                        Home
                    </Link>

                    <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}>
                        About
                    </Link>

                    {/* Service Submenu */}
                    <div
                        className="relative h-full flex items-center"
                        onMouseEnter={() => setIsServiceHover(true)}
                        onMouseLeave={() => setIsServiceHover(false)}
                    >
                        <Link
                            href="/services"
                            className={`flex items-center text-sm font-medium transition-colors py-4 ${pathname.startsWith('/services') ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
                        >
                            Services <FaChevronDown className="ml-1 text-xs" />
                        </Link>

                        {isServiceHover && (
                            <div
                                className="absolute left-0 top-full pt-2 w-56"
                                onMouseEnter={() => setIsServiceHover(true)}
                                  onMouseLeave={() => setIsServiceHover(false)}
                            >
                                <div className="bg-black/90 backdrop-blur-xl border border-white/10 text-white rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="py-2">
                                        {services.length > 0 ? (
                                            services.map((service) => (
                                                <Link
                                                    key={service._id}
                                                    href={`/services/${service.slug}`}
                                                    className="block px-4 py-2 text-sm transition-colors text-slate-300 hover:bg-white/5 hover:text-cyan-400"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-slate-400">Loading services...</div>
                                        )}
                                        <div className="mt-2 pt-2 border-t border-white/10">
                                            <Link href="/services" className="block px-4 py-2 text-sm font-semibold text-center text-cyan-400 hover:text-cyan-300">
                                                View All Services
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {navLinks.filter(l => !['Home', 'About', 'Services'].includes(l.name)).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${pathname === link.href ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link href="/contact" className="px-5 py-2 rounded-full text-sm font-semibold transition-all bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white hover:brightness-110 shadow-lg shadow-blue-500/25">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full h-screen overflow-y-auto pb-20 bg-black/95 backdrop-blur-xl border-t border-white/10 text-white">
                    <div className="flex flex-col p-6 space-y-4">
                        <Link href="/" className="text-lg text-slate-200 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/about" className="text-lg text-slate-200 hover:text-cyan-400" onClick={() => setIsOpen(false)}>About</Link>

                        <div className="space-y-2">
                            <Link href="/services" className="text-lg font-bold text-cyan-400" onClick={() => setIsOpen(false)}>Services</Link>
                            <div className="pl-4 border-l-2 border-white/10 space-y-2 mt-2">
                                {services.map((service) => (
                                    <Link
                                        key={service._id}
                                        href={`/services/${service.slug}`}
                                        className="block text-slate-400 hover:text-cyan-400"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {service.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {navLinks.filter(l => !['Home', 'About', 'Services'].includes(l.name)).map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg text-slate-200 hover:text-cyan-400"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="px-5 py-3 text-center rounded-lg font-semibold mt-4 block bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}


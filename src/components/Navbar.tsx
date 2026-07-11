
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

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    NeuApex
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="/" className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === '/' ? 'text-blue-600' : 'text-slate-600'}`}>
                        Home
                    </Link>

                    <Link href="/about" className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === '/about' ? 'text-blue-600' : 'text-slate-600'}`}>
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
                            className={`flex items-center text-sm font-medium transition-colors hover:text-blue-600 py-4 ${pathname.startsWith('/services') ? 'text-blue-600' : 'text-slate-600'}`}
                        >
                            Services <FaChevronDown className="ml-1 text-xs" />
                        </Link>

                        {isServiceHover && (
                            <div
                                className="absolute left-0 top-full pt-2 w-56"
                                onMouseEnter={() => setIsServiceHover(true)}
                                onMouseLeave={() => setIsServiceHover(false)}
                            >
                                <div className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="py-2">
                                        {services.length > 0 ? (
                                            services.map((service) => (
                                                <Link
                                                    key={service._id}
                                                    href={`/services/${service.slug}`}
                                                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                                                >
                                                    {service.title}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-slate-400">Loading services...</div>
                                        )}
                                        <div className="border-t border-slate-100 mt-2 pt-2">
                                            <Link href="/services" className="block px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-semibold text-center">
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
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${pathname === link.href ? 'text-blue-600' : 'text-slate-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link href="/contact" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-semibold transition-all hover:shadow-lg shadow-slate-200">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 h-screen overflow-y-auto pb-20">
                    <div className="flex flex-col p-6 space-y-4">
                        <Link href="/" className="text-slate-800 text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/about" className="text-slate-800 text-lg hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>

                        <div className="space-y-2">
                            <Link href="/services" className="text-blue-600 text-lg font-bold" onClick={() => setIsOpen(false)}>Services</Link>
                            <div className="pl-4 border-l-2 border-slate-200 space-y-2 mt-2">
                                {services.map((service) => (
                                    <Link
                                        key={service._id}
                                        href={`/services/${service.slug}`}
                                        className="block text-slate-500 hover:text-blue-600"
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
                                className="text-slate-800 text-lg hover:text-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="px-5 py-3 bg-blue-600 text-center text-white rounded-lg font-semibold mt-4"
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


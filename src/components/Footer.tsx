
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

export default function Footer() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Website Development',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('/api/contact', {
                name: formData.name,
                email: formData.email,
                subject: `Homepage Lead: Interested in ${formData.service}`,
                serviceInterest: formData.service,
                message: formData.message
            });
            setStatus('success');
            setFormData({ name: '', email: '', service: 'Website Development', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Footer contact submit error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    if (isHome) {
        return (
            <footer className="relative bg-slate-950 text-slate-300 pt-24 pb-12 overflow-hidden border-t border-white/5">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-marketing-purple/15 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-devops-blue/15 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Header + Form Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-start">
                        {/* Call to Action & Info */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40 mb-4">
                                    GET IN TOUCH
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-6">
                                    Let&apos;s Build <br />
                                    Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-marketing-purple">Legendary</span>.
                                </h2>
                                <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
                                    Have a vision? We scale your code, reach, and revenue. Let&apos;s talk about your next project.
                                </p>
                            </div>

                            <div className="space-y-4 text-slate-300 font-light">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                                        <FaEnvelope size={16} />
                                    </div>
                                    <span>contact@neuapex.com</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-marketing-pink">
                                        <FaMapMarkerAlt size={16} />
                                    </div>
                                    <span>B-201 Sector 63, Noida, Uttar Pradesh - 201301</span>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex space-x-4 pt-2">
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-marketing-purple/20 hover:text-marketing-purple border border-white/10 hover:border-marketing-purple/50 flex items-center justify-center transition-all duration-300"><FaFacebook size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-devops-blue/20 hover:text-devops-blue border border-white/10 hover:border-devops-blue/50 flex items-center justify-center transition-all duration-300"><FaTwitter size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-marketing-pink/20 hover:text-marketing-pink border border-white/10 hover:border-marketing-pink/50 flex items-center justify-center transition-all duration-300"><FaInstagram size={18} /></a>
                                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300"><FaLinkedin size={18} /></a>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <div className="lg:col-span-7 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl shadow-black/80">
                            {/* Accent Glow inside card */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div>
                                        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Select Service</label>
                                        <select
                                            value={formData.service}
                                            onChange={e => setFormData({...formData, service: e.target.value})}
                                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 transition-all outline-none text-sm"
                                        >
                                            <option value="Website Development">Website Development (Cyan)</option>
                                            <option value="Digital Marketing">Digital Marketing (Purple)</option>
                                            <option value="DevOps">DevOps (Blue)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Your Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={e => setFormData({...formData, message: e.target.value})}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm resize-none"
                                        placeholder="Describe your project, goals, or infrastructure needs..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full relative overflow-hidden group py-4 px-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-marketing-purple hover:brightness-110 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    {status === 'loading' ? (
                                        <span>Sending Inquiry...</span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <FaPaperPlane className="text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <p className="text-emerald-400 text-center text-sm font-semibold mt-2">
                                        ✓ Message sent successfully! We will contact you shortly.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-rose-400 text-center text-sm font-semibold mt-2">
                                        ✗ Failed to send message. Please try again.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Bottom footer links */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                        <p>&copy; {new Date().getFullYear()} NeuApex Digital. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    // Default Dark Mode Footer for other pages (no contact form)
    return (
        <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">NeuApex</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            We craft digital experiences that drive growth. Your partner for web development, design, and digital marketing.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><FaFacebook size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-devops-blue transition-colors"><FaTwitter size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-marketing-pink transition-colors"><FaInstagram size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors"><FaLinkedin size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Company</h3>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Services</h3>
                        <ul className="space-y-3 text-slate-400 text-sm">
                            <li><Link href="/services/web-development" className="hover:text-white transition-colors">Web Development</Link></li>
                            <li><Link href="/services/digital-marketing" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                            <li><Link href="/services/cloud-solutions" className="hover:text-white transition-colors">DevOps &amp; Infrastructure</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6">Contact</h3>
                        <ul className="space-y-3 text-slate-400 text-sm font-light">
                            <li>contact@neuapex.com</li>
                            <li>B-201 Sector 63, Noida,<br />Uttar Pradesh - 201301</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} NeuApex Digital. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

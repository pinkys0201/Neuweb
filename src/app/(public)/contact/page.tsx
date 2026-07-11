'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceInterest: 'General Inquiry',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/contact', formData);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '', serviceInterest: 'General Inquiry' });
        } catch (error) {
            toast.error('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen overflow-hidden relative">
            {/* Background Orbs */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 relative z-10">
                    <span className="inline-block py-1 px-3 border border-purple-200 rounded-full text-purple-600 text-sm font-semibold tracking-wider mb-4 bg-white shadow-sm">
                        CONTACT US
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x">Conversation</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
                        Ready to start your project? Get in touch with us today.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-slate-900">Get In Touch</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed text-lg font-light">
                                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white hover:shadow-lg hover:border-cyan-100 transition-all duration-300 group">
                                <div className="bg-cyan-50 p-4 rounded-xl text-cyan-600 group-hover:scale-110 transition-transform"><FaPhone size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Phone</h3>
                                    <p className="text-slate-500">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white hover:shadow-lg hover:border-purple-100 transition-all duration-300 group">
                                <div className="bg-purple-50 p-4 rounded-xl text-purple-600 group-hover:scale-110 transition-transform"><FaEnvelope size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Email</h3>
                                    <p className="text-slate-500">contact@neuapex.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white hover:shadow-lg hover:border-pink-100 transition-all duration-300 group">
                                <div className="bg-pink-50 p-4 rounded-xl text-pink-600 group-hover:scale-110 transition-transform"><FaMapMarkerAlt size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Office</h3>
                                    <p className="text-slate-500">123 Digital Ave, Suite 100<br />New York, NY 10001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-bl-full opacity-30 pointer-events-none blur-2xl"></div>
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-500 mb-2 text-sm font-medium">Your Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none" required placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-slate-500 mb-2 text-sm font-medium">Email Address</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none" required placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-500 mb-2 text-sm font-medium">Phone Number</label>
                                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div>
                                    <label className="block text-slate-500 mb-2 text-sm font-medium">Subject</label>
                                    <input type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none" placeholder="Project Inquiry" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-500 mb-2 text-sm font-medium">Interested In</label>
                                <div className="relative">
                                    <select value={formData.serviceInterest} onChange={e => setFormData({ ...formData, serviceInterest: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Web Development</option>
                                        <option>Digital Marketing</option>
                                        <option>SEO Services</option>
                                        <option>Branding</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-500 mb-2 text-sm font-medium">Message</label>
                                <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all h-32 outline-none resize-none" required placeholder="Tell us about your project..."></textarea>
                            </div>

                            <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 relative overflow-hidden group">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative z-10">{loading ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

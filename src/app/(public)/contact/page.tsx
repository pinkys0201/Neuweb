'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaUser, 
    FaEnvelope, 
    FaBuilding, 
    FaPhone, 
    FaArrowRight, 
    FaArrowLeft, 
    FaCheck, 
    FaQuestionCircle, 
    FaRegComments,
    FaArrowDown
} from 'react-icons/fa';

interface FAQ {
    question: string;
    answer: string;
}

const faqData: Record<string, FAQ[]> = {
    'Website Development': [
        {
            question: "What frameworks do you build on?",
            answer: "We engineer primarily on Next.js, React, TypeScript, and Node.js for custom backend API architectures, ensuring high-fidelity speed and security."
        },
        {
            question: "Do you optimize for Google Core Web Vitals?",
            answer: "Yes, all our platforms score 95+ on Lighthouse audits. We use progressive loading, image compression, and server-side components out-of-the-box."
        },
        {
            question: "Can you build custom headless e-commerce?",
            answer: "Absolutely. We build headless Shopify setups and customized Stripe payment checkout frameworks for fast and secure transactions."
        }
    ],
    'Digital Marketing': [
        {
            question: "How do you track campaign conversion ROI?",
            answer: "We set up direct API logs, Google Ads scripts, and landing page cohorts to track exactly which campaigns turn into paid acquisitions, not just clicks."
        },
        {
            question: "What channels do you specialize in?",
            answer: "We focus on intent-based Google Search Ads (PPC), technical authority SEO optimizations, paid social channels, and conversion funnel audits."
        },
        {
            question: "Do you build programmatic SEO landing pages?",
            answer: "Yes, we build programmatic engines that dynamically generate thousands of fast-loading keyword targets to scale organic search traffic."
        }
    ],
    'DevOps': [
        {
            question: "Which cloud providers do you support?",
            answer: "We specialize in AWS and Google Cloud Platform (GCP) configurations, deploying robust virtual private networks (VPCs) and cloud node monitors."
        },
        {
            question: "How do you achieve 99.99% uptime?",
            answer: "We configure Docker containers, auto-scaling groups, load balancer routes, and Kubernetes microservice clusters with failover structures."
        },
        {
            question: "Can you help automate our deployment pipelines?",
            answer: "Yes, we build automated CI/CD setups (using GitHub Actions or GitLab) that test, compile, and deploy node packages within seconds."
        }
    ],
    'General Inquiry': [
        {
            question: "How long does a typical engagement take?",
            answer: "Web development cycles range from 6 to 10 weeks. DevOps audits and growth marketing retainers operate on ongoing monthly sprint models."
        },
        {
            question: "Do you collaborate with early-stage startups?",
            answer: "Yes, we optimize architectures and paid channels specifically for venture-backed and bootstrapped tech startups looking to scale."
        },
        {
            question: "How do we get started?",
            answer: "Fill out this multi-step lead wizard. Our engineering and strategy directors will review your scope and book a diagnostics review call."
        }
    ]
};

export default function ContactPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceInterest: 'Website Development',
        budget: '$10k - $25k',
        timeline: '1 - 2 Months',
        message: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const activeFAQs = faqData[formData.serviceInterest] || faqData['General Inquiry'];

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            await axios.post('/api/contact', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: `Multi-Step Wizard Inquiry: Interested in ${formData.serviceInterest}`,
                serviceInterest: formData.serviceInterest,
                message: `[Budget: ${formData.budget} | Timeline: ${formData.timeline}] - ${formData.message} (Company: ${formData.company})`
            });
            setSuccess(true);
            setStep(4); // Thank you step
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-950 text-slate-100 min-h-screen pt-36 pb-24 font-sans relative overflow-hidden">
            {/* Background ambient orbs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-marketing-purple/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] bg-devops-blue/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                
                {/* Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 rounded-full border border-cyan-800/40">
                        DIAGNOSTICS &amp; DISCOVERY
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
                        Let&apos;s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple">Epic</span>.
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Dynamic FAQs */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl relative">
                            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-4">
                                {formData.serviceInterest} FAQs
                            </span>
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                                <FaQuestionCircle className="mr-3 text-cyan-400" /> Frequently Asked
                            </h3>

                            <div className="space-y-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={formData.serviceInterest}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-6"
                                    >
                                        {activeFAQs.map((faq, i) => (
                                            <div key={i} className="space-y-2 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                                                <h4 className="font-bold text-white text-sm">{faq.question}</h4>
                                                <p className="text-slate-400 text-xs font-light leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Sub-card: Contact information */}
                        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                <FaRegComments />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct support line</h4>
                                <p className="text-slate-400 text-xs font-light">Prefer email? Message us at contact@neuapex.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Multi-Step Form Wizard */}
                    <div className="lg:col-span-7">
                        <div className="bg-slate-900/30 border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                            
                            {/* Step Indicator Progress Bar */}
                            <div className="w-full bg-white/5 h-1 rounded-full mb-8 flex justify-between relative">
                                <div 
                                    className="absolute top-0 left-0 bg-gradient-to-r from-webdev-cyan via-devops-blue to-marketing-purple h-full rounded-full transition-all duration-300"
                                    style={{ width: `${(step - 1) * 33.33}%` }}
                                ></div>
                                <div className={`w-3 h-3 rounded-full -mt-1 z-10 transition-colors duration-300 ${step >= 1 ? 'bg-webdev-cyan' : 'bg-slate-800'}`}></div>
                                <div className={`w-3 h-3 rounded-full -mt-1 z-10 transition-colors duration-300 ${step >= 2 ? 'bg-devops-blue' : 'bg-slate-800'}`}></div>
                                <div className={`w-3 h-3 rounded-full -mt-1 z-10 transition-colors duration-300 ${step >= 3 ? 'bg-marketing-purple' : 'bg-slate-800'}`}></div>
                                <div className={`w-3 h-3 rounded-full -mt-1 z-10 transition-colors duration-300 ${step >= 4 ? 'bg-emerald-400' : 'bg-slate-800'}`}></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">Step 1: Introduce Yourself</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Your Name</label>
                                                    <div className="relative">
                                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                        <input 
                                                            type="text" 
                                                            required
                                                            value={formData.name}
                                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
                                                    <div className="relative">
                                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                        <input 
                                                            type="email" 
                                                            required
                                                            value={formData.email}
                                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Company Name</label>
                                                    <div className="relative">
                                                        <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                        <input 
                                                            type="text" 
                                                            value={formData.company}
                                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                                            placeholder="SaaS Corp"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Phone Number</label>
                                                    <div className="relative">
                                                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                                        <input 
                                                            type="tel" 
                                                            value={formData.phone}
                                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm"
                                                            placeholder="+1 (555) 000-0000"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <button 
                                                    type="button" 
                                                    onClick={handleNext}
                                                    disabled={!formData.name || !formData.email}
                                                    className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:scale-105 transition-all active:scale-95 text-sm flex items-center disabled:opacity-50"
                                                >
                                                    Continue <FaArrowRight className="ml-2 text-xs" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">Step 2: Select Your Objective</h3>
                                            <div className="grid grid-cols-1 gap-4">
                                                {[
                                                    { value: 'Website Development', label: 'Website Development (Teal)', desc: 'High-performance React/Next.js platforms and Web Apps' },
                                                    { value: 'Digital Marketing', label: 'Digital Marketing (Pink)', desc: 'Technical SEO, PPC, and paid search scale campaigns' },
                                                    { value: 'DevOps', label: 'DevOps & Infrastructure (Blue)', desc: 'Auto-scaling Kubernetes, cloud migrations, and pipelines' },
                                                    { value: 'General Inquiry', label: 'General / Retainer Strategy', desc: 'Full-suite consultancies or general startup roadmap' }
                                                ].map((opt) => (
                                                    <div 
                                                        key={opt.value}
                                                        onClick={() => setFormData({ ...formData, serviceInterest: opt.value })}
                                                        className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                                                            formData.serviceInterest === opt.value
                                                                ? 'bg-slate-900 border-cyan-400 text-white shadow-lg'
                                                                : 'bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.02]'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-bold text-sm text-white">{opt.label}</h4>
                                                            {formData.serviceInterest === opt.value && <FaCheck className="text-cyan-400 text-xs" />}
                                                        </div>
                                                        <p className="text-xs font-light text-slate-500">{opt.desc}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-between pt-4">
                                                <button 
                                                    type="button" 
                                                    onClick={handlePrev}
                                                    className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 text-sm font-bold flex items-center"
                                                >
                                                    <FaArrowLeft className="mr-2 text-xs" /> Back
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={handleNext}
                                                    className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:scale-105 transition-all active:scale-95 text-sm flex items-center"
                                                >
                                                    Continue <FaArrowRight className="ml-2 text-xs" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold text-white">Step 3: Define the Scope</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Estimated Budget</label>
                                                    <select 
                                                        value={formData.budget}
                                                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 transition-all outline-none text-sm"
                                                    >
                                                        <option>$5k - $10k</option>
                                                        <option>$10k - $25k</option>
                                                        <option>$25k - $50k</option>
                                                        <option>$50k+</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Expected Timeline</label>
                                                    <select 
                                                        value={formData.timeline}
                                                        onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 transition-all outline-none text-sm"
                                                    >
                                                        <option>Immediate (&lt; 1 Month)</option>
                                                        <option>1 - 2 Months</option>
                                                        <option>2 - 4 Months</option>
                                                        <option>Ongoing / Not sure</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Message details</label>
                                                <textarea 
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/35 transition-all outline-none text-sm resize-none"
                                                    placeholder="Briefly describe your objectives, stack needs, or current infrastructure issues..."
                                                ></textarea>
                                            </div>

                                            {error && (
                                                <p className="text-rose-400 text-xs font-semibold text-center">
                                                    ✗ Submission failed. Please try again.
                                                </p>
                                            )}

                                            <div className="flex justify-between pt-4">
                                                <button 
                                                    type="button" 
                                                    onClick={handlePrev}
                                                    className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-slate-300 text-sm font-bold flex items-center"
                                                >
                                                    <FaArrowLeft className="mr-2 text-xs" /> Back
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    disabled={loading || !formData.message}
                                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-marketing-purple hover:brightness-110 text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 text-sm flex items-center disabled:opacity-50"
                                                >
                                                    {loading ? 'Submitting...' : 'Send Strategy Request'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-center py-10 space-y-6"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                                                <FaCheck />
                                            </div>
                                            <h3 className="text-2xl font-black text-white">Strategy Request Received!</h3>
                                            <p className="text-slate-400 text-sm font-light max-w-sm mx-auto leading-relaxed">
                                                Thank you, {formData.name}. Our directors are reviewing your project scope. We will contact you at {formData.email} to set up your diagnostics call.
                                            </p>
                                            <div className="pt-4">
                                                <Link href="/" className="px-6 py-3 bg-white text-slate-950 font-bold rounded-full text-xs hover:scale-105 transition-transform inline-block">
                                                    Return Home
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

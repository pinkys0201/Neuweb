
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-800 pt-20 pb-10 border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">NeuApex</h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            We craft digital experiences that drive growth. Your partner for web development, design, and digital marketing.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-blue-800 transition-colors"><FaLinkedin size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Company</h3>
                        <ul className="space-y-3 text-slate-500 text-sm">
                            <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">Our Services</Link></li>
                            <li><Link href="/portfolio" className="hover:text-blue-600">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Services</h3>
                        <ul className="space-y-3 text-slate-500 text-sm">
                            <li><Link href="/services" className="hover:text-blue-600">Web Development</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">Digital Marketing</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">SEO Optimization</Link></li>
                            <li><Link href="/services" className="hover:text-blue-600">App Design</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-slate-900 font-bold mb-6">Contact</h3>
                        <ul className="space-y-3 text-slate-500 text-sm">
                            <li>contact@neuapex.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>123 Digital Ave, Suite 100<br />New York, NY 10001</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} NeuApex Digital. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-slate-800">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-800">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

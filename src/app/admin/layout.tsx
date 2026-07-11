
'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChartBar, FaServicestack, FaProjectDiagram, FaBlog, FaEnvelope, FaQuoteLeft, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated' && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [status, router, pathname]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (status === 'loading') {
        return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
    }

    if (!session) {
        return null;
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: FaChartBar },
        { name: 'Services', href: '/admin/services', icon: FaServicestack },
        { name: 'Portfolio', href: '/admin/portfolio', icon: FaProjectDiagram },
        { name: 'Blogs', href: '/admin/blog', icon: FaBlog },
        { name: 'Inquiries', href: '/admin/inquiries', icon: FaEnvelope },
        { name: 'Testimonials', href: '/admin/testimonials', icon: FaQuoteLeft },
        { name: 'Settings', href: '/admin/settings', icon: FaCog },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className={`w-64 bg-gray-800 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} fixed md:static z-20 h-full`}>
                <div className="p-6 text-2xl font-bold border-b border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    NeuApex Admin
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className={`flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${pathname.startsWith(item.href) ? 'bg-gray-700 border-l-4 border-blue-500' : ''}`}>
                                    <item.icon className="mr-3" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 font-bold">
                            {session.user?.name?.[0] || 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{session.user?.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{session.user?.role || 'Admin'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors text-sm"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header (Mobile Toggle) */}
                <header className="md:hidden bg-gray-800 p-4 flex justify-between items-center shadow-md">
                    <div className="text-xl font-bold">NeuApex</div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
                        ☰
                    </button>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

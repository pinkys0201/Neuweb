
'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Internal Dashboard</h1>
            <p className="text-gray-400">Welcome back, {session?.user?.name}</p>

            {/* Stats Grid will go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm">Total Leads</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm">Active Projects</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm">Blog Posts</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-gray-400 text-sm">Services</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>
        </div>
    );
}

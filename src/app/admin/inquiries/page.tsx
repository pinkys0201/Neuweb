
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Inquiry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    serviceInterest?: string;
    message: string;
    createdAt: string;
    status: string;
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const res = await axios.get('/api/inquiries');
            setInquiries(res.data);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">Inquiries / Leads</h1>
            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">User Info</th>
                            <th className="px-6 py-3">Interest / Subject</th>
                            <th className="px-6 py-3">Message</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {inquiries.map((inquiry) => (
                            <tr key={inquiry._id} className="hover:bg-gray-750">
                                <td className="px-6 py-4 text-sm whitespace-nowrap">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-white">{inquiry.name}</div>
                                    <div className="text-blue-400 text-sm">{inquiry.email}</div>
                                    {inquiry.phone && <div className="text-gray-500 text-xs mt-1">{inquiry.phone}</div>}
                                </td>
                                <td className="px-6 py-4">
                                    {inquiry.serviceInterest && (
                                        <div className="inline-block px-2 py-0.5 bg-blue-900/50 text-blue-200 text-xs rounded mb-1 border border-blue-800">
                                            {inquiry.serviceInterest}
                                        </div>
                                    )}
                                    <div className="text-white text-sm font-medium">{inquiry.subject || 'No Subject'}</div>
                                </td>
                                <td className="px-6 py-4 text-sm max-w-xs truncate" title={inquiry.message}>{inquiry.message}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${inquiry.status === 'new' ? 'bg-green-600 text-white' : 'bg-gray-600'}`}>
                                        {inquiry.status.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No inquiries yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

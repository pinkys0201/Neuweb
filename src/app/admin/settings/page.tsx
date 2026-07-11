
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        siteName: '',
        contactInfo: { email: '', phone: '', address: '' },
        socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
        seoDefaults: { title: '', description: '', keywords: '' },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('/api/settings');
                if (res.data) {
                    setFormData(prev => ({
                        ...prev,
                        siteName: res.data.siteName || '',
                        contactInfo: { ...prev.contactInfo, ...res.data.contactInfo },
                        socialLinks: { ...prev.socialLinks, ...res.data.socialLinks },
                        seoDefaults: { ...prev.seoDefaults, ...res.data.seoDefaults }
                    }));
                }
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put('/api/settings', formData);
            toast.success('Settings updated');
        } catch (error) {
            toast.error('Failed to update settings');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Website Settings</h1>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 space-y-8">

                {/* General */}
                <div>
                    <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">General</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm">Site Name</label>
                            <input type="text" value={formData.siteName} onChange={e => setFormData({ ...formData, siteName: e.target.value })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">Contact Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm">Email Address</label>
                            <input type="text" value={formData.contactInfo.email} onChange={e => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, email: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Phone Number</label>
                            <input type="text" value={formData.contactInfo.phone} onChange={e => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, phone: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-gray-400 text-sm">Address</label>
                            <input type="text" value={formData.contactInfo.address} onChange={e => setFormData({ ...formData, contactInfo: { ...formData.contactInfo, address: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div>
                    <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">Social Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm">Facebook</label>
                            <input type="text" value={formData.socialLinks.facebook} onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Twitter (X)</label>
                            <input type="text" value={formData.socialLinks.twitter} onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Instagram</label>
                            <input type="text" value={formData.socialLinks.instagram} onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">LinkedIn</label>
                            <input type="text" value={formData.socialLinks.linkedin} onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                    </div>
                </div>

                {/* SEO Defaults */}
                <div>
                    <h2 className="text-xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">SEO Defaults</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm">Default Meta Title</label>
                            <input type="text" value={formData.seoDefaults.title} onChange={e => setFormData({ ...formData, seoDefaults: { ...formData.seoDefaults, title: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1" />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Default Meta Description</label>
                            <textarea value={formData.seoDefaults.description} onChange={e => setFormData({ ...formData, seoDefaults: { ...formData.seoDefaults, description: e.target.value } })} className="w-full bg-gray-900 border border-gray-600 rounded px-4 py-2 text-white mt-1 h-24" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                    Save Settings
                </button>

            </form>
        </div>
    );
}

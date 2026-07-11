'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminCTA() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        bgImage: '',
        buttonText: '',
        buttonLink: '',
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get('/api/cta');
            if (res.data) setFormData(res.data);
        } catch (error) {
            console.error('Failed to fetch CTA data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await axios.post('/api/cta', formData);
            setMessage('CTA updated successfully!');
        } catch (error) {
            setMessage('Failed to update.');
        }
    };

    if (loading) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="p-8 text-white max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Manage Call to Action</h1>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-600' : 'bg-red-600'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl border border-gray-800">
                <div>
                    <label className="block text-gray-400 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Subtitle</label>
                    <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Background Image URL</label>
                    <input
                        type="text"
                        name="bgImage"
                        value={formData.bgImage}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Button Text</label>
                        <input
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Button Link</label>
                        <input
                            type="text"
                            name="buttonLink"
                            value={formData.buttonLink}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded transition-colors"
                >
                    Update CTA
                </button>
            </form>
        </div>
    );
}

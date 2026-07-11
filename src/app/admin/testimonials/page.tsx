
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    company: string;
    message: string;
    image: string;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        company: '',
        message: '',
        image: '',
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await axios.get('/api/testimonials');
            setTestimonials(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/testimonials', formData);
            toast.success('Testimonial added');
            fetchTestimonials();
            closeModal();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/testimonials/${id}`);
            toast.success('Testimonial deleted');
            fetchTestimonials();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', role: '', company: '', message: '', image: '' });
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                    <FaPlus className="mr-2" /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                    <div key={t._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative">
                        <button onClick={() => handleDelete(t._id)} className="absolute top-4 right-4 text-red-500 hover:text-red-400"><FaTrash /></button>
                        <p className="text-gray-300 italic mb-4">&quot;{t.message}&quot;</p>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 font-bold text-white">
                                {t.image ? <img src={t.image} alt={t.name} className="w-full h-full rounded-full object-cover" /> : t.name[0]}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                <p className="text-xs text-gray-500">{t.role} @ {t.company}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-xl w-full max-w-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-6">New Testimonial</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Role (e.g. CEO)" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" />
                            <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" />
                            <textarea placeholder="Message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white h-24" required />
                            <div className="flex justify-end space-x-3 mt-4">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

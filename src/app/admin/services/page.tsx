
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Service {
    _id: string;
    title: string;
    slug: string;
    shortDescription: string;
    icon: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        shortDescription: '',
        icon: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('/api/services');
            setServices(res.data);
        } catch (error) {
            toast.error('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingService) {
                await axios.put(`/api/services/${editingService._id}`, formData);
                toast.success('Service updated');
            } else {
                await axios.post('/api/services', formData);
                toast.success('Service created');
            }
            fetchServices();
            closeModal();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/services/${id}`);
            toast.success('Service deleted');
            fetchServices();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const openModal = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                slug: service.slug,
                shortDescription: service.shortDescription,
                icon: service.icon,
            });
        } else {
            setEditingService(null);
            setFormData({ title: '', slug: '', shortDescription: '', icon: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Services</h1>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center"
                >
                    <FaPlus className="mr-2" /> Add New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-400 mb-4">{service.shortDescription}</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => openModal(service)}
                                className="p-2 bg-yellow-600 rounded text-white hover:bg-yellow-700"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(service._id)}
                                className="p-2 bg-red-600 rounded text-white hover:bg-red-700"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-xl w-full max-w-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingService ? 'Edit Service' : 'New Service'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Slug (e.g., seo-optimization)"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                                required
                            />
                            <textarea
                                placeholder="Short Description"
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Icon Class or URL"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                            />
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

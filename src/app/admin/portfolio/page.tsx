
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Project {
    _id: string;
    title: string;
    slug: string;
    category: string;
    client: string;
    image: string;
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        client: '',
        image: '',
        description: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/portfolio');
            setProjects(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await axios.put(`/api/portfolio/${editingProject._id}`, formData);
                toast.success('Project updated');
            } else {
                await axios.post('/api/portfolio', formData);
                toast.success('Project created');
            }
            fetchProjects();
            closeModal();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/portfolio/${id}`);
            toast.success('Project deleted');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const openModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                slug: project.slug,
                category: project.category,
                client: project.client,
                image: project.image,
                description: '', // Load full details if needed via another call, simplifying for list view
            });
        } else {
            setEditingProject(null);
            setFormData({ title: '', slug: '', category: '', client: '', image: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Portfolio</h1>
                <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                    <FaPlus className="mr-2" /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        {project.image && <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-blue-400 mb-2 uppercase tracking-wider">{project.category}</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button onClick={() => openModal(project)} className="p-2 bg-yellow-600 rounded text-white hover:bg-yellow-700"><FaEdit /></button>
                            <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-600 rounded text-white hover:bg-red-700"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-gray-900 p-8 rounded-xl w-full max-w-2xl border border-gray-700 my-10">
                        <h2 className="text-2xl font-bold text-white mb-6">{editingProject ? 'Edit Project' : 'New Project'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Client" value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" />
                            <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white md:col-span-2" required />
                            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white md:col-span-2 h-32" />
                            <div className="flex justify-end space-x-3 mt-4 md:col-span-2">
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


'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

interface Blog {
    _id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
}

export default function BlogPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        content: '',
        image: '',
        published: false,
    });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('/api/blogs');
            setBlogs(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingBlog) {
                await axios.put(`/api/blogs/${editingBlog._id}`, formData);
                toast.success('Blog updated');
            } else {
                await axios.post('/api/blogs', formData);
                toast.success('Blog created');
            }
            fetchBlogs();
            closeModal();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/blogs/${id}`);
            toast.success('Blog deleted');
            fetchBlogs();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const openModal = (blog?: Blog) => {
        if (blog) {
            setEditingBlog(blog);
            // For editing, ideally fetch full details including content
            // Simulating loading data from list for now, realistically content handles big data
            setFormData({
                title: blog.title,
                slug: blog.slug,
                category: blog.category,
                content: '', // Fetch real content if needed, or assume list has it
                image: '',
                published: blog.published,
            });
        } else {
            setEditingBlog(null);
            setFormData({ title: '', slug: '', category: '', content: '', image: '', published: false });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Blogs</h1>
                <button onClick={() => openModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                    <FaPlus className="mr-2" /> Write Post
                </button>
            </div>

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                            <div className="flex space-x-2 text-sm text-gray-400 mt-1">
                                <span>{blog.category}</span>
                                <span>•</span>
                                <span className={blog.published ? 'text-green-400' : 'text-yellow-400'}>
                                    {blog.published ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => openModal(blog)} className="p-2 bg-yellow-600 rounded text-white hover:bg-yellow-700"><FaEdit /></button>
                            <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-600 rounded text-white hover:bg-red-700"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto">
                    <div className="bg-gray-900 p-8 rounded-xl w-full max-w-4xl border border-gray-700 my-10">
                        <h2 className="text-2xl font-bold text-white mb-6">{editingBlog ? 'Edit Post' : 'New Post'}</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Slug" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" required />
                            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" />
                            <input type="text" placeholder="Image URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white" />

                            <div className="md:col-span-2">
                                <label className="block text-gray-400 mb-2">Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white h-64 font-mono"
                                    placeholder="# Markdown supported..."
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                    className="mr-2 w-5 h-5"
                                />
                                <label htmlFor="published" className="text-white">Publish Immediately</label>
                            </div>

                            <div className="flex justify-end space-x-3 mt-4 md:col-span-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

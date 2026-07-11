
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.slug) {
            axios.get('/api/portfolio').then(res => {
                const found = res.data.find((p: any) => p.slug === params.slug);
                setProject(found);
                setLoading(false);
            });
        }
    }, [params?.slug]);

    if (loading) return <div className="pt-32 text-center">Loading...</div>;
    if (!project) return <div className="pt-32 text-center">Project not found</div>;

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <div className="mb-10">
                <Link href="/portfolio" className="text-gray-400 hover:text-white mb-4 block">&larr; Back to Portfolio</Link>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
                <p className="text-blue-500 text-xl font-semibold mb-8">{project.category}</p>

                {project.image && (
                    <img src={project.image} alt={project.title} className="w-full rounded-2xl mb-12 shadow-2xl border border-gray-800" />
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4">About the Project</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
                        {project.description || "No description available."}
                    </p>
                </div>
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 h-fit">
                    <h4 className="text-white font-bold mb-4 border-b border-gray-700 pb-2">Project Details</h4>
                    <div className="space-y-4 text-sm">
                        <div>
                            <span className="text-gray-500 block">Client</span>
                            <span className="text-white font-medium">{project.client || "N/A"}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Date</span>
                            <span className="text-white font-medium">{project.completionDate ? new Date(project.completionDate).toLocaleDateString() : "N/A"}</span>
                        </div>
                        {project.technologies && project.technologies.length > 0 && (
                            <div>
                                <span className="text-gray-500 block mb-1">Technologies</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((t: string) => (
                                        <span key={t} className="bg-gray-800 border border-gray-700 px-2 py-1 rounded text-xs text-blue-400">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Live Link if available */}
                </div>
            </div>
        </div>
    );
}

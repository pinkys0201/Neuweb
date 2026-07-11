
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BlogPostPage() {
    const params = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.slug) {
            axios.get('/api/blogs').then(res => {
                const found = res.data.find((b: any) => b.slug === params.slug);
                setBlog(found);
                setLoading(false);
            });
        }
    }, [params?.slug]);

    if (loading) return <div className="pt-32 text-center text-slate-500">Loading...</div>;
    if (!blog) return <div className="pt-32 text-center text-slate-500">Article not found</div>;

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
                    Back to Blog
                </Link>

                <div className="mb-10 text-center">
                    <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        {blog.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{blog.title}</h1>
                    <div className="flex items-center justify-center text-slate-500 text-sm space-x-6 font-medium">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            {blog.views || 0} Views
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="w-full h-96 bg-slate-100 rounded-3xl mb-12 flex items-center justify-center text-slate-400 overflow-hidden shadow-lg shadow-slate-200/50">
                    <span className="font-light text-lg">Featured Image Placeholder</span>
                </div>

                <article className="prose prose-lg prose-slate max-w-none">
                    <div className="whitespace-pre-line text-slate-700 font-light leading-relaxed">
                        {blog.content}
                    </div>
                </article>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';

interface Blog {
    _id?: string;
    title: string;
    slug: string;
    category?: string;
    image?: string;
    content: string;
    excerpt?: string;
}

interface BlogClientProps {
    blogs: Blog[];
}

export default function BlogClient({ blogs }: BlogClientProps) {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 relative z-10">
                    <span className="inline-block py-1 px-3 border border-pink-200 rounded-full text-pink-600 text-sm font-semibold tracking-wider mb-4 bg-white shadow-sm">
                        LATEST INSIGHTS
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Blog</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Insights, thoughts, and trends from the digital world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <Link key={blog._id || i} href={`/blog/${blog.slug}`} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden bg-slate-200">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 text-slate-400 flex items-center justify-center">Article Image</div>
                                )}
                                {blog.category && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {blog.category}
                                    </div>
                                )}
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-2">{blog.title}</h3>
                                <p className="text-slate-500 mb-6 line-clamp-3 font-light leading-relaxed flex-1">
                                    {blog.excerpt || blog.content.replace(/<[^>]*>?/gm, '')}
                                </p>
                                <div className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-900">
                                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {blogs.length === 0 && (
                        <div className="col-span-3 text-center text-slate-500 py-10">No articles published yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

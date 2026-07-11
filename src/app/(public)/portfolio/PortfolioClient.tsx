'use client';

import Link from 'next/link';

interface Project {
    _id?: string;
    title: string;
    slug: string;
    category: string;
    image: string;
}

interface PortfolioClientProps {
    projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 relative z-10">
                    <span className="inline-block py-1 px-3 border border-pink-200 rounded-full text-pink-600 text-sm font-semibold tracking-wider mb-4 bg-white/80 backdrop-blur-sm shadow-sm">
                        OUR WORK
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">Portfolio</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                        Showcasing some of our best work. We take pride in delivering results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, i) => (
                        <Link key={project._id || i} href={`/portfolio/${project.slug}`} className="group block relative">
                            <div className="relative overflow-hidden rounded-[2.5rem] mb-6 bg-slate-200 aspect-video shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-slate-100">
                                {project.image ? (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-light text-lg">No Image</div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <span className="text-white font-bold text-lg border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full self-start transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">View Project</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-pink-600 transition-colors ml-2">{project.title}</h3>
                            <p className="text-slate-500 uppercase text-xs font-bold tracking-widest ml-2">{project.category}</p>
                        </Link>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-2 text-center text-slate-500 py-10">No projects to display.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

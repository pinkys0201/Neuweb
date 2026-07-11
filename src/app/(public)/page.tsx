'use client';

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaCode, FaBullhorn, FaMobileAlt, FaLayerGroup } from 'react-icons/fa';
import ThreeBackground from '@/components/ThreeBackground';
import { heroData, aboutData, ctaData, servicesData, testimonialsData, blogsData } from '@/lib/mockData';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Use mock data directly
  const hero = heroData;
  const about = aboutData;
  const cta = ctaData;
  const services = servicesData;
  const testimonials = testimonialsData;
  const blogs = blogsData;

  // Color palette for services
  const serviceColors = [
    { from: 'from-pink-500', to: 'to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600', border: 'group-hover:border-pink-500', shadow: 'hover:shadow-pink-200' },
    { from: 'from-cyan-500', to: 'to-blue-500', bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'group-hover:border-cyan-500', shadow: 'hover:shadow-cyan-200' },
    { from: 'from-purple-500', to: 'to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600', border: 'group-hover:border-purple-500', shadow: 'hover:shadow-purple-200' },
    { from: 'from-orange-500', to: 'to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600', border: 'group-hover:border-orange-500', shadow: 'hover:shadow-orange-200' },
    { from: 'from-emerald-500', to: 'to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'group-hover:border-emerald-500', shadow: 'hover:shadow-emerald-200' },
    { from: 'from-violet-500', to: 'to-fuchsia-500', bg: 'bg-violet-50', text: 'text-violet-600', border: 'group-hover:border-violet-500', shadow: 'hover:shadow-violet-200' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(heroTextRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
      });

      // Services Parallax
      const servicesEls = gsap.utils.toArray('.service-card') as HTMLElement[];
      if (servicesEls.length) {
        gsap.from(servicesEls, {
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%', // Trigger slightly earlier
            toggleActions: 'play none none none', // Play once and DO NOT reverse/hide
          },
          y: 50, // Reduced movement distance
          opacity: 0,
          duration: 0.8, // Faster animation
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'opacity,transform' // Ensure clean state after animation
        });
      }

      // Stats Counter Animation
      const stats = gsap.utils.toArray('.stat-item');
      if (stats.length) {
        stats.forEach((stat: any) => {
          gsap.from(stat, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
          });
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []); // Run once on mount

  return (
    <div ref={mainRef} className="bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-pink-100 selection:text-pink-900">

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {hero.bgImage ? (
          <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${hero.bgImage})` }}>
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
          </div>
        ) : (
          <>
            <ThreeBackground />
            {/* Vibrant Gradients Overlays */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-cyan-400/30 to-blue-500/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        )}

        <div ref={heroTextRef} className="container mx-auto px-6 relative z-20 text-center">
          <span className="inline-block py-1 px-4 border border-white/50 rounded-full text-slate-800 text-sm font-bold tracking-widest mb-8 bg-white/40 backdrop-blur-md shadow-lg bg-gradient-to-r from-pink-50 to-blue-50">
            AWARD WINNING AGENCY
          </span>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
            {hero.title || <>BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-gradient-x">DIGITAL</span></>}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            {hero.subtitle || 'NeuApex crafts award-winning digital experiences that merge art, technology, and strategy.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href={hero.ctaLink || "/contact"} className="group relative px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">{hero.ctaText || 'Start Project'}</span>
            </Link>
            <Link href="/portfolio" className="px-10 py-4 border-2 border-slate-200 bg-white/80 backdrop-blur-md text-slate-900 rounded-full font-bold text-lg hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
              View Works
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </section>

      {/* About Section (New Parallax Layout) */}
      <section className="py-32 relative z-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-pink-200 via-purple-200 to-cyan-200 rounded-[2.5rem] -z-10 transform rotate-3 blur-sm"></div>
            {about.image ? (
              <img src={about.image} alt="About Us" className="rounded-3xl shadow-2xl w-full object-cover h-[600px] transform hover:scale-[1.02] transition-transform duration-700" />
            ) : (
              <div className="bg-slate-100 rounded-3xl h-[600px] w-full flex items-center justify-center text-slate-300 shadow-inner">About Image</div>
            )}
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 bg-white/90 backdrop-blur p-8 rounded-3xl shadow-2xl border border-white max-w-xs hidden lg:block">
              <p className="font-black text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">10+</p>
              <p className="text-slate-600 text-sm font-semibold uppercase tracking-wide">Years of Innovation</p>
            </div>
          </div>
          <div>
            <span className="text-purple-600 font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
              {about.title || 'We Define the Future of Digital.'}
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              {about.content ? (
                <div dangerouslySetInnerHTML={{ __html: about.content }} />
              ) : (
                <>
                  <p>Neu Apex is a results-driven Digital Marketing, Advertising, and Website Development IT company dedicated to helping brands grow, scale, and dominate the digital space. We blend strategy, creativity, and cutting-edge technology to deliver powerful digital experiences that convert visitors into loyal customers.</p>
                  <p>From startups to established enterprises, we partner with businesses to build strong online identities, generate qualified leads, and drive measurable growth.</p>
                </>
              )}
            </div>
            <div className="mt-12">
              <Link href="/about" className="text-slate-900 font-bold text-lg hover:text-purple-600 transition-colors inline-flex items-center group border-b-2 border-slate-200 hover:border-purple-600 pb-1">
                More About Us
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned & Multicolor */}
      <section ref={servicesRef} className="py-32 relative z-20 bg-slate-50 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="inline-block py-1 px-3 border border-purple-200 rounded-full text-purple-600 text-sm font-semibold tracking-wider mb-6 bg-white shadow-sm">
              OUR EXPERTISE
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Design. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">Scale.</span>
            </h2>
            <p className="text-slate-500 text-xl font-light">Comprehensive digital solutions tailored for explosive growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length > 0 ? services.map((service, index) => {
              const colorTheme = serviceColors[index % serviceColors.length];
              return (
                <div key={index} className={`service-card group relative p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                  {/* Hover Gradient Background (Fills card) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorTheme.from} ${colorTheme.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  {/* Icon Area */}
                  <div className={`relative z-10 mb-8 w-16 h-16 ${colorTheme.bg} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 group-hover:bg-white/20`}>
                    <div className={`text-2xl ${colorTheme.text} group-hover:text-white`}>
                      {service.icon?.includes('Code') ? <FaCode /> :
                        service.icon?.includes('Bullhorn') ? <FaBullhorn /> :
                          service.icon?.includes('Mobile') ? <FaMobileAlt /> :
                            <FaLayerGroup />}
                    </div>
                  </div>

                  <h3 className="relative z-10 text-2xl font-bold mb-4 text-slate-900 group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="relative z-10 text-slate-500 leading-relaxed mb-8 font-light group-hover:text-white/90">
                    {service.shortDescription}
                  </p>

                  <Link href={`/services/${service.slug}`} className={`relative z-10 inline-flex items-center font-bold ${colorTheme.text} group-hover:text-white hover:opacity-80 transition-opacity`}>
                    Explore <span className={`ml-3 w-8 h-8 rounded-full ${colorTheme.bg} group-hover:bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform`}><FaArrowRight size={12} className="group-hover:text-white" /></span>
                  </Link>
                </div>
              );
            }) : (
              <div className="col-span-3 text-center text-slate-500">Loading Services...</div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-pink-600 font-bold tracking-widest uppercase text-sm">Testimonials</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4 text-slate-900">Voices of Trust</h2>
            </div>
            <div className="hidden md:flex space-x-2">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors">←</button>
              <button className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors">→</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[2rem] relative group hover:bg-white hover:shadow-xl transition-all duration-300">
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 text-6xl text-slate-200 group-hover:text-pink-100 transition-colors font-serif leading-none">"</div>

                <div className="flex text-yellow-400 mb-6 text-sm">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed italic text-lg relative z-10">"{t.message}"</p>
                <div className="flex items-center border-t border-slate-200 pt-6 group-hover:border-pink-50 transition-colors">
                  <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden mr-4 shadow-sm border-2 border-white">
                    {t.image ? <img src={t.image} alt={t.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">{t.name[0]}</div>}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-pink-600 font-medium">{t.role} @ {t.company}</p>
                  </div>
                </div>
              </div>
            )) : <div className="text-center text-slate-500 col-span-3">No testimonials found.</div>}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-cyan-600 font-bold tracking-widest uppercase text-sm">Latest Insights</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 text-slate-900">News & Perspectives</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogs.length > 0 ? blogs.slice(0, 3).map((blog, i) => (
              <div key={i} className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-200">
                    {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {blog.category}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-cyan-600 transition-colors leading-tight">{blog.title}</h3>
                  <p className="text-slate-500 mb-8 line-clamp-2 font-light">
                    {blog.content ? blog.content.substring(0, 100) + '...' : 'Read more about this topic.'}
                  </p>
                  <Link href={`/blog/${blog.slug}`} className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-200 group-hover:border-cyan-600 pb-1 transition-colors">
                    Read Article
                  </Link>
                </div>
              </div>
            )) : <div className="text-center text-slate-500 col-span-3">No blogs found.</div>}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 via-white to-cyan-50 opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Projects", value: "500+" },
              { label: "Clients", value: "200+" },
              { label: "Awards", value: "15+" },
              { label: "Years", value: "10+" }
            ].map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <div className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 mb-4">
                  {stat.value}
                </div>
                <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          {/* Abstract BG */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tight leading-tight">
            {cta.title || "Let's Build Something Legendary."}
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-14 max-w-3xl mx-auto font-light">
            {cta.subtitle || "Turn your vision into a reality with our award-winning team."}
          </p>
          <Link href="/contact" className="inline-block px-14 py-6 bg-white text-slate-900 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl hover:shadow-cyan-500/20">
            {cta.buttonText || "Start Collaboration"}
          </Link>
        </div>
      </section>

    </div>
  );
}

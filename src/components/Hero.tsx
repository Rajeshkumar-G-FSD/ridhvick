import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Award, Star, Clock } from 'lucide-react';

interface HeroProps {
  onExplore: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Durable, Premium School Uniforms',
      subtitle: 'Engineered for Action & Academic Integrity',
      description: 'Discover premium blazers, shirts, skirts, and trousers designed to withstand active student life. Created with 100% breathable cotton blends and stain-resistant treatment.',
      badge: 'Academics & Daily Wear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIVWhJCrGeEgdKRzKZm6Az_KSfrVCXXIY1Hxda9kU6nQyviZ788yY70JXqKYCzdusC_NXvHy1MQPur-Ls0suAgsDSP6RFe9n8V031x-kXLkJRv5Rs6Lg2qcEbUWc7363xkiMneXlxY0h1N38adr3hFlpba5pINKsGshD2CeqN5KF-vDqdF2JenW8F35qpgBxhip_5-Szv5JP922fWK8kTOa4PBLi3GsL4GQzLxGjr_46N4CYgVUW2ZY_Hu31nkWtCr2D_1_ZL1Zk0',
      actionCategory: 'school',
      actionText: 'Explore School Uniforms',
    },
    {
      title: 'High-Performance Sports Wear',
      subtitle: 'Dynamic Apparel for the Next-Gen Athlete',
      description: 'Equip your team with pro-grade soccer kits, thermal flex tracksuits, and dry-fit court shorts that maximize athletic performance and build house pride.',
      badge: 'Athletics & Houses',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSwiRCNU9nXD6XGke9xZDXAaL1ab1pLbJPfTIpdMF4-10Trm1T41poQ2z9JQIbNOY1NtRroUN2a4wT1u5eHVX5Jr0IB6cdV6ZBh73odp9LuZdeRqEWsf2-3p3Ul1s8gW4dBbhT-VLHMgOKp4dp_kKzeM_CUxmiOTmK43_JljZSs3Qf2OGM6w6wcc0_CbcnSGfZ07W-bbolbvc-wbON6G3zV5wel1KqGcZ9lWC8ZV-NzIRbf6mZNuJHL9nowFXWQ-4hTXXRSq1tFVo',
      actionCategory: 'sports',
      actionText: 'Explore Sports Collection',
    },
    {
      title: 'Corporate Identity Apparel',
      subtitle: 'Impeccable Professionalism, Tailored to Perfection',
      description: 'Elevate your brand presence with luxury executive blazers and crisp Egyptian cotton shirts. Featuring custom logo embroidery options and premium fabrics.',
      badge: 'Corporate Wear',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL6TaUprv40aW1-mM6vAYjzId_muH5whOYWPIem4lHZlTegAX1VIha8TCia-nQ3U50HUVHHqvM9PeASclgyrdbPAFgvZqTaJKfLWTEnI9J6y3-0v-faWPec2OCd4W0-XnH90z2tohOdQwTgDy5tgAgR5ZjgH2lz7VhoQwMYDi_jR3Pxm6U2a6YWMXaHiIUhFr5gUR6W7MZzZZuLyBpo-FmGcE_nU4Gz7E4hHJP1I0mFwWYOyh1OW1GqP_JHkUTa32xAByPcsfJ6aA',
      actionCategory: 'corporate',
      actionText: 'Explore Corporate Wear',
    }
  ];

  // Auto scroll slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative bg-[#f5f7fc] overflow-hidden" id="hero-slider-section">
      {/* Decorative vector overlays */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 curve-mask pointer-events-none" />
      
      {/* Main Slide Track */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left z-10" id="hero-left-content">
            {/* Slide Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-sans text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-1.5 h-1.5 bg-secondary-gold rounded-full animate-ping" />
              {slides[currentSlide].badge}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-3.5xl sm:text-5xl lg:text-5.5xl text-primary leading-tight tracking-tight">
                {slides[currentSlide].title}
              </h1>
              <h2 className="font-display font-semibold text-lg sm:text-xl text-secondary">
                {slides[currentSlide].subtitle}
              </h2>
            </div>

            {/* Slide Description */}
            <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed max-w-xl">
              {slides[currentSlide].description}
            </p>

            {/* Multi-Button Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
              <button
                onClick={() => onExplore(slides[currentSlide].actionCategory)}
                className="px-6 py-3.5 bg-primary text-white font-display text-sm font-bold tracking-wide rounded-xl shadow-lg hover:bg-primary-light transition-all flex items-center justify-center gap-2 group cursor-pointer"
                id={`hero-cta-btn-${currentSlide}`}
              >
                <span>{slides[currentSlide].actionText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              
              <button
                onClick={() => onExplore('bulk')}
                className="px-6 py-3.5 bg-white text-primary border-2 border-primary/15 hover:border-primary/40 font-display text-sm font-semibold tracking-wide rounded-xl transition-all hover:bg-slate-50 cursor-pointer flex items-center justify-center"
                id="hero-bulk-cta"
              >
                Request Custom Quote
              </button>
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex items-center gap-2.5 pt-4" id="slider-nav-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-8 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Product Image Container */}
          <div className="lg:col-span-5 relative" id="hero-right-visual">
            <div className="relative w-full max-w-md mx-auto aspect-square bg-white rounded-3xl p-6 shadow-2xl border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Product Background Circle Accent */}
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-surface-low to-slate-100/50 -z-10" />
              
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-2xl animate-in fade-in zoom-in-95 duration-700"
              />

              {/* Float badge 1: Best Value Guarantee */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-display font-bold text-[10px] text-primary uppercase tracking-wide">
                  Grade A Fabrics
                </span>
              </div>

              {/* Float badge 2: Bulk Pricing Status */}
              <div className="absolute bottom-4 left-4 bg-primary/95 text-white px-3.5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary-gold animate-spin" style={{ animationDuration: '6s' }} />
                <div className="flex flex-col">
                  <span className="font-display font-black text-xs text-secondary-gold leading-none">SAVE 25%</span>
                  <span className="font-sans text-[8px] opacity-80 leading-none mt-0.5">ON INSTITUTIONAL INQUIRIES</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Highlight Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-slate-200/60" id="trust-badges-grid">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-xs text-primary uppercase">Institutional Grade</h4>
              <p className="font-sans text-[11px] text-text-muted">Rigorous testing on durability</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Star className="w-5 h-5 text-secondary-gold" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-xs text-primary uppercase">100+ Academies Trust Us</h4>
              <p className="font-sans text-[11px] text-text-muted">Equipping houses & classes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-xs text-primary uppercase">Anti-Stain & Anti-Fray</h4>
              <p className="font-sans text-[11px] text-text-muted">Easy-iron fabric coating</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-xs text-primary uppercase">Rapid Order Delivery</h4>
              <p className="font-sans text-[11px] text-text-muted">On-time delivery for start of semesters</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

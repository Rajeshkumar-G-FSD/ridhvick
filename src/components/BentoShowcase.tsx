import React from 'react';
import { Award, ShieldCheck, Sparkles, Star, ChevronRight, Check } from 'lucide-react';

interface BentoShowcaseProps {
  onExplore: (category: string) => void;
}

export const BentoShowcase: React.FC<BentoShowcaseProps> = ({ onExplore }) => {
  return (
    <section className="py-12 bg-white" id="bento-showcase-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Title with Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10" id="bento-header">
          <div className="inline-flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full text-secondary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-secondary-gold fill-secondary-gold" />
            <span>Premium Fabric Standard</span>
          </div>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-primary leading-tight">
            Crafted for Daily Comfort & Infinite Durability
          </h2>
          <p className="font-sans text-sm text-text-muted mt-2">
            Explore our curated collections designed to withstand rigorous academic schedules, athletic seasons, and corporate milestones.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5" id="bento-grid-container">
          
          {/* Card 1: School Uniforms Category Highlight (Large Left - Span 7) */}
          <div 
            onClick={() => onExplore('school')}
            className="md:col-span-7 bg-[#f0f4f8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group cursor-pointer border border-slate-100 shadow-sm transition-all hover:shadow-md"
            id="bento-card-school"
          >
            {/* Background Graphic */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="z-10 flex flex-col items-start">
              <span className="px-2.5 py-1 rounded bg-primary text-white font-display text-[10px] font-bold uppercase tracking-wider mb-3">
                Best-Seller Category
              </span>
              <h3 className="font-display font-black text-2xl text-primary leading-snug">
                Academic Blazer & Combo Collections
              </h3>
              <p className="font-sans text-xs text-text-muted mt-2 max-w-sm">
                Tailored with stain-resistant, breathable poly-cotton fiber blends. Easy to wash, simple to iron, and built to look crisp all semester long.
              </p>
            </div>

            <div className="mt-8 z-10 flex items-center justify-between">
              <div className="flex items-center gap-1 text-primary group-hover:text-primary-light transition-colors">
                <span className="font-display font-bold text-sm">Explore Institutional Wear</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Feature Points list */}
              <div className="hidden sm:flex items-center gap-4 text-[10px] font-sans font-semibold text-primary/80">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-secondary" /> Double Stitching
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-secondary" /> Adjustable Waistband
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Fabric Material Spec (Span 5) */}
          <div 
            className="md:col-span-5 bg-primary text-white rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-md"
            id="bento-card-specs"
          >
            {/* Decorative Gold Glow */}
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-secondary-gold/25 rounded-full blur-2xl" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-xs text-secondary-gold tracking-widest uppercase">
                  Technical Fabric Specs
                </span>
                <ShieldCheck className="w-5 h-5 text-secondary-gold" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                Engineered Material Technology
              </h3>
              
              {/* Bullet list */}
              <ul className="mt-4 space-y-2.5 text-xs text-slate-100 font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary-gold rounded-full mt-1.5 shrink-0" />
                  <span><strong>Anti-Pilling:</strong> Sweaters retain pristine texture without fiber balls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary-gold rounded-full mt-1.5 shrink-0" />
                  <span><strong>Moisture-Wick:</strong> High dry-fit performance keeps athletes dry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary-gold rounded-full mt-1.5 shrink-0" />
                  <span><strong>Eco-Thread:</strong> Ethically sourced organic cotton blended safely.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-[11px] opacity-90 font-sans">
              <span>Standard certified under ISO 9001</span>
              <span className="text-secondary-gold font-bold">100% Guaranteed</span>
            </div>
          </div>

          {/* Card 3: Embroidery & Branding Services (Span 4) */}
          <div 
            onClick={() => onExplore('bulk')}
            className="md:col-span-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/60 shadow-sm cursor-pointer group transition-all"
            id="bento-card-services"
          >
            <div>
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Star className="w-5 h-5 text-primary fill-primary/20" />
              </div>
              <h3 className="font-display font-bold text-base text-primary">
                Bespoke Embroidery & Crests
              </h3>
              <p className="font-sans text-xs text-text-muted mt-2">
                We stitch clean institutional crests and custom logos using top-tier Japanese computer-controlled thread machinery.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs font-display font-bold text-secondary group-hover:text-primary transition-colors">
              <span>Upload school emblem in inquiry</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: Sports Collection (Span 8) */}
          <div 
            onClick={() => onExplore('sports')}
            className="md:col-span-8 bg-[#fdf8f0] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 justify-between items-center overflow-hidden relative group cursor-pointer border border-amber-100/50 shadow-sm transition-all hover:shadow-md"
            id="bento-card-sports"
          >
            {/* Left Content Column */}
            <div className="flex flex-col items-start text-left shrink-0 z-10 max-w-sm">
              <span className="px-2 py-0.5 rounded bg-secondary-gold text-primary font-display text-[9px] font-bold uppercase tracking-wider mb-2">
                PE & HOUSE APPAREL
              </span>
              <h3 className="font-display font-black text-xl text-primary">
                Pro-Elite Sports Collection
              </h3>
              <p className="font-sans text-xs text-text-muted mt-2">
                Equip PE classes and dynamic school houses with dry-fit sports uniforms. Designed for physical education, matches, and cross-country runs.
              </p>
              
              <div className="mt-4 flex items-center gap-1 text-primary group-hover:text-primary-light font-display font-bold text-xs">
                <span>View Tracksuits & Cricket Kits</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Right Graphic/Asset hotlinked */}
            <div className="relative w-44 h-44 rounded-2xl bg-white p-3 shadow-md border border-slate-100 flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSwiRCNU9nXD6XGke9xZDXAaL1ab1pLbJPfTIpdMF4-10Trm1T41poQ2z9JQIbNOY1NtRroUN2a4wT1u5eHVX5Jr0IB6cdV6ZBh73odp9LuZdeRqEWsf2-3p3Ul1s8gW4dBbhT-VLHMgOKp4dp_kKzeM_CUxmiOTmK43_JljZSs3Qf2OGM6w6wcc0_CbcnSGfZ07W-bbolbvc-wbON6G3zV5wel1KqGcZ9lWC8ZV-NzIRbf6mZNuJHL9nowFXWQ-4hTXXRSq1tFVo"
                alt="Sports Apparel Design"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

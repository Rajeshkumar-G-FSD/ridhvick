import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6 border-t border-white/10" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 text-left">
        
        {/* Brand Description Column (Span 4) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white text-primary rounded-lg flex items-center justify-center font-display font-black text-lg border border-secondary-gold/30 shadow">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-white">
                RIDHVICK
              </span>
              <span className="font-sans text-[10px] uppercase tracking-wider text-secondary-gold">
                Uniforms & Apparel
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm">
            Providing premium double-stitched institutional uniforms, sports gear, and corporate apparel. Sourced for peak durability, comfort, and professional representation.
          </p>

          {/* Contact Details */}
          <div className="space-y-2 pt-2 text-xs text-slate-300 font-sans">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary-gold shrink-0" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-secondary-gold shrink-0" />
              <span>inquiries@ridhvickuniforms.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary-gold shrink-0" />
              <span>100 Innovation Parkway, Suite 400, NY</span>
            </div>
          </div>
        </div>

        {/* Quick Links Column (Span 2.5) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs text-secondary-gold uppercase tracking-widest">
            Uniform Collections
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 font-sans">
            <li>
              <button 
                onClick={() => setCurrentTab('school')}
                className="hover:text-secondary-gold transition-colors text-left cursor-pointer"
              >
                School Uniforms
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('sports')}
                className="hover:text-secondary-gold transition-colors text-left cursor-pointer"
              >
                Sports & PE Wear
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('corporate')}
                className="hover:text-secondary-gold transition-colors text-left cursor-pointer"
              >
                Corporate Apparel
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentTab('accessories')}
                className="hover:text-secondary-gold transition-colors text-left cursor-pointer"
              >
                Belts, Bags & Ties
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Care / Services Column (Span 2.5) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display font-bold text-xs text-secondary-gold uppercase tracking-widest">
            Institutional Support
          </h4>
          <ul className="space-y-2 text-xs text-slate-300 font-sans">
            <li>
              <button 
                onClick={() => setCurrentTab('bulk')}
                className="hover:text-secondary-gold transition-colors text-left cursor-pointer"
              >
                Submit Bulk Inquiry
              </button>
            </li>
            <li>
              <span className="opacity-60 cursor-not-allowed">Request Material Swatches</span>
            </li>
            <li>
              <span className="opacity-60 cursor-not-allowed">Custom Sizing Guides</span>
            </li>
            <li>
              <span className="opacity-60 cursor-not-allowed">Embroidery Guidelines</span>
            </li>
          </ul>
        </div>

        {/* Certifications and Trust Column (Span 2) */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-display font-bold text-xs text-secondary-gold uppercase tracking-widest">
            Certifications
          </h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10 text-left">
              <ShieldCheck className="w-4 h-4 text-secondary-gold shrink-0" />
              <div className="text-[10px] font-sans">
                <span className="font-bold block text-white leading-tight">ISO 9001</span>
                <span className="text-slate-300">Quality Assured</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10 text-left">
              <Sparkles className="w-4 h-4 text-secondary-gold shrink-0" />
              <div className="text-[10px] font-sans">
                <span className="font-bold block text-white leading-tight">Oeko-Tex 100</span>
                <span className="text-slate-300">No harmful toxins</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright Disclaimer and fine print */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-4" id="footer-bottom">
        <span>© {new Date().getFullYear()} Ridhvick Uniforms & Institutional Apparel. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer font-bold text-secondary-gold">Institutional login</span>
        </div>
      </div>
    </footer>
  );
};

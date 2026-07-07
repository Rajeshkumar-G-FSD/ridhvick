import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, Mail, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'school', label: 'School Uniforms' },
    { id: 'sports', label: 'Sports Wear' },
    { id: 'corporate', label: 'Corporate Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'bulk', label: 'Bulk Orders / Inquiries' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" id="navbar-header">
      {/* Top Contact & Announcement Bar */}
      <div className="bg-primary text-white text-xs py-2 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-white/10" id="top-bar">
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <a href="tel:+18005550199" className="flex items-center gap-1.5 hover:text-secondary-gold transition-colors">
            <Phone className="w-3.5 h-3.5 text-secondary-gold" />
            <span>+1 (800) 555-0199</span>
          </a>
          <a href="mailto:inquiries@ridhvickuniforms.com" className="flex items-center gap-1.5 hover:text-secondary-gold transition-colors">
            <Mail className="w-3.5 h-3.5 text-secondary-gold" />
            <span>inquiries@ridhvickuniforms.com</span>
          </a>
        </div>
        <div className="flex items-center gap-2 font-display text-[11px] font-semibold text-secondary-gold animate-pulse">
          <Sparkles className="w-3 h-3" />
          <span>Save up to 25% with Institutional Bulk Rates (50+ units)</span>
        </div>
      </div>

      {/* Main Branding & Navigation Row */}
      <div className="bg-white/95 backdrop-blur-md border-b border-surface-card px-4 sm:px-8 py-4 flex items-center justify-between shadow-sm" id="main-nav-row">
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => setCurrentTab('home')}
          id="brand-logo-container"
        >
          {/* Logo Crest Icon */}
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary-gold font-display font-black text-xl border-2 border-secondary-gold/40 shadow-md group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-primary leading-none">
              RIDHVICK
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-secondary mt-0.5">
              Uniforms & Apparel
            </span>
          </div>
        </div>

        {/* Desktop Navigation Link Tabs */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
          {navigationItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`px-3.5 py-2 rounded-lg font-display text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-muted hover:text-primary hover:bg-surface-low'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Search & Cart Utility Actions */}
        <div className="flex items-center gap-3" id="nav-utilities">
          {/* Quick Search Input */}
          <div className="relative hidden md:block max-w-xs" id="desktop-search">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 xl:w-56 pl-9 pr-4 py-1.5 rounded-lg text-xs font-sans border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Cart Icon Button with Badge */}
          <button
            onClick={onOpenCart}
            id="cart-btn"
            className="relative p-2.5 bg-surface-low hover:bg-slate-200/70 text-primary rounded-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
            aria-label="Open Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary-gold text-primary font-sans font-black text-[10px] w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-sm border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            id="mobile-menu-btn"
            className="lg:hidden p-2 text-primary hover:bg-surface-low rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-surface-card shadow-lg p-4 animate-in fade-in slide-in-from-top-4 duration-200" id="mobile-nav-drawer">
          {/* Search bar inside mobile drawer */}
          <div className="relative mb-4" id="mobile-search">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-mobile-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-display text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white font-bold'
                      : 'text-text-muted hover:text-primary hover:bg-surface-low'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

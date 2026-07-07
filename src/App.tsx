import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoShowcase } from './components/BentoShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { BulkInquiryForm } from './components/BulkInquiryForm';
import { Footer } from './components/Footer';
import { PRODUCTS, ALL_FABRICS } from './data';
import { Product, CartItem, BulkInquiry, FilterState } from './types';
import { SlidersHorizontal, ArrowRight, ShieldCheck, Star, Sparkles, Filter, X } from 'lucide-react';

export default function App() {
  // Navigation & Cart state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ridhvick_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Advanced filtration states
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high'>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('ridhvick_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle adding product to cart (supports customization size & color & custom count)
  const handleAddToCart = (product: Product, size: string, color: string, qty = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === itemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevItems, { id: itemId, product, quantity: qty, selectedSize: size, selectedColor: color }];
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQty = (id: string, qty: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  // Remove item from Cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Action: Switch to Inquiry page pre-filled with items
  const handleProceedToInquiry = () => {
    setIsCartOpen(false);
    setCurrentTab('bulk');
  };

  // Action: clear cart on complete submit
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter products based on active tab & sidebar options
  const getFilteredProducts = () => {
    return PRODUCTS.filter((product) => {
      // 1. Filter by Tab category
      if (currentTab !== 'home' && currentTab !== 'bulk' && product.category !== currentTab) {
        return false;
      }

      // 2. Filter by search text
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSub = product.subcategory?.toLowerCase().includes(query) || false;
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSub && !matchesFabric) {
          return false;
        }
      }

      // 3. Filter by Gender
      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
        return false;
      }

      // 4. Filter by Age Group
      if (selectedAgeGroups.length > 0 && !selectedAgeGroups.includes(product.ageGroup)) {
        return false;
      }

      // 5. Filter by Fabric
      if (selectedFabrics.length > 0 && !selectedFabrics.includes(product.fabric)) {
        return false;
      }

      // 6. Filter by maximum Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort logic
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // recommended
    });
  };

  // Clear all filters
  const handleResetFilters = () => {
    setSelectedGenders([]);
    setSelectedAgeGroups([]);
    setSelectedFabrics([]);
    setMaxPrice(100);
    setSearchQuery('');
  };

  const filteredProductsList = getFilteredProducts();

  // Categories helper titles
  const getCategoryMeta = () => {
    switch (currentTab) {
      case 'school':
        return {
          title: 'School Uniforms & Academic Attire',
          desc: 'Premium tailored blazers, daily pressed cotton shirts, pleated skirts, and sweaters built for performance and absolute comfort.',
          count: filteredProductsList.length,
        };
      case 'sports':
        return {
          title: 'Sports Wear & PE Training Kits',
          desc: 'Moisture-wicking, breathable active jerseys, thermal fleece tracksuits, court shorts, and customized team house kits.',
          count: filteredProductsList.length,
        };
      case 'corporate':
        return {
          title: 'Corporate Apparel & Business Executive Wear',
          desc: 'Professional premium blazers and crisp Egyptian cotton shirts designed for office events, conferences, and front desk representatives.',
          count: filteredProductsList.length,
        };
      case 'accessories':
        return {
          title: 'School Bags, Belts & Silk Crest Ties',
          desc: 'Waterproof Oxford nylon backpacks, crested ties, and supportive brass buckled belts to complete student and institutional uniforms.',
          count: filteredProductsList.length,
        };
      default:
        return {
          title: 'Full Apparel Catalog',
          desc: 'Browse our complete catalog of certified uniforms and active sports accessories.',
          count: filteredProductsList.length,
        };
    }
  };

  const meta = getCategoryMeta();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="applet-root">
      {/* Premium Header/Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page Routing Switcher */}
      <main className="flex-grow">
        {currentTab === 'home' ? (
          /* HOME PAGE LAYOUT */
          <div className="space-y-4" id="home-view">
            {/* Hero Slider section */}
            <Hero onExplore={(cat) => setCurrentTab(cat)} />

            {/* Premium Bento Grid Showcase */}
            <BentoShowcase onExplore={(cat) => setCurrentTab(cat)} />

            {/* Featured Best Sellers Row */}
            <section className="py-12 bg-slate-50/50" id="featured-best-sellers">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 text-left">
                  <div>
                    <span className="text-secondary font-display text-[10px] uppercase font-extrabold tracking-widest">
                      Institutional Favourites
                    </span>
                    <h3 className="font-display font-black text-2.5xl text-primary leading-tight mt-1">
                      Our Featured Best Sellers
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentTab('school')}
                    className="group flex items-center gap-1.5 text-primary hover:text-primary-light font-display text-xs font-bold tracking-wide mt-2 sm:mt-0 cursor-pointer"
                  >
                    <span>View Entire Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Best Sellers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.filter((p) => p.isBestSeller)
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(prod, sz, col) => handleAddToCart(prod, sz, col, 1)}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                      />
                    ))}
                </div>
              </div>
            </section>
          </div>
        ) : currentTab === 'bulk' ? (
          /* BULK ORDERS / INQUIRIES PAGE */
          <div className="py-2" id="bulk-inquiries-view">
            <BulkInquiryForm
              cartItems={cartItems}
              onSubmitInquiry={(inquiry) => {
                console.log('Inquiry submitted:', inquiry);
              }}
              onClearCart={handleClearCart}
            />
          </div>
        ) : (
          /* PRODUCTS CATALOG VIEW (School, Sports, Corporate, Accessories) */
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10" id="catalog-view">
            
            {/* Category Page Banner Header */}
            <div className="bg-primary text-white rounded-3xl p-6 sm:p-10 text-left relative overflow-hidden mb-10 shadow-lg">
              <div className="absolute right-0 top-0 w-1/3 h-full bg-secondary-gold/5 curve-mask pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-2xl" />

              <div className="max-w-2xl space-y-2 z-10 relative">
                <span className="font-sans text-[10px] font-black uppercase tracking-widest text-secondary-gold">
                  Ridhvick Uniforms Standards
                </span>
                <h2 className="font-display font-black text-2.5xl sm:text-4.5xl leading-tight">
                  {meta.title}
                </h2>
                <p className="font-sans text-xs sm:text-sm text-slate-100 opacity-90 leading-relaxed">
                  {meta.desc}
                </p>
                <div className="pt-3 flex items-center gap-4 text-xs font-sans text-slate-200">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-secondary-gold" />
                    Oeko-Tex Certified
                  </span>
                  <span>•</span>
                  <span><strong>{meta.count}</strong> Premium items available</span>
                </div>
              </div>
            </div>

            {/* Main Grid: Sidebar Filters + Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Filtration (Span 3) */}
              <aside className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-left space-y-6" id="sidebar-filters">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="font-display font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter Options
                  </span>
                  <button 
                    onClick={handleResetFilters}
                    className="font-sans text-[10px] text-secondary font-bold hover:text-primary transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {/* Filter: Genders */}
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs text-primary uppercase">Gender</h4>
                  <div className="space-y-1.5">
                    {['boys', 'girls', 'unisex'].map((g) => {
                      const isSelected = selectedGenders.includes(g);
                      return (
                        <label key={g} className="flex items-center gap-2.5 text-xs text-text-muted capitalize font-sans cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedGenders((prev) =>
                                isSelected ? prev.filter((item) => item !== g) : [...prev, g]
                              );
                            }}
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                          <span>{g} wear</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Filter: Age Group */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="font-display font-bold text-xs text-primary uppercase">Age Category</h4>
                  <div className="space-y-1.5">
                    {['junior', 'senior', 'all'].map((age) => {
                      const isSelected = selectedAgeGroups.includes(age);
                      return (
                        <label key={age} className="flex items-center gap-2.5 text-xs text-text-muted capitalize font-sans cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedAgeGroups((prev) =>
                                isSelected ? prev.filter((item) => item !== age) : [...prev, age]
                              );
                            }}
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                          <span>{age} division</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Filter: Fabrics */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="font-display font-bold text-xs text-primary uppercase">Fabric Selection</h4>
                  <div className="space-y-1.5">
                    {ALL_FABRICS.map((fabric) => {
                      const isSelected = selectedFabrics.includes(fabric);
                      return (
                        <label key={fabric} className="flex items-center gap-2.5 text-xs text-text-muted font-sans cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedFabrics((prev) =>
                                isSelected ? prev.filter((item) => item !== fabric) : [...prev, fabric]
                              );
                            }}
                            className="rounded border-slate-300 text-primary focus:ring-primary/20"
                          />
                          <span className="truncate">{fabric}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Filter: Price scale */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center text-xs">
                    <h4 className="font-display font-bold text-primary uppercase">Max Price</h4>
                    <span className="font-display font-black text-primary">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </aside>

              {/* Mobile Filter Button and Sort header Row (Span 9 container) */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Utilities filter pill row */}
                <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm" id="catalog-header-sort-row">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="lg:hidden px-3.5 py-1.5 border border-slate-200 text-text-muted hover:text-primary rounded-xl flex items-center gap-1.5 text-xs font-display font-bold transition-colors cursor-pointer"
                    >
                      <Filter className="w-3.5 h-3.5" />
                      <span>Filters</span>
                    </button>
                    
                    <span className="hidden sm:block font-sans text-xs text-text-muted">
                      Showing <strong>{filteredProductsList.length}</strong> apparel items
                    </span>
                  </div>

                  {/* Sort options */}
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs text-slate-400">Sort By:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 text-xs font-display font-semibold text-primary rounded-lg py-1 px-2.5 focus:outline-none"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProductsList.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-3" id="empty-filtered-list">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                      <SlidersHorizontal className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-display font-bold text-slate-700 text-sm">No items match your active filters</h3>
                    <p className="font-sans text-xs text-text-muted max-w-sm">
                      Try clearing search parameters, widening your price range, or adjusting fabric selections.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-primary text-white font-display text-xs font-bold rounded-lg cursor-pointer transition-transform hover:scale-102"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="products-catalog-grid">
                    {filteredProductsList.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(prod, sz, col) => handleAddToCart(prod, sz, col, 1)}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}
      </main>

      {/* Mobile Sidebar Filters Backdrop drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-55 flex lg:hidden" id="mobile-filter-drawer-overlay">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setShowMobileFilters(false)} />
          <div className="relative bg-white w-full max-w-xs h-full p-5 flex flex-col justify-between shadow-2xl border-r border-slate-100 animate-in slide-in-from-left duration-200 text-left">
            
            <div className="space-y-6 overflow-y-auto">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="font-display font-bold text-xs text-primary uppercase flex items-center gap-1.5">
                  <Filter className="w-4 h-4" /> Filter Options
                </span>
                <button onClick={() => setShowMobileFilters(false)} className="p-1 hover:bg-slate-100 rounded-full">
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Mobile Filter: Gender */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs text-primary uppercase">Gender</h4>
                <div className="space-y-1.5">
                  {['boys', 'girls', 'unisex'].map((g) => {
                    const isSelected = selectedGenders.includes(g);
                    return (
                      <label key={g} className="flex items-center gap-2.5 text-xs text-text-muted capitalize font-sans">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedGenders((prev) =>
                              isSelected ? prev.filter((item) => item !== g) : [...prev, g]
                            );
                          }}
                          className="rounded border-slate-300 text-primary"
                        />
                        <span>{g} wear</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Filter: Age */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="font-display font-bold text-xs text-primary uppercase">Age Division</h4>
                <div className="space-y-1.5">
                  {['junior', 'senior', 'all'].map((age) => {
                    const isSelected = selectedAgeGroups.includes(age);
                    return (
                      <label key={age} className="flex items-center gap-2.5 text-xs text-text-muted capitalize font-sans">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedAgeGroups((prev) =>
                              isSelected ? prev.filter((item) => item !== age) : [...prev, age]
                            );
                          }}
                          className="rounded border-slate-300 text-primary"
                        />
                        <span>{age} division</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Filter: Fabrics */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h4 className="font-display font-bold text-xs text-primary uppercase">Fabric Spec</h4>
                <div className="space-y-1.5">
                  {ALL_FABRICS.map((fabric) => {
                    const isSelected = selectedFabrics.includes(fabric);
                    return (
                      <label key={fabric} className="flex items-center gap-2.5 text-xs text-text-muted font-sans">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setSelectedFabrics((prev) =>
                              isSelected ? prev.filter((item) => item !== fabric) : [...prev, fabric]
                            );
                          }}
                          className="rounded border-slate-300 text-primary"
                        />
                        <span>{fabric}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Filter: Price scale */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs">
                  <h4 className="font-display font-bold text-primary uppercase">Max Price</h4>
                  <span className="font-display font-black text-primary">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={handleResetFilters}
                className="w-full py-2 bg-slate-100 text-slate-700 font-display text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-2.5 bg-primary text-white font-display text-xs font-bold rounded-lg"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToInquiry={handleProceedToInquiry}
      />

      {/* Product Details Modal Overlay popup */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, sz, col, qty) => handleAddToCart(prod, sz, col, qty)}
      />

      {/* Footer component */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}

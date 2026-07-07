import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Sparkles, Check, ShoppingBag, Info, Heart } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, qty: number) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [includeCrest, setIncludeCrest] = useState<boolean>(true);
  const [added, setAdded] = useState<boolean>(false);

  const finalUnitPrice = quantity >= 50 ? product.bulkPrice : product.price;
  const totalCost = finalUnitPrice * quantity;
  const savings = quantity >= 50 ? (product.price - product.bulkPrice) * quantity : 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200" id="product-details-modal">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="modal-card"
      >
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image display */}
        <div className="w-full md:w-1/2 bg-slate-50 p-6 sm:p-10 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-r border-slate-100">
          <div className="absolute top-4 left-4 bg-primary/10 text-primary font-display text-[9px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            {product.fabric}
          </div>

          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            {/* Underlay shadow */}
            <div className="absolute inset-8 rounded-full bg-slate-200/50 filter blur-xl" />
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-5/6 h-5/6 object-contain rounded-2xl z-10"
            />
          </div>

          {/* Quick specs pill */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center z-10">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-sans font-semibold text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Stain-resistant
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-sans font-semibold text-slate-500 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-secondary" /> Double Stitch
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-sans font-semibold text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-secondary-gold fill-secondary-gold" /> Anti-shrink
            </span>
          </div>
        </div>

        {/* Right Side: Product Customizers and Info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left">
          {/* Brand/Review Header */}
          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-sans text-[10px] uppercase font-extrabold tracking-widest text-secondary">
                {product.category} COLLECTION
              </span>
              {product.isBestSeller && (
                <span className="bg-secondary-gold/20 text-secondary font-display text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Best Seller
                </span>
              )}
            </div>
            
            <h3 className="font-display font-black text-xl sm:text-2xl text-primary leading-tight">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                ))}
              </div>
              <span className="font-sans text-xs text-text-muted font-medium">4.9 (82 review-ratings)</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-6">
            <h4 className="font-display font-bold text-xs text-primary uppercase tracking-wider">Description & Composition</h4>
            <p className="font-sans text-xs text-text-muted leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Configuration Matrix (Color, Sizes, Crest Embroidery) */}
          <div className="space-y-4 mb-6 pt-4 border-t border-slate-100">
            
            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 1 && (
              <div className="space-y-1.5">
                <span className="font-display font-bold text-xs text-primary uppercase">Select Color Theme</span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: c }}
                      title={`Color ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Select Matrix */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-xs text-primary uppercase">Select Uniform Size</span>
                  <span className="font-sans text-[10px] text-secondary font-bold underline cursor-pointer hover:text-primary">
                    View Size Dimensions
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-display font-bold border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Emblem Embroidered Crest Toggle */}
            {product.schoolLogo && (
              <div className="bg-[#fcf8f2] p-3 rounded-xl border border-amber-100/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-left">
                  <img
                    src={product.schoolLogo}
                    alt="School Crest Emblem preview"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 object-contain rounded-full bg-white p-0.5 border border-amber-100"
                  />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-[11px] text-primary">Custom Institutional Embroidery</span>
                    <span className="font-sans text-[9px] text-text-muted">Include school crest badge stitched securely.</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={includeCrest} 
                    onChange={() => setIncludeCrest(!includeCrest)} 
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            )}
          </div>

          {/* Interactive Calculator Block for Bulk Quantity */}
          <div className="bg-[#f0f4f8] p-4 rounded-2xl mb-6 text-left">
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-display font-bold text-xs text-primary uppercase">Order Quantity Matrix</span>
              {quantity >= 50 ? (
                <span className="bg-emerald-600 text-white font-display text-[9px] font-black px-2 py-0.5 rounded uppercase">
                  Bulk Rate Unlocked
                </span>
              ) : (
                <span className="font-sans text-[10px] text-slate-500 font-medium">
                  Add 50+ to unlock ${product.bulkPrice.toFixed(2)} rate
                </span>
              )}
            </div>

            {/* Slider and Input row */}
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="150"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex items-center border border-slate-200 bg-white rounded-lg px-2 py-1 shrink-0">
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 text-center text-xs font-sans font-bold text-primary focus:outline-none"
                />
                <span className="text-[10px] font-sans font-bold text-slate-400">pcs</span>
              </div>
            </div>

            {/* Price breakdown results line */}
            <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-200/50">
              <div className="text-left">
                <span className="text-[10px] font-sans text-slate-500 block">Unit Price:</span>
                <span className="font-display font-black text-sm text-primary">
                  ${finalUnitPrice.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-sans text-slate-500 block">Estimated Order Total:</span>
                <span className="font-display font-black text-base text-primary">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            {savings > 0 && (
              <div className="bg-emerald-50 text-emerald-700 text-[10px] font-sans font-semibold p-1.5 rounded-lg text-center mt-2 border border-emerald-100">
                🎉 Your custom institutional order saves ${savings.toFixed(2)}!
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              onClick={handleAdd}
              id="modal-add-to-cart"
              className={`flex-grow py-3.5 rounded-xl font-display text-sm font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                added 
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary hover:bg-primary-light text-white hover:scale-[1.01] active:scale-95'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{added ? 'Added Item to Cart!' : `Add ${quantity} to Cart`}</span>
            </button>
            
            <button
              className="p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              title="Add to Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

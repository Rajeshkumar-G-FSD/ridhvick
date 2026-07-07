import React, { useState } from 'react';
import { Product } from '../types';
import { Star, ShieldCheck, Sparkles, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card details modal
    onAddToCart(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden luxury-shadow luxury-shadow-hover flex flex-col justify-between h-full relative cursor-pointer group"
      id={`product-card-${product.id}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isBestSeller && (
          <span className="bg-secondary-gold text-primary font-display text-[9px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-primary fill-primary" />
            Best Seller
          </span>
        )}
        <span className="bg-white/90 backdrop-blur-sm text-text-muted font-sans text-[8px] font-bold px-2 py-0.5 rounded border border-slate-100 uppercase tracking-widest">
          {product.fabric}
        </span>
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-square w-full bg-slate-50 p-4 flex items-center justify-center overflow-hidden">
        {/* Underlay glow circle */}
        <div className="absolute inset-6 rounded-full bg-slate-100 group-hover:scale-105 transition-transform duration-300 -z-0" />
        
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-4/5 h-4/5 object-contain rounded-xl z-10 group-hover:scale-105 transition-transform duration-500"
          id={`product-img-${product.id}`}
        />

        {/* Optional School Emblem Hotlink preview */}
        {product.schoolLogo && (
          <div 
            className="absolute bottom-2.5 right-2.5 w-7.5 h-7.5 bg-white rounded-full p-1 border border-slate-200/60 shadow-sm z-20 flex items-center justify-center"
            title="School Badge Crest Embroidery Available"
          >
            <img 
              src={product.schoolLogo} 
              alt="School Crest Logo Logo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-full" 
            />
          </div>
        )}
      </div>

      {/* Content Meta Area */}
      <div className="p-4 flex flex-col flex-grow justify-between text-left">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-secondary">
            {product.category} {product.subcategory ? `• ${product.subcategory}` : ''}
          </span>
          <div className="flex items-center gap-0.5 text-amber-500 font-sans font-bold text-[11px]">
            <Star className="w-3 h-3 fill-amber-500 stroke-none" />
            <span>4.9</span>
          </div>
        </div>

        {/* Title Name & Description snippet */}
        <div className="mb-3">
          <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-light transition-colors leading-tight line-clamp-1">
            {product.name}
          </h4>
          <p className="font-sans text-[11px] text-text-muted mt-1 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Interactive Custom Swatches (Color & Size selectors) */}
        <div className="space-y-2.5 pt-2 border-t border-slate-100 mb-3" onClick={(e) => e.stopPropagation()}>
          {/* Colors swatch */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-[9px] font-semibold text-slate-400 uppercase">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      selectedColor === c ? 'ring-2 ring-primary ring-offset-1 scale-110' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes picker */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-[9px] font-semibold text-slate-400 uppercase">Sizes:</span>
              <div className="flex items-center gap-1 flex-wrap">
                {product.sizes.slice(0, 5).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-1.5 py-0.5 text-[10px] rounded font-display font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-primary text-white border-primary'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
                {product.sizes.length > 5 && (
                  <span className="text-[9px] font-sans text-slate-400 font-medium">+{product.sizes.length - 5}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price Matrix & Add button */}
        <div className="flex items-end justify-between pt-1 mt-auto" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col text-left">
            {/* Price lines */}
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-base text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-sans text-[10px] text-slate-400 font-medium">Retail</span>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Bulk: <strong>${product.bulkPrice.toFixed(2)}</strong> (50+ units)</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            id={`add-to-cart-${product.id}`}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              addedMessage 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-primary text-white hover:bg-primary-light hover:scale-105 active:scale-95 shadow-md shadow-primary/10'
            }`}
            title="Quick Add to Cart"
          >
            {addedMessage ? (
              <Check className="w-4 h-4 animate-in zoom-in-50" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

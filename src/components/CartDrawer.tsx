import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToInquiry: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToInquiry,
}) => {
  if (!isOpen) return null;

  // Calculate items quantity totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  // Calculate pricing based on item quantities
  const totalCost = cartItems.reduce((acc, item) => {
    const unitPrice = item.quantity >= 50 ? item.product.bulkPrice : item.product.price;
    return acc + (unitPrice * item.quantity);
  }, 0);

  // Check if any item qualifies for bulk discount, or how close we are to 50 units
  const eligibleForBulk = totalItemsCount >= 50;
  const itemsNeededForBulk = Math.max(0, 50 - totalItemsCount);

  return (
    <div className="fixed inset-0 z-55 flex justify-end" id="cart-drawer-overlay">
      {/* Dim backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Body panel */}
      <div 
        className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250 border-l border-slate-100 text-left"
        id="cart-drawer"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span className="font-display font-extrabold text-base text-primary">Your Cart</span>
            <span className="bg-slate-100 text-slate-600 font-sans font-bold text-xs px-2 py-0.5 rounded-full">
              {totalItemsCount}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4" id="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="font-display font-bold text-slate-600 text-sm">Your cart is currently empty</p>
              <p className="font-sans text-xs text-text-muted max-w-xs">
                Browse our institutional catalog and add daily or sports items to set up your order request.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary text-white font-display text-xs font-bold rounded-lg cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const usesBulkPrice = item.quantity >= 50;
              const unitPrice = usesBulkPrice ? item.product.bulkPrice : item.product.price;
              
              return (
                <div 
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex gap-3 relative hover:bg-slate-100/50 transition-colors"
                  id={`cart-item-${item.id}`}
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-white rounded-lg border border-slate-200/60 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Meta info */}
                  <div className="flex-grow text-left space-y-1">
                    <h5 className="font-display font-bold text-xs text-primary leading-tight line-clamp-1">
                      {item.product.name}
                    </h5>
                    
                    {/* Display size & color if selected */}
                    <div className="flex items-center gap-2 text-[10px] text-text-muted font-sans">
                      {item.selectedSize && (
                        <span>Size: <strong className="text-primary">{item.selectedSize}</strong></span>
                      )}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          Color: 
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>

                    {/* Price with indicators */}
                    <div className="flex items-baseline gap-1.5 pt-0.5">
                      <span className="font-display font-bold text-xs text-primary">
                        ${(unitPrice * item.quantity).toFixed(2)}
                      </span>
                      <span className="font-sans text-[9px] text-slate-400">
                        (${unitPrice.toFixed(2)}/pc)
                      </span>
                      {usesBulkPrice && (
                        <span className="text-[8px] bg-emerald-600/10 text-emerald-700 font-bold px-1 rounded uppercase">
                          Bulk Rate
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector buttons & Trash bin */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="px-1.5 py-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-sans font-bold text-primary">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer summary and redirect checks */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 space-y-4" id="cart-footer">
            {/* Bulk indicator notification banner */}
            {!eligibleForBulk ? (
              <div className="bg-[#fffbeb] p-3 rounded-xl border border-amber-100 flex items-start gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-[10px] text-amber-800 font-sans">
                  <span>Add <strong>{itemsNeededForBulk} more items</strong> to unlock elite institutional bulk pricing with discounts on every piece.</span>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-start gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-[10px] text-emerald-800 font-sans">
                  <span>🎉 <strong>Institutional bulk discount active!</strong> You are saving money on your uniform order.</span>
                </div>
              </div>
            )}

            {/* Total value summary layout */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-text-muted font-sans">
                <span>Total Items:</span>
                <span className="font-bold text-primary">{totalItemsCount} pcs</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-slate-100">
                <span className="font-display font-bold text-sm text-primary">Estimated Value:</span>
                <span className="font-display font-black text-lg text-primary">
                  ${totalCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Inquiry/Proceed Button */}
            <button
              onClick={onProceedToInquiry}
              className="w-full py-3.5 bg-primary hover:bg-primary-light text-white font-display text-sm font-bold tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              id="proceed-to-quote-btn"
            >
              <span>Submit as Bulk Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

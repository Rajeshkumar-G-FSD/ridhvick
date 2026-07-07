import React, { useState, useRef } from 'react';
import { CartItem, BulkInquiry } from '../types';
import { FileText, Upload, Trash2, CheckCircle, Clock, FileSpreadsheet, Building2, User, Mail, Sparkles, Printer, Plus, ChevronRight } from 'lucide-react';

interface BulkInquiryFormProps {
  cartItems: CartItem[];
  onSubmitInquiry: (inquiry: BulkInquiry) => void;
  onClearCart: () => void;
}

export const BulkInquiryForm: React.FC<BulkInquiryFormProps> = ({
  cartItems,
  onSubmitInquiry,
  onClearCart,
}) => {
  // Form State
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [studentCount, setStudentCount] = useState('50-150');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recentInquiry, setRecentInquiry] = useState<BulkInquiry | null>(null);

  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uniformOptions = [
    'Premium Blazers & Outerwear',
    'Daily Press Shirts & Pleated Skirts',
    'Dry-Fit PE T-Shirts & Shorts',
    'Thermal Flex Varsity Tracksuits',
    'Cricket & Team Kits',
    'School Bags & Accessories'
  ];

  // Drag-and-drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Uniform types checkbox handler
  const handleCheckboxChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institutionName || !contactPerson || !email) {
      alert('Please fill out the required institutional contact fields.');
      return;
    }

    const newInquiry: BulkInquiry = {
      id: 'REQ-' + Math.floor(100000 + Math.random() * 900000),
      institutionName,
      contactPerson,
      email,
      studentCount,
      uniformTypes: selectedTypes.length > 0 ? selectedTypes : ['General Uniform inquiry'],
      details,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending Review',
      fileName: attachedFile ? attachedFile.name : undefined
    };

    onSubmitInquiry(newInquiry);
    setRecentInquiry(newInquiry);
    setIsSubmitted(true);
  };

  // Reset page
  const handleNewRequest = () => {
    setInstitutionName('');
    setContactPerson('');
    setEmail('');
    setStudentCount('50-150');
    setSelectedTypes([]);
    setDetails('');
    setAttachedFile(null);
    setIsSubmitted(false);
    setRecentInquiry(null);
    onClearCart(); // empty cart on clean submission receipt
  };

  // Calculate pricing based on item quantities
  const cartTotalCost = cartItems.reduce((acc, item) => {
    const unitPrice = item.quantity >= 50 ? item.product.bulkPrice : item.product.price;
    return acc + (unitPrice * item.quantity);
  }, 0);

  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // If submitted, show beautiful Receipt
  if (isSubmitted && recentInquiry) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4" id="inquiry-receipt">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-10 relative overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Confetti Banner */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-secondary-gold to-primary" />
          
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-black text-2xl text-primary">Inquiry Submitted Successfully!</h3>
              <p className="font-sans text-xs text-text-muted">
                Your quotation proposal has been logged under ID <strong className="text-secondary">{recentInquiry.id}</strong>.
              </p>
            </div>
          </div>

          {/* Details Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 text-sm text-left">
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-primary uppercase tracking-widest">Institutional Contact</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 space-y-2">
                <p className="font-sans text-xs text-text-muted">
                  School: <strong className="text-primary">{recentInquiry.institutionName}</strong>
                </p>
                <p className="font-sans text-xs text-text-muted">
                  Representative: <strong className="text-primary">{recentInquiry.contactPerson}</strong>
                </p>
                <p className="font-sans text-xs text-text-muted">
                  Email: <strong className="text-primary">{recentInquiry.email}</strong>
                </p>
                <p className="font-sans text-xs text-text-muted">
                  Cohort cohort-size: <strong className="text-primary">{recentInquiry.studentCount} students</strong>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-primary uppercase tracking-widest">Submission Status</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 flex flex-col justify-between h-[116px]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span className="font-display font-bold text-xs text-amber-800">Review In Progress</span>
                </div>
                <p className="font-sans text-[11px] text-text-muted leading-relaxed">
                  Our regional account specialist will analyze your design parameters and email a custom quotation sheet in <strong>less than 12 hours</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* If there were cart items in proposal, print them */}
          {cartItems.length > 0 && (
            <div className="py-4 border-t border-b border-slate-100 text-left space-y-3" id="receipt-cart-items">
              <h4 className="font-display font-bold text-xs text-primary uppercase tracking-widest">Selected Custom Catalog Items</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {cartItems.map((item) => {
                  const usesBulk = item.quantity >= 50;
                  const unitPrice = usesBulk ? item.product.bulkPrice : item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-8 h-8 object-contain bg-white rounded border border-slate-100 p-0.5" />
                        <div>
                          <p className="font-display font-bold text-[11px] text-primary">{item.product.name}</p>
                          <p className="font-sans text-[9px] text-text-muted">Size: {item.selectedSize} • Qty: {item.quantity} pcs</p>
                        </div>
                      </div>
                      <span className="font-display font-bold text-xs text-primary">${(unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-baseline pt-2 bg-slate-50 p-3 rounded-lg border border-slate-200/50">
                <span className="font-display font-bold text-xs text-primary">Estimated Order Value:</span>
                <span className="font-display font-black text-sm text-primary">${cartTotalCost.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Attached documents */}
          {recentInquiry.fileName && (
            <div className="py-3 bg-blue-50/50 border border-blue-100 rounded-xl text-left flex items-center gap-2.5 px-4 mt-4">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-[11px] text-blue-900">Custom specification sheet uploaded</span>
                <span className="font-sans text-[9px] text-blue-700/80">{recentInquiry.fileName}</span>
              </div>
            </div>
          )}

          {/* Action Footer receipt buttons */}
          <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="px-5 py-3 border border-slate-200 hover:border-slate-300 rounded-xl font-display text-xs font-semibold text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Inquiry Slip</span>
            </button>
            <button
              onClick={handleNewRequest}
              className="px-5 py-3 bg-primary text-white font-display text-xs font-bold rounded-xl hover:bg-primary-light transition-all cursor-pointer"
            >
              Start New Quotation Request
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10" id="bulk-inquiry-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Main Form Sheet (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl" id="inquiry-form-card">
          <div className="mb-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Institutional Custom Quotes
            </div>
            <h2 className="font-display font-black text-2.5xl text-primary leading-tight">
              Submit Quotation Proposal
            </h2>
            <p className="font-sans text-xs text-text-muted mt-1 leading-relaxed">
              Equipping schools with double-stitched apparel and custom logos. Complete the contact profile below, attach your student size guidelines or crest artwork, and we will do the rest.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-left" id="bulk-submit-form">
            
            {/* School / Institution Name */}
            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs text-primary uppercase flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Institution / School Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oakridge International Academy"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-xs font-sans border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
              />
            </div>

            {/* Contact Person & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-display font-bold text-xs text-primary uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact Person / Representative *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dean Miller"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs font-sans border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-display font-bold text-xs text-primary uppercase flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Representative Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. dean.miller@oakridge.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-xs font-sans border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
            </div>

            {/* Estimated Cohort Student size */}
            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs text-primary uppercase block">
                Estimated Cohort size / Student Count
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['50-150', '150-500', '500+'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setStudentCount(range)}
                    className={`py-2.5 rounded-xl text-xs font-display font-bold border transition-all cursor-pointer ${
                      studentCount === range
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {range} students
                  </button>
                ))}
              </div>
            </div>

            {/* Required Uniform Styles checkboxes */}
            <div className="space-y-2">
              <label className="font-display font-bold text-xs text-primary uppercase block">
                Required Apparel Categories
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {uniformOptions.map((opt) => {
                  const isChecked = selectedTypes.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleCheckboxChange(opt)}
                      className={`px-4 py-3 rounded-xl text-xs font-sans text-left border flex items-center gap-2.5 transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-slate-50 border-primary font-bold text-primary ring-1 ring-primary' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by button click
                        className="rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer pointer-events-none"
                      />
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom specification File Uploader (Supports Drag-and-drop & Manual Click selection!) */}
            <div className="space-y-2">
              <label className="font-display font-bold text-xs text-primary uppercase block">
                Upload School Crest Emblem or Student Size Spreadsheet
              </label>
              
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                  dragActive 
                    ? 'border-primary bg-primary/5 scale-[1.01]' 
                    : 'border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
                id="file-drop-zone"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls,.png,.jpg,.jpeg,.pdf"
                  className="hidden"
                />

                {!attachedFile ? (
                  <>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm">
                      <Upload className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-display font-bold text-slate-700 text-xs">
                        Drag and drop file here, or <span className="text-secondary underline font-black">click to select</span>
                      </p>
                      <p className="font-sans text-[10px] text-text-muted">
                        Supports CSV, Excel spreadsheets, high-res images (PNG/JPG), and PDFs up to 10MB
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full bg-white p-3 rounded-xl border border-slate-100 shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-xs text-primary truncate max-w-[200px] sm:max-w-[300px]">
                          {attachedFile.name}
                        </p>
                        <p className="font-sans text-[9px] text-slate-400">
                          {(attachedFile.size / 1024).toFixed(1)} KB • Specifications Locked
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Remove specifications file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional details Textbox */}
            <div className="space-y-1.5">
              <label className="font-display font-bold text-xs text-primary uppercase block">
                Additional Design Customization & Notes
              </label>
              <textarea
                rows={4}
                placeholder="Specify preferred stripe hex-colors, pocket designs, button options, blazer liner specifications, or general sizing instructions..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-xs font-sans border border-slate-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-primary hover:bg-primary-light text-white font-display text-sm font-extrabold tracking-wide rounded-xl shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              id="submit-quote-proposal"
            >
              <span>Generate Quotation Sheet & Send Proposal</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </form>
        </div>

        {/* Right Side: Quote Estimator Panel (Span 5) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/60 flex flex-col justify-between text-left h-full" id="estimator-panel">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 bg-secondary-gold rounded-full animate-ping" />
              <h3 className="font-display font-black text-sm text-primary uppercase tracking-wider">
                Live Quotation Calculator
              </h3>
            </div>

            {/* If cart items exist, render item preview list */}
            {cartItems.length > 0 ? (
              <div className="space-y-4" id="estimator-cart-active">
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  These items currently configured in your cart will automatically combine into this proposal.
                </p>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const usesBulk = item.quantity >= 50;
                    const unitPrice = usesBulk ? item.product.bulkPrice : item.product.price;
                    return (
                      <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <img src={item.product.image} alt={item.product.name} referrerPolicy="no-referrer" className="w-8 h-8 object-contain bg-slate-50 rounded p-0.5 border border-slate-100" />
                          <div className="text-left">
                            <p className="font-display font-bold text-[11px] text-primary truncate max-w-[150px]">{item.product.name}</p>
                            <p className="font-sans text-[9px] text-slate-400">Qty: {item.quantity} pcs • Size {item.selectedSize}</p>
                          </div>
                        </div>
                        <span className="font-display font-bold text-xs text-primary">${(unitPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-primary text-white p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between text-xs opacity-90 font-sans">
                    <span>Total Uniform Units:</span>
                    <span className="font-bold">{cartTotalQty} pcs</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                    <span className="font-display font-bold text-xs">Estimated Proposal Value:</span>
                    <span className="font-display font-black text-base text-secondary-gold">${cartTotalCost.toFixed(2)}</span>
                  </div>
                </div>

                {cartTotalQty < 50 && (
                  <div className="bg-amber-50 text-amber-800 text-[10px] font-sans p-2.5 rounded-lg border border-amber-100 font-semibold leading-normal">
                    💡 Save up to <strong>${(cartItems.reduce((acc, item) => acc + ((item.product.price - item.product.bulkPrice) * item.quantity), 0)).toFixed(2)}</strong> on these exact garments by increasing total quantity to 50+ units.
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4" id="estimator-cart-empty">
                <p className="font-sans text-xs text-text-muted leading-relaxed">
                  No products are currently in your cart. You can submit a general inquiry form directly or browse our collections to bundle precise products!
                </p>

                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center py-8">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-xs text-primary">Pre-defined Uniform List</h4>
                  <p className="font-sans text-[10px] text-text-muted mt-1 max-w-[200px]">
                    Configure items from school or sports catalogs to receive a custom calculated PDF quotation slip instantly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick FAQ / Info block at bottom */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 space-y-3" id="estimator-faqs">
            <h4 className="font-display font-bold text-xs text-primary uppercase">What happens next?</h4>
            
            <ul className="space-y-2 text-[11px] text-text-muted font-sans">
              <li className="flex gap-2">
                <span className="text-secondary font-bold">1.</span>
                <span>An account specialist reviews fabric requirements and uploaded emblems.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">2.</span>
                <span>We generate physical swatch samples and mail them to your academy address.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">3.</span>
                <span>Production begins upon design and sample approval.</span>
              </li>
            </ul>

            <div className="bg-[#fffbeb] p-3 rounded-xl border border-amber-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary fill-secondary-gold shrink-0" />
              <span className="font-sans font-bold text-[10px] text-secondary">
                Free physical sample delivery included with all bulk requests!
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

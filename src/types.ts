export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  bulkPrice: number;
  category: 'school' | 'sports' | 'corporate' | 'accessories';
  image: string;
  isBestSeller?: boolean;
  subcategory?: string;
  fabric: string;
  gender: 'boys' | 'girls' | 'unisex';
  ageGroup: 'junior' | 'senior' | 'all';
  schoolLogo?: string;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem {
  id: string; // Unique combination of product ID, size, color
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface BulkInquiry {
  id: string;
  institutionName: string;
  contactPerson: string;
  email: string;
  studentCount: string;
  uniformTypes: string[];
  details: string;
  date: string;
  status: 'Pending Review' | 'Proposal Sent' | 'Approved' | 'In Production';
  fileName?: string;
}

export interface FilterState {
  genders: string[];
  ageGroups: string[];
  fabricTypes: string[];
  priceRange: [number, number];
  search: string;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'newest';
}

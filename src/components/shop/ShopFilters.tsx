'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ShopFilters() {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = ['Beauty', 'Health', 'Fashion', 'Electronics', 'Home'];
  const brands = ['Infinity Zone', 'Premium Brand', 'Luxury Line', 'Elite Series'];
  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100+', min: 100, max: Infinity },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Category
          {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#450209] focus:ring-[#450209]"
                />
                <span className="ml-2 text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Price Range
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#450209] focus:ring-[#450209]"
                />
                <span className="ml-2 text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Brand
          {openSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#450209] focus:ring-[#450209]"
                />
                <span className="ml-2 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left font-medium mb-3"
        >
          Rating
          {openSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {openSections.rating && (
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#450209] focus:ring-[#450209]"
                />
                <span className="ml-2 text-sm">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="w-full text-[#450209] border border-[#450209] py-2 px-4 rounded-lg hover:bg-[#450209] hover:text-white transition-colors">
        Clear All Filters
      </button>
    </div>
  );
}
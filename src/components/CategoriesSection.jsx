import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { itemCategories } from '../config/imageAssets';

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              Common Lost &amp; Found Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Item Type
            </h2>
          </div>
          
          <Link
            to="/browse"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>View all directory items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {itemCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/browse?category=${cat.id}`}
              className="bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-teal-300 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white group-hover:bg-teal-50/50 p-2.5 mb-3 border border-slate-100 flex items-center justify-center transition-colors">
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                />
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-tight mb-1">
                {cat.name}
              </h3>

              <span className="text-[11px] text-slate-500 font-medium">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

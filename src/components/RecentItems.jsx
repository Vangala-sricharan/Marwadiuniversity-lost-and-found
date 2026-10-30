import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, CheckCircle2, ArrowRight, Filter, AlertCircle } from 'lucide-react';
import ItemCard from './ItemCard';
import ItemDetailModal from './ItemDetailModal';
import { getStoredReports } from '../services/storage';

export default function RecentItems() {
  const [items, setItems] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setItems(getStoredReports());
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <section id="recent-items" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold tracking-wide uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Live Campus Bulletin
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recently Reported Belongings
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Latest items logged by Marwadi University students and security desks across campus blocks.
            </p>
          </div>

          {/* Action shortcuts */}
          <div className="flex items-center gap-3">
            <Link
              to="/report-lost"
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-rose-500" />
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className="px-4 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#09576c] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-200" />
              Report Found
            </Link>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Type filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Items ({items.length})
            </button>

            <button
              onClick={() => setFilterType('lost')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'lost'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Lost Items ({items.filter(i => i.type === 'lost').length})
            </button>

            <button
              onClick={() => setFilterType('found')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'found'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              Found Items ({items.filter(i => i.type === 'found').length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, location..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching items found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or check back soon as campus reports are updated.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.slice(0, 6).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedItem(selected)}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-teal-400 hover:shadow-md text-slate-800 hover:text-teal-800 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Explore Complete Campus Archive ({items.length} Reports)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}

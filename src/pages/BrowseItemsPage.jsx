import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Inbox
} from 'lucide-react';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';
import { campusLocations, itemCategories } from '../config/imageAssets';
import { getStoredReports } from '../services/storage';

export default function BrowseItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'lost' | 'found'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  useEffect(() => {
    setItems(getStoredReports());
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter items
  const filtered = items.filter(item => {
    const matchType = selectedType === 'all' || item.type === selectedType;
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchLoc = selectedLocation === 'all' || item.location === selectedLocation;
    const matchQuery = 
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.specificSpot && item.specificSpot.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchType && matchCat && matchLoc && matchQuery;
  });

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              University Public Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Browse Campus Belongings
            </h1>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Live repository of lost and found items reported across Marwadi University.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/report-lost"
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-rose-500" />
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className="px-4 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#09576c] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-200" />
              Report Found
            </Link>
          </div>
        </div>

        {/* Filters and Controls Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-8 space-y-5">
          
          {/* Row 1: Search and Type Switcher */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keywords, brand, color, or spot (e.g. Casio, Dell, Lab 402)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* Type Switcher Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl shrink-0">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Reports ({items.length})
              </button>
              <button
                onClick={() => setSelectedType('lost')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedType === 'lost'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-rose-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                Lost ({items.filter(i => i.type === 'lost').length})
              </button>
              <button
                onClick={() => setSelectedType('found')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedType === 'found'
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-teal-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                Found ({items.filter(i => i.type === 'found').length})
              </button>
            </div>

          </div>

          {/* Row 2: Category and Location Selectors */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Category Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (e.target.value === 'all') {
                      setSearchParams({});
                    } else {
                      setSearchParams({ category: e.target.value });
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Categories</option>
                  {itemCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Zone:</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-medium bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500 max-w-[220px] truncate"
                >
                  <option value="all">All Campus Locations</option>
                  {campusLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Reset Filters button */}
            {(selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors ml-auto sm:ml-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filtered.length} matching reports</span>
          <span>Updated in real time via LocalStorage</span>
        </div>

        {/* Items Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No items match your criteria</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try removing some filters or searching for alternate keywords. If you lost an item recently, feel free to file a report now.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Reset Filters
              </button>
              <Link
                to="/report-lost"
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 shadow-sm"
              >
                Report Lost Item
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={(selected) => setActiveModalItem(selected)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      {activeModalItem && (
        <ItemDetailModal
          item={activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />
      )}
    </div>
  );
}

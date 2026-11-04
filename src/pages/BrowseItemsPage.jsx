import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Inbox,
  Loader2,
  AlertCircle,
  Database
} from 'lucide-react';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';
import { campusLocations, itemCategories } from '../config/imageAssets';
import { fetchReports } from '../services/api';

export default function BrowseItemsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'lost' | 'found'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadReports = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchReports({
        type: selectedType,
        category: selectedCategory,
        location: selectedLocation,
        search: searchQuery,
        limit: 50,
      });
      setItems(data.reports || []);
      setTotalCount(data.total || 0);
    } catch (err) {
      console.error('Error fetching reports from MongoDB:', err);
      setErrorMessage(err.message || 'Failed to load reports from MongoDB Atlas.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedType, selectedCategory, selectedLocation, searchQuery]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams, selectedCategory]);

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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by item name, description, or specific spot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Type Switcher: All / Lost / Found */}
            <div className="md:col-span-5 flex items-center bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setSelectedType('all')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedType === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Items
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('lost')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedType === 'lost'
                    ? 'bg-rose-50 text-rose-700 shadow-sm border border-rose-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lost Only
              </button>
              <button
                type="button"
                onClick={() => setSelectedType('found')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedType === 'found'
                    ? 'bg-teal-50 text-teal-800 shadow-sm border border-teal-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Found Only
              </button>
            </div>

          </div>

          {/* Row 2: Category and Location Selects */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Category Dropdown */}
              <div className="w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    if (e.target.value === 'all') {
                      searchParams.delete('category');
                      setSearchParams(searchParams);
                    } else {
                      setSearchParams({ category: e.target.value });
                    }
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="all">All Categories</option>
                  {itemCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Dropdown */}
              <div className="w-full sm:w-auto">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="all">All Campus Locations</option>
                  {campusLocations.map(loc => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Reset Filters button */}
            {(selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors ml-auto sm:ml-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
          </div>

        </div>

        {/* Results Counter & DB Indicator */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {items.length} matching reports ({totalCount} total in database)</span>
          <span className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 font-semibold">
            <Database className="w-3 h-3 text-teal-600" />
            MongoDB Atlas Live Source of Truth
          </span>
        </div>

        {/* Error Banner with Retry */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={loadReports}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-teal-600 animate-spin mb-3" />
            <h3 className="text-sm font-bold text-slate-700">Connecting to MongoDB Atlas...</h3>
            <p className="text-xs text-slate-400 mt-1">Retrieving latest university reports</p>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all'
                ? 'No items match your criteria'
                : 'No Belongings Reported Yet'}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all'
                ? 'Try removing some filters or searching for alternate keywords.'
                : 'CampusFind is initialized with a fresh MongoDB Atlas database. Newly submitted Lost & Found reports will appear here in real time.'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all') && (
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
              <Link
                to="/report-lost"
                className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 shadow-sm"
              >
                Report Lost Item
              </Link>
              <Link
                to="/report-found"
                className="px-5 py-2.5 rounded-xl bg-[#0E7490] hover:bg-[#09576c] text-white text-xs font-bold shadow-sm"
              >
                Report Found Item
              </Link>
            </div>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <ItemCard
                key={item.token || item.id}
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
          onUpdate={(updated) => {
            loadReports();
            setActiveModalItem(updated);
          }}
        />
      )}
    </div>
  );
}

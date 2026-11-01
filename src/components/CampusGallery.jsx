import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Camera, 
  MapPin, 
  Maximize2, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ShieldCheck, 
  Sparkles,
  Layers
} from 'lucide-react';
import { campusGalleryPhotos } from '../config/imageAssets';

export default function CampusGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  // Available filter tabs covering all university locations and life categories
  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'academic', label: 'Academic Buildings' },
    { id: 'hostels', label: 'Hostels & Residences' },
    { id: 'labs', label: 'Classrooms & Labs' },
    { id: 'campus', label: 'Campus & Gardens' },
    { id: 'events', label: 'Events & Fests' },
  ];

  // Dynamic count map for each category
  const counts = useMemo(() => {
    const map = { all: campusGalleryPhotos.length };
    campusGalleryPhotos.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, []);

  // Filtered photos based on active tab
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return campusGalleryPhotos;
    return campusGalleryPhotos.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Collapse or maintain visible items (exactly 6 initially when collapsed)
  const displayedItems = useMemo(() => {
    if (isExpanded) return filteredItems;
    return filteredItems.slice(0, 6);
  }, [isExpanded, filteredItems]);

  // Reset expansion state when changing category
  const handleFilterChange = (tabId) => {
    setActiveFilter(tabId);
    setIsExpanded(false);
  };

  // Lightbox handlers
  const openModal = (index) => {
    setActiveModalIndex(index);
  };

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setActiveModalIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  }, [filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, closeModal, handlePrev, handleNext]);

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (activeModalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalIndex]);

  const activePhoto = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <section id="campus-gallery" className="py-20 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-3">
              <Camera className="w-3.5 h-3.5 text-teal-600" />
              Verified Marwadi University Photography
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campus &amp; Life Gallery
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Authentic photographs showcasing Marwadi University’s academic architecture, student hostels, research laboratories, 
              campus lake, sports facilities, annual MU Fest, and convocation across our 32-acre Rajkot campus.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5 text-teal-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              {campusGalleryPhotos.length} Verified Photos
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              5 Core Categories
            </span>
          </div>
        </div>

        {/* Filter Categories Tabs */}
        <div className="relative mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
            {filterTabs.map((tab) => {
              const count = counts[tab.id] || 0;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid: exactly 6 photographs on initial load, expandable to 30+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openModal(index)}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300 flex flex-col"
            >
              {/* Aspect-Ratio Image Container: Standard 16:9 landscape ratio */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  style={{ objectPosition: item.objectPosition || 'center center' }}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/college/marwadi-main-building.jpg';
                  }}
                />

                {/* Gradient Overlays for Optimal Text Readability & Architectural Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Top-Right Expand Icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-900/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                </div>

                {/* Bottom Card Information */}
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <h3 className="font-bold text-sm sm:text-base leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-teal-300 pt-1.5 border-t border-white/10">
                    <span className="flex items-center gap-1 font-medium truncate">
                      <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                      Click to expand
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state (safety fallback) */}
        {displayedItems.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <Camera className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No photos in this category</h3>
            <p className="text-xs text-slate-500 mt-1">Please select another category tab above.</p>
          </div>
        )}

        {/* View All / Show Less Toggle Button */}
        {filteredItems.length > 6 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-900 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all duration-200 active:scale-98 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  <span>Show Less (Display 6)</span>
                  <ChevronUp className="w-4 h-4 text-teal-300" />
                </>
              ) : (
                <>
                  <span>View All Images ({filteredItems.length})</span>
                  <ChevronDown className="w-4 h-4 text-teal-300" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-500 mt-2.5 font-medium">
              {isExpanded 
                ? `Showing all ${filteredItems.length} photographs` 
                : `Showing 6 of ${filteredItems.length} photographs`}
            </p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {activePhoto.categoryLabel}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Photo {activeModalIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Frame with Previous / Next Arrows */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[72vh]">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[72vh] w-auto max-w-full object-contain select-none"
                onError={(e) => {
                  e.currentTarget.src = '/images/college/marwadi-main-building.jpg';
                }}
              />

              {/* Previous Photo Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Photo Button */}
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/70 hover:bg-slate-900/95 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Modal Footer / Metadata */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white border-t border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {activePhoto.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {activePhoto.caption}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{activePhoto.location}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-teal-300 flex items-center gap-1.5 bg-teal-950/60 px-3 py-1.5 rounded-xl border border-teal-800/50">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{activePhoto.source}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

import React, { useState } from 'react';
import { Building2, MapPin, Maximize2, Shield, Sparkles } from 'lucide-react';
import { campusShowcase } from '../config/imageAssets';

export default function CampusShowcase() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="campus-showcase" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-xs font-bold tracking-wide uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            Marwadi University Campus Zones
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Key Campus Landmarks &amp; Collection Hubs
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Reported items are mapped directly to official buildings and security desks across our 32+ acre Rajkot campus.
          </p>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusShowcase.map((landmark) => (
            <div
              key={landmark.id}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={landmark.image}
                  alt={landmark.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/images/college/marwadi-main-building.jpg';
                  }}
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>

                {/* Badge Overlay */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {landmark.badge}
                  </span>
                </div>

                {/* Expand button */}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(landmark)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                  title="Expand photograph"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Bottom image text */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-teal-300 text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {landmark.location}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {landmark.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {landmark.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    Security desk coverage
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(landmark)}
                    className="text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-1"
                  >
                    View photograph
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] bg-black flex items-center justify-center">
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-white">{selectedPhoto.title}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {selectedPhoto.location}
                </p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Official Marwadi Campus Facility
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

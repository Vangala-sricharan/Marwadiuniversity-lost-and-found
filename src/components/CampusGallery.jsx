import React, { useState } from 'react';
import { Camera, MapPin, Maximize2 } from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function CampusGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState(null);

  const galleryItems = [
    {
      id: 'main-exterior',
      title: 'Main Academic Campus Façade',
      category: 'academic',
      categoryLabel: 'Academic Complex',
      image: imageAssets.college.mainBuilding,
      caption: 'The landmark glass-façade administrative and academic complex of Marwadi University.',
      location: 'Central Campus Plaza, Rajkot',
    },
    {
      id: 'central-library',
      title: 'Digital Central Library & Reading Hall',
      category: 'facilities',
      categoryLabel: 'Facilities',
      image: imageAssets.college.library,
      caption: 'Over 50,000 reference volumes, journals, and quiet reading study spaces.',
      location: 'Knowledge Center, Block B',
    },
    {
      id: 'pg-research',
      title: 'Postgraduate & Research Block',
      category: 'academic',
      categoryLabel: 'Academic Complex',
      image: imageAssets.college.pgBuilding,
      caption: 'Specialized faculty offices, PG seminar halls, and incubation centers.',
      location: 'East Wing Campus Complex',
    },
    {
      id: 'amphitheatre',
      title: 'University Open-Air Amphitheatre',
      category: 'culture',
      categoryLabel: 'Student Life',
      image: imageAssets.college.amphitheatre,
      caption: 'Outdoor multi-tiered amphitheatre for festivals, tech meets, and student assemblies.',
      location: 'Campus Amphitheatre Quad',
    },
    {
      id: 'auditorium',
      title: 'Grand University Auditorium',
      category: 'facilities',
      categoryLabel: 'Facilities',
      image: imageAssets.college.auditorium,
      caption: 'World-class auditorium hosting international conferences, convocations, and guest lectures.',
      location: 'Auditorium Complex',
    },
    {
      id: 'cafeteria',
      title: 'Multi-Cuisine Campus Food Court',
      category: 'culture',
      categoryLabel: 'Student Life',
      image: imageAssets.college.cafeteria,
      caption: 'Vibrant dining area serving hygienic multi-regional cuisines and refreshments.',
      location: 'Student Amenities Block',
    },
    {
      id: 'advance-lab',
      title: 'Advanced Engineering & Computing Lab',
      category: 'academic',
      categoryLabel: 'Academic Complex',
      image: imageAssets.college.advanceLab,
      caption: 'High-performance computing workstations, IoT hardware kits, and robotics bays.',
      location: 'Main Tower 4th Floor',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-3">
              <Camera className="w-3.5 h-3.5 text-teal-600" />
              Verified Campus Photography
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Marwadi University Campus Gallery
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Actual photographs of our campus infrastructure where items are most frequently found and retrieved.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'academic', label: 'Academic Buildings' },
              { id: 'facilities', label: 'Facilities & Library' },
              { id: 'culture', label: 'Student Life & Quad' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/images/college/marwadi-main-building.jpg';
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Content anchored at bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-base sm:text-lg leading-snug group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1">
                    {item.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-teal-300">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] bg-black flex items-center justify-center">
              <img
                src={activeModalPhoto.image}
                alt={activeModalPhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
              <button
                onClick={() => setActiveModalPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-slate-900 text-white">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">
                    {activeModalPhoto.categoryLabel}
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {activeModalPhoto.title}
                  </h4>
                  <p className="text-sm text-slate-300 mt-1">
                    {activeModalPhoto.caption}
                  </p>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  {activeModalPhoto.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

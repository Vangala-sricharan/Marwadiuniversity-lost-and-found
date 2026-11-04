import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Camera, MapPin, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import CampusShowcase from '../components/CampusShowcase';
import CampusGallery from '../components/CampusGallery';

/**
 * CampusLandmarksPage
 *
 * Dedicated page for Marwadi University Campus Landmarks and 30+ photo gallery.
 * Consolidates campus zones, academic buildings, hostels, labs, and student event photos.
 */
export default function CampusLandmarksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Page Header / Hero Banner */}
      <section className="bg-gradient-to-r from-[#07162C] via-[#0A1A2F] to-[#122B4D] text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-teal-400 font-semibold">Campus Landmarks &amp; Gallery</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Marwadi University Campus Exploration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Campus Landmarks &amp; Photo Gallery
              </h1>
              <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Explore key collection zones, academic complexes, research laboratories, and authentic 
                photographs from the 32-acre Marwadi University campus in Rajkot, Gujarat.
              </p>
            </div>

            {/* Quick Action to Collection Desks */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/campus-guide"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-200"
              >
                <MapPin className="w-4 h-4" />
                <span>View Collection Desks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-slate-400 flex items-center gap-2 justify-center lg:justify-start">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Security Desk: MB315</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Key Campus Landmarks & Collection Hubs */}
      <CampusShowcase />

      {/* 2. Campus & Life Photo Gallery (30+ authentic photographs) */}
      <CampusGallery />
    </div>
  );
}

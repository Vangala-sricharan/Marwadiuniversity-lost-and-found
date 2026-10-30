import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Primary Full-Screen Hero Background: Supplied Marwadi University Main Building */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageAssets.college.mainBuilding}
          alt="Marwadi University Main Academic Campus"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-102 transform duration-1000 ease-out"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Subtle dark overlay designed to make text crisp while preserving full campus architecture clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061224]/92 via-[#081830]/80 to-[#0c2445]/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061224] via-transparent to-[#061224]/40"></div>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white w-full">
        <div className="max-w-3xl">
          
          {/* University Credential Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-cyan-200 mb-6 shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span>Marwadi University Official Lost &amp; Found Portal</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">NAAC A+ Accredited</span>
          </div>

          {/* Required Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-sm">
            Lost Something? <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
              Find It Again.
            </span>
          </h1>

          {/* Required Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal mb-8 max-w-2xl drop-shadow-sm">
            A smarter way to reconnect lost belongings with their owners at Marwadi University.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <Link
              to="/report-lost"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base shadow-lg shadow-rose-950/40 hover:shadow-rose-600/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <PlusCircle className="w-5 h-5 text-rose-200" />
              <span>Report Lost Item</span>
            </Link>

            <Link
              to="/report-found"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-teal-950/40 hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>Report Found Item</span>
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-bold text-sm transition-all"
            >
              <Search className="w-4 h-4 text-cyan-300" />
              <span>Track by Token</span>
            </Link>

            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-sm transition-all"
            >
              <span>Browse Archive</span>
            </Link>
          </div>

          {/* Quick Metrics / Verified Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">No Login</p>
                <p className="text-xs text-slate-300">Instant Student Access</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">15+ Zones</p>
                <p className="text-xs text-slate-300">Exact Campus Blocks</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Security Desk</p>
                <p className="text-xs text-slate-300">Verified Gate Handover</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Floating Scroll Cue */}
      <div className="absolute bottom-4 inset-x-0 z-10 flex justify-center pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"></span>
          Scroll to explore Marwadi University campus facilities &amp; reported items
        </div>
      </div>
    </div>
  );
}

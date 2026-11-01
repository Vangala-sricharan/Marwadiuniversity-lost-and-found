import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  MapPin, 
  Clock,
  Sparkles
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100svh-80px)] lg:h-[calc(100vh-85px)] lg:max-h-[820px] w-full max-w-full flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Primary Full-Screen Hero Background: Supplied Marwadi University Main Building */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
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
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#061224]/92 via-[#081830]/80 to-[#0c2445]/85"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#061224] via-transparent to-[#061224]/40"></div>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-3 text-white">
        <div className="max-w-3xl">
          
          {/* University Credential & MB315 Assistance Badge */}
          <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wide text-cyan-200 mb-2.5 sm:mb-3 shadow-md shadow-black/20">
            <span className="flex items-center gap-1.5 text-teal-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              <span>Marwadi University Prototype</span>
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-white font-medium">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <span>MB315 – Further Assistance</span>
            </span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-slate-300 font-normal">
              <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Mon – Sat | 8:30 AM – 6:00 PM</span>
            </span>
          </div>

          {/* Required Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold tracking-tight text-white leading-[1.12] mb-2 sm:mb-2.5 drop-shadow-sm">
            Lost Something? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">
              Find It Again.
            </span>
          </h1>

          {/* Required Supporting Text */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-slate-200/95 leading-relaxed font-normal mb-3.5 sm:mb-4 max-w-2xl drop-shadow-sm">
            A smarter way to reconnect lost belongings with their owners at Marwadi University.
          </p>

          {/* Primary Action Buttons - In ONE horizontal row on desktop */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-2 sm:gap-2.5 mb-4 sm:mb-4.5">
            <Link
              to="/report-lost"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-950/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-rose-200 shrink-0" />
              <span>Report Lost Item</span>
            </Link>

            <Link
              to="/report-found"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-teal-950/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Report Found Item</span>
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-cyan-400/40 text-cyan-200 font-bold text-xs sm:text-sm hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span>Track by Token</span>
            </Link>

            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-xs sm:text-sm hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              <span>Browse Archive</span>
            </Link>
          </div>

          {/* Quick Metrics / Verified Badges - Compact layout to guarantee above-the-fold visibility */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-white/15 max-w-3xl">
            <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">No Login</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">Instant Access</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">15+ Zones</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">Campus Blocks</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-white truncate">Security Desk</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 truncate">Verified Handover</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Floating Scroll Cue */}
      <div className="absolute bottom-1.5 inset-x-0 z-10 flex justify-center pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"></span>
          <span>Scroll to explore Marwadi University campus facilities &amp; reports</span>
        </div>
      </div>
    </div>
  );
}

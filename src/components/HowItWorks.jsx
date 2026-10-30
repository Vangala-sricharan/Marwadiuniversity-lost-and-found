import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Submit in Under 60 Seconds',
      description: 'Zero account friction. Enter the item name, description, approximate date/time, and campus location where it was lost or spotted.',
      icon: FileText,
      badge: 'Zero Login Needed',
      accent: 'from-blue-600 to-cyan-500',
    },
    {
      step: '02',
      title: 'Campus-Wide Directory Sync',
      description: 'Your report is instantly indexed in the Marwadi University directory, categorised by building zone (Labs, Library, Food Court, Hostels).',
      icon: Search,
      badge: 'Instant Match',
      accent: 'from-teal-600 to-emerald-500',
    },
    {
      step: '03',
      title: 'Safe Collection & Verification',
      description: 'Owners verify ownership at the Central Security Desk or coordinate directly with the reporter using student email or contact.',
      icon: ShieldCheck,
      badge: 'Secure Handover',
      accent: 'from-slate-800 to-teal-900',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200/80 text-xs font-bold tracking-wide uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-600" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CampusFind Works
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Designed specifically for Marwadi University students, faculty, and campus staff. No barriers, no bureaucratic delays.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 -translate-y-12 z-0 pointer-events-none"></div>

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative z-10 bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step badge & icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-slate-200 tracking-tight">
                      {item.step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-3">
                    {item.badge}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-teal-700 font-semibold">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Student-verified protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#0E3B5C] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-900/10">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Found an unattended bag, ID card, or calculator?
            </h4>
            <p className="text-sm text-slate-300">
              Help your fellow Marwadi student today. Reports take less than 1 minute to submit.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/report-found"
              className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              Report Found Item
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

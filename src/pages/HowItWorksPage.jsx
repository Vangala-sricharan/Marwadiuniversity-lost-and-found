import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  FileText, 
  QrCode, 
  Search, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Printer, 
  HelpCircle,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';

/**
 * HowItWorksPage
 *
 * Dedicated comprehensive guide to the CampusFind system workflow:
 * - Reporting Lost & Found items
 * - 12-digit token generation
 * - Printable Belonging ID Tags with QR scanning
 * - Status timeline tracking
 * - Safe verified handover at MB315
 */
export default function HowItWorksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const workflows = [
    {
      num: '01',
      title: 'Reporting Lost Items',
      desc: 'Quickly register lost belongings with category, location zone, approximate date/time, and photo. Require valid 6-digit GR Number and @marwadiuniversity.ac.in student email for verification.',
      icon: PlusCircle,
      badge: 'Lost Report',
      actionText: 'Report Lost Item',
      actionUrl: '/report-lost',
      buttonBg: 'bg-rose-600 hover:bg-rose-500 text-white',
    },
    {
      num: '02',
      title: 'Reporting Found Items',
      desc: 'Found an unattended item? Submit item details and surrender it at the nearest collection point or MB315. Generates a unique 12-digit registration token for tracking.',
      icon: CheckCircle2,
      badge: 'Found Report',
      actionText: 'Report Found Item',
      actionUrl: '/report-found',
      buttonBg: 'bg-teal-500 hover:bg-teal-400 text-slate-950',
    },
    {
      num: '03',
      title: 'Printable Belonging ID Tag',
      desc: 'Generate a printable ID tag with dashed cutting border, QR code, and token to affix to laptop bags, calculators, and water bottles for instant camera scan recovery.',
      icon: Printer,
      badge: 'Preventive Tag',
      actionText: 'Generate in Report Flow',
      actionUrl: '/report-lost',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
    {
      num: '04',
      title: '5-Stage Token Status Tracking',
      desc: 'Use your 12-digit registration token (e.g. 2026-8491-0372) to monitor recovery progress in real time across Report Received, In Review, Match Found, Ready for Pickup, and Returned.',
      icon: Search,
      badge: 'Live Status',
      actionText: 'Track Your Item',
      actionUrl: '/track',
      buttonBg: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Page Header / Hero Banner */}
      <section className="bg-gradient-to-r from-[#07162C] via-[#0A1A2F] to-[#122B4D] text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-cyan-300 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-400 font-semibold">How It Works</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Complete System Walkthrough</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                How CampusFind Works
              </h1>
              <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                A streamlined, zero-friction system designed specifically for Marwadi University students, 
                faculty, and campus security staff to report, track, and recover lost belongings.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="shrink-0 flex flex-wrap gap-2.5">
              <Link
                to="/report-lost"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Lost</span>
              </Link>
              <Link
                to="/report-found"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Report Found</span>
              </Link>
              <Link
                to="/track"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-200 border border-cyan-400/40 font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Track Token</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Core 3-Step Process Component */}
      <HowItWorks />

      {/* 2. Detailed 4-Pillar Workflow Cards */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Detailed Operational Protocols
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Each step is built with student privacy, campus location mapping, and security desk verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {workflows.map((flow) => {
              const Icon = flow.icon;
              return (
                <div
                  key={flow.num}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black font-mono text-slate-200">
                        {flow.num}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {flow.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {flow.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {flow.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={flow.actionUrl}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all ${flow.buttonBg}`}
                    >
                      <span>{flow.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-xs text-slate-400 font-medium">
                      Same-tab action
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. QR Code Recovery & Printable Badge Explanation */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0F2347] via-[#0A1A2F] to-[#1E3A8A] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                  <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Smart QR Belonging Protection</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Camera-Scannable Recovery Without Exposing Personal Contact Info
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Every submitted report generates a high-resolution printable ID tag. If someone discovers 
                  your tagged item on campus, they simply scan the QR code with any standard smartphone camera. 
                  It opens the item recovery screen where the finder can submit recovery details directly to security.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-teal-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    Automatic Phone/Email Masking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    One-Click Full PNG Badge Download
                  </span>
                </div>
              </div>

              {/* Physical Demonstration Desk Callout */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300 block">
                      Physical Assistance Desk
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      Room MB315, Main Building
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  For physical handover of valuable items (wallets, electronics, gold jewelry), visit MB315 during campus operating hours.
                </p>
                <div className="flex items-center gap-2 text-xs text-cyan-200">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Monday – Saturday | 8:30 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Component */}
      <Features />
    </div>
  );
}

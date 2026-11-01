import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  PlusCircle, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck, 
  Info, 
  Building2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Printer, 
  Phone, 
  ChevronRight,
  ExternalLink,
  Lock,
  Layers,
  Database,
  MapPin
} from 'lucide-react';

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState('lost-item');

  const scrollTo = (id) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            Official Help Center &amp; User Manual
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Step-by-step guides for reporting lost or found belongings, printing QR identification tags, tracking token status, and understanding prototype guidelines.
          </p>
        </div>

        {/* Quick Navigation Anchor Bar */}
        <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-slate-200/90 shadow-sm mb-10 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => scrollTo('report-lost')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'report-lost' 
                  ? 'bg-rose-600 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report Lost Item</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('report-found')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'report-found' 
                  ? 'bg-teal-700 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Report Found Item</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('track-report')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'track-report' 
                  ? 'bg-cyan-700 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Report</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('qr-badge')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'qr-badge' 
                  ? 'bg-[#0F2347] text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Badge Guide</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo('important-info')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'important-info' 
                  ? 'bg-amber-600 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Important Info</span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* SECTION A: HOW TO REPORT A LOST ITEM (6 STEPS) */}
          <section id="report-lost" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <PlusCircle className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Section A</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    How to Report a Lost Item
                  </h2>
                </div>
              </div>

              <Link
                to="/report-lost"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors w-fit shadow-xs"
              >
                <span>Open Report Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              If you have misplaced personal belongings, electronics, study materials, or identity cards anywhere on the Marwadi University campus, follow these six sequential steps to create a verified record:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  step: 1,
                  title: 'Navigate to Report Lost',
                  desc: 'Access the Report Lost form from the header navigation bar, mobile menu, or homepage call-to-action banner.',
                },
                {
                  step: 2,
                  title: 'Specify Item Details',
                  desc: 'Enter your item title (e.g. Dell Laptop Charger), select an official category, and provide detailed physical markings, colors, or unique identifiers.',
                },
                {
                  step: 3,
                  title: 'Designate Campus Location',
                  desc: 'Choose the relevant campus area (MB Building, Academic Block, Library, Cafeteria, Sports Ground, Parking Area) or select "Other" to enter a custom location.',
                },
                {
                  step: 4,
                  title: 'Record Date and Approximate Time',
                  desc: 'Provide the exact calendar date and estimated time window when you last had possession of your belonging.',
                },
                {
                  step: 5,
                  title: 'Add Student Contact Safeguards',
                  desc: 'Enter your valid university email address or mobile number. CampusFind masks your contact details publicly to guard against unsolicited calls.',
                },
                {
                  step: 6,
                  title: 'Submit & Collect 12-Digit Token',
                  desc: 'Submit your report to immediately generate your unique 12-digit registration token (DDMMYYYYHHmm) and unlock your printable QR recovery badge.',
                },
              ].map((s) => (
                <div key={s.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION B: HOW TO REPORT A FOUND ITEM (5 STEPS) */}
          <section id="report-found" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">Section B</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    How to Report a Found Item
                  </h2>
                </div>
              </div>

              <Link
                to="/report-found"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold uppercase tracking-wider transition-colors w-fit shadow-xs"
              >
                <span>Report Found Item</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              When you discover an unattended belonging across classrooms, corridors, or campus grounds, follow these five steps to help reunite it with its rightful owner:
            </p>

            <div className="space-y-3.5">
              {[
                {
                  step: 1,
                  title: 'Open the Report Found Form',
                  desc: 'Click "Report Found" in the main navigation or select the quick button on the homepage.',
                },
                {
                  step: 2,
                  title: 'Describe the Item Neutrally',
                  desc: 'Provide an honest description of the found object without disclosing private personal codes, wallet cash amounts, or serial numbers that only the real owner can verify.',
                },
                {
                  step: 3,
                  title: 'Designate Found Location & Custody Status',
                  desc: 'Specify where the item was found and state where it is currently held (e.g. deposited at MB315, handed to Security Gatehouse, or retained in finder care).',
                },
                {
                  step: 4,
                  title: 'Provide Finder Verification Contact',
                  desc: 'Provide your name and contact phone or email. This allows university coordinators or the owner to arrange a safe, verified handover.',
                },
                {
                  step: 5,
                  title: 'Submit and Broadcast to Directory',
                  desc: 'Submit your entry to generate a 12-digit registration token. The item will appear immediately in the public Browse directory so the searching owner can locate it.',
                },
              ].map((s) => (
                <div key={s.step} className="p-4 rounded-2xl bg-teal-50/40 border border-teal-200/80 flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION C: HOW TO TRACK A REPORT (3 STEPS) */}
          <section id="track-report" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 block">Section C</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    How to Track a Report
                  </h2>
                </div>
              </div>

              <Link
                to="/track"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold uppercase tracking-wider transition-colors w-fit shadow-xs"
              >
                <span>Track Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Every submitted lost or found report receives an immutable 12-digit timestamp registration token formatted as <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-teal-800 text-xs">DDMMYYYYHHmm</code>. Track your case in three easy steps:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: 1,
                  title: 'Visit Tracking Portal',
                  desc: 'Navigate to the Track Report page via the top navigation bar or direct URL (/track).',
                },
                {
                  step: 2,
                  title: 'Input 12-Digit Token',
                  desc: 'Enter all 12 digits received upon submission (or click one of the preloaded sample test tokens).',
                },
                {
                  step: 3,
                  title: 'Inspect 4-Stage Status',
                  desc: 'Examine current status on the visual lifecycle timeline (Submitted → Under Verification → Recovered → Closed), review audit notes, and access recovery guidelines for MB315.',
                },
              ].map((s) => (
                <div key={s.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-cyan-700 text-white flex items-center justify-center font-mono font-bold text-xs mb-3">
                      {s.step}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-cyan-800 font-semibold flex items-center gap-1">
                    <span>Instant Lookup</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION D: HOW TO USE A QR BADGE (5 STEPS) */}
          <section id="qr-badge" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-[#0F2347] flex items-center justify-center shrink-0">
                  <QrCode className="w-6 h-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">Section D</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    How to Use a QR Identification Badge
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  Print Ready &bull; High Resolution
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              CampusFind provides printable Belonging Identification Tags equipped with safe QR recovery links. Affixing one to your property allows any finder to return your item immediately without viewing your private personal number:
            </p>

            <div className="space-y-3.5">
              {[
                {
                  step: 1,
                  title: 'Open QR Badge Preview',
                  desc: 'After submitting a report or from the Track Report page, click "Print Belonging QR Tag" to open the centered viewport modal.',
                },
                {
                  step: 2,
                  title: 'Inspect Two-Column Layout',
                  desc: 'Check the left QR code column and the right details column, verifying your item name, registration token, owner label, and the official recovery notice.',
                },
                {
                  step: 3,
                  title: 'Print or Download the Badge',
                  desc: 'Click "Print Sticker Tag" for dedicated print-mode output or "Download PNG" to export the complete ID tag badge with dashed cutting border, branding, QR code, and MB315 assistance instructions.',
                },
                {
                  step: 4,
                  title: 'Cut & Attach to Your Possessions',
                  desc: 'Cut along the designated scissor guidelines and attach the tag to your laptop, calculator case, water bottle, backpack, or student ID lanyard.',
                },
                {
                  step: 5,
                  title: 'Instant Safe Return Scanning',
                  desc: 'When anyone scans your tag with a smartphone camera, they are routed to https://marwadiuniversity-lost-and-found.vercel.app/recover/[token], where they can notify you or deliver the property to MB315.',
                },
              ].map((s) => (
                <div key={s.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0F2347] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION E: IMPORTANT INFORMATION & PROTOTYPE POLICIES */}
          <section id="important-info" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm scroll-mt-36">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
              <span className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Info className="w-6 h-6" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">Section E</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Important Information &amp; Prototype Guidelines
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* LocalStorage Data Boundary */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-teal-600" />
                  <span>Browser LocalStorage Data Boundary</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CampusFind is architected as a client-side web application. All reports, tokens, and timeline statuses are stored locally in your browser&apos;s LocalStorage. Clearing your browsing data or site cache will reset stored entries back to sample seed records.
                </p>
              </div>

              {/* 12-Digit Token Safety */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Lock className="w-4 h-4 text-cyan-600" />
                  <span>Token Safety &amp; Custody Verification</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your 12-digit token is your unique claim ticket. When collecting an item from campus security or MB315, present both your registration token and your official Marwadi University student RFID card for custody verification.
                </p>
              </div>

              {/* Student Privacy Protection */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Student Privacy Protection</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To prevent unauthorized harassment, spam, or identity harvesting, phone numbers and emails are masked in public browse and recovery directories. Only designated coordinators at MB315 handle direct physical claims.
                </p>
              </div>

              {/* Independent Student Prototype */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span>Independent Student Project Prototype</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  CampusFind is an independent academic project developed for engineering coursework and demonstration. It is not an official university website or a legally binding custody service.
                </p>
              </div>

            </div>

            {/* Assistance Location Callout */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0F2347] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold">Physical Assistance Location: MB315, Marwadi University</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Main Academic Building, 3rd Floor &bull; Operational Hours: Monday to Saturday, 8:30 AM &ndash; 6:00 PM
                  </p>
                </div>
              </div>
              <Link
                to="/campus-guide"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 text-center"
              >
                Campus Guide &rarr;
              </Link>
            </div>

          </section>

          {/* QUICK LINKS DIRECTORY BOX */}
          <section className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              Quick Reference Links
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link
                to="/faq"
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all font-semibold text-slate-700 hover:text-teal-700 flex items-center justify-between"
              >
                <span>FAQs</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/terms"
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all font-semibold text-slate-700 hover:text-teal-700 flex items-center justify-between"
              >
                <span>Terms &amp; Conditions</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/track"
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all font-semibold text-slate-700 hover:text-teal-700 flex items-center justify-between"
              >
                <span>Track Report</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                to="/"
                className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all font-semibold text-slate-700 hover:text-teal-700 flex items-center justify-between"
              >
                <span>Portal Home</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

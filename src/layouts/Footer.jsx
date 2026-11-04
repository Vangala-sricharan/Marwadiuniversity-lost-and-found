import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  Building2,
  Lock,
  Cookie,
  MessageSquare,
  Compass,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';
import { openCookieModal } from '../services/consentService';

export default function Footer() {
  return (
    <footer className="bg-[#091426] text-slate-300 border-t border-slate-800 w-full">
      {/* Top Banner / Helpdesk Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B1A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            
            {/* MB315 Further Assistance */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-teal-400 font-bold">Project Demonstration Desk</p>
                <p className="text-sm font-semibold text-white">Further Assistance: MB315</p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Hours of Assistance</p>
                <p className="text-sm font-semibold text-white">Monday – Saturday | 8:30 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Central Security Checkpoint */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Campus Security Gate</p>
                <p className="text-sm font-semibold text-white">Main Academic Gate, Ground Floor</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={imageAssets.logo.campusFindWhite || imageAssets.logo.campusFind} 
                alt="CampusFind Logo" 
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo/campusfind-logo-white.svg';
                }}
              />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An independent student-developed web portal prototype designed to demonstrate digital Lost &amp; Found reporting and token-based status tracking for the Marwadi University campus community.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <img 
                src={imageAssets.logo.marwadiUniversityWhite || imageAssets.logo.marwadiUniversity} 
                alt="Marwadi University Logo" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = imageAssets.logo.marwadiUniversity;
                }}
              />
              <div className="pl-3 border-l border-slate-700 text-xs">
                <span className="font-bold text-slate-300 block">Rajkot, Gujarat, India</span>
                <span className="text-slate-500 text-[11px]">Campus Demonstration Prototype</span>
              </div>
            </div>
          </div>

          {/* Required Quick Navigation Links (Same-tab navigation) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Portal Navigation</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  Campus Landmarks &amp; Gallery
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/report-lost" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Track by Token
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Landmarks Column */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Campus Zones</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-white transition-colors">
                  Main Academic Tower (MB)
                </Link>
              </li>
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-white transition-colors">
                  Central University Library
                </Link>
              </li>
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-white transition-colors">
                  PG &amp; Research Complex
                </Link>
              </li>
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-white transition-colors">
                  Food Court &amp; Canteen
                </Link>
              </li>
              <li>
                <Link to="/campus-landmarks" className="text-slate-400 hover:text-white transition-colors">
                  Campus Photo Gallery (30+)
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/campus-guide" className="text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center gap-1">
                  <span>Collection Desks Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Location & Inquiry */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Inquiries &amp; Contact</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Further Assistance: MB315</strong>, Marwadi University</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Rajkot-Morbi Highway, Rajkot, Gujarat 360003</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Monday – Saturday | 8:30 AM – 6:00 PM</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={openCookieModal}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Cookie className="w-3.5 h-3.5 text-teal-400" />
                <span>Cookie Settings</span>
              </button>
            </div>
          </div>

        </div>

        {/* Required Tasteful, Readable Prototype Disclaimer across every page */}
        <div className="mt-12 pt-8 border-t border-slate-800/90">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1C33] border border-slate-700/80 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto shadow-sm">
            <span className="font-bold text-amber-400 block sm:inline sm:mr-2 uppercase tracking-wider text-xs">
              Prototype Disclaimer:
            </span>
            CampusFind is an independent student-developed Lost &amp; Found prototype created for demonstration purposes. It is not an official Marwadi University website or university-authorized service.
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 max-w-4xl mx-auto text-center sm:text-left">
            <div>
              &copy; 2026 CampusFind – Student Project. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-slate-400 flex-wrap">
              <Link to="/faq" className="hover:text-cyan-400 transition-colors">
                FAQs
              </Link>
              <span>•</span>
              <Link to="/help" className="hover:text-cyan-400 transition-colors">
                Help Center
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/feedback" className="hover:text-cyan-400 transition-colors">
                Feedback
              </Link>
              <span>•</span>
              <button
                type="button"
                onClick={openCookieModal}
                className="hover:text-teal-400 transition-colors underline cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

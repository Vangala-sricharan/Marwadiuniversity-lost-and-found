import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  FileText,
  Building2
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function Footer() {
  return (
    <footer className="bg-[#091426] text-slate-300 border-t border-slate-800">
      {/* Top Banner / Helpdesk Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B1A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            
            {/* MB315 Inquiries & Demonstration Post */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-teal-400 font-bold">Project Assistance Location</p>
                <p className="text-sm font-semibold text-white">Location: MB315, Marwadi University</p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Hours of Assistance</p>
                <p className="text-sm font-semibold text-white">Mon–Sat 8:30 AM – 6:00 PM</p>
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
                src={imageAssets.logo.campusFind} 
                alt="CampusFind Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An independent student-developed web portal prototype designed to demonstrate digital Lost &amp; Found reporting and token-based status tracking for the Marwadi University campus community.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <img 
                src={imageAssets.logo.marwadiUniversity} 
                alt="Marwadi University Logo" 
                className="h-8 w-auto brightness-0 invert opacity-80"
                onError={(e) => {
                  e.currentTarget.src = imageAssets.logo.marwadiUniversityPng;
                }}
              />
              <div className="pl-3 border-l border-slate-700 text-xs">
                <span className="font-bold text-slate-300 block">Rajkot, Gujarat, India</span>
                <span className="text-slate-500 text-[11px]">Campus Demonstration Prototype</span>
              </div>
            </div>
          </div>

          {/* Required Quick Navigation Links */}
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
                <Link to="/report-lost" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  Report Lost
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  Report Found
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Track Report
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Landmarks */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Campus Zones</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  Main Academic Tower (MB)
                </a>
              </li>
              <li>
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  Central University Library
                </a>
              </li>
              <li>
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  PG &amp; Research Complex
                </a>
              </li>
              <li>
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  Food Court &amp; Canteen
                </a>
              </li>
              <li>
                <Link to="/campus-guide" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">
                  Collection Desks Guide &rarr;
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
                <span><strong className="text-white">Location: MB315</strong>, Marwadi University (Project queries)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Rajkot-Morbi Highway, Rajkot, Gujarat 360003</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mon–Sat 8:30 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Required Tasteful, Readable Prototype Disclaimer across every page */}
        <div className="mt-12 pt-8 border-t border-slate-800/90">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1C33] border border-slate-700/80 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto shadow-sm">
            <span className="font-bold text-amber-400 block sm:inline sm:mr-2 uppercase tracking-wider text-xs">
              Prototype Disclaimer:
            </span>
            CampusFind is an independent student-developed prototype created for academic demonstration purposes. It is not an official Marwadi University website or an officially approved university service.
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 max-w-4xl mx-auto text-center sm:text-left">
            <div>
              &copy; 2026 CampusFind – Student Project. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-4 text-slate-400 flex-wrap">
              <Link to="/faq" className="hover:text-cyan-400 transition-colors">
                FAQs
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>•</span>
              <Link to="/track" className="hover:text-cyan-400 transition-colors">
                Track Report
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

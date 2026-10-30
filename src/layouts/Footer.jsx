import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function Footer() {
  return (
    <footer className="bg-[#091426] text-slate-300 border-t border-slate-800">
      {/* Top Banner / Helpdesk Bar */}
      <div className="border-b border-slate-800/80 bg-[#0B1A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Central Security Office</p>
                <p className="text-sm font-semibold text-white">Main Academic Gate, Ground Floor</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Collection Desk Hours</p>
                <p className="text-sm font-semibold text-white">Mon–Sat: 8:30 AM – 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Lost Emergency Hotline</p>
                <p className="text-sm font-semibold text-white">+91 (0281) 7123456 / Ext 204</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The dedicated student-facing Lost &amp; Found web portal of Marwadi University. 
              Built to simplify reporting, verification, and swift return of everyday belongings across our Rajkot campus.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <img 
                src={imageAssets.logo.marwadiUniversity} 
                alt="Marwadi University Logo" 
                className="h-9 w-auto brightness-0 invert opacity-90"
                onError={(e) => {
                  e.currentTarget.src = imageAssets.logo.marwadiUniversityPng;
                }}
              />
              <div className="pl-3 border-l border-slate-700 text-xs">
                <span className="font-bold text-slate-200 block">NAAC A+ Accredited</span>
                <span className="text-slate-400">Rajkot, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Actions</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/report-lost" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Browse All Listings
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Track Report (12-Digit Token)
                </Link>
              </li>
              <li>
                <Link to="/campus-guide" className="text-slate-400 hover:text-white transition-colors">
                  Lost &amp; Found Collection Desks
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Landmarks */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Campus Zones</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  Main Academic Tower
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
                <a href="/#campus-showcase" className="text-slate-400 hover:text-white transition-colors">
                  Open Air Amphitheatre
                </a>
              </li>
            </ul>
          </div>

          {/* University Location & Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">University Contact</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Rajkot-Morbi Highway, Gauridad, Rajkot, Gujarat 360003</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+91 281 7123456</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>lostandfound@marwadiuniversity.ac.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} CampusFind — Marwadi University Lost &amp; Found Portal. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">Phase 1: Student Portal Foundation</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Open to all university students &amp; staff</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

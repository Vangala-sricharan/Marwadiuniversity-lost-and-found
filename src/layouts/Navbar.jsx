import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Compass, 
  Building2, 
  HelpCircle,
  Clock,
  FileText,
  Zap,
  ExternalLink
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

/**
 * Navbar
 *
 * Sticky top white navigation bar for CampusFind.
 * Height target: 85-95px total including internal padding.
 * 
 * Per restructuring requirements:
 * All 7 primary navigation categories open in a NEW browser tab:
 * 1. Home: /
 * 2. Browse Items: /browse
 * 3. Campus Landmarks: /campus-landmarks
 * 4. How It Works: /how-it-works
 * 5. Collection Points: /campus-guide
 * 6. FAQs: /faq
 * 7. Help: /help
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navCategories = [
    { label: 'Home', href: '/', icon: Compass },
    { label: 'Browse Items', href: '/browse', icon: Search },
    { label: 'Campus Landmarks', href: '/campus-landmarks', icon: Building2 },
    { label: 'How It Works', href: '/how-it-works', icon: Zap },
    { label: 'Collection Points', href: '/campus-guide', icon: MapPin },
    { label: 'FAQs', href: '/faq', icon: HelpCircle },
    { label: 'Help', href: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Top University Announcement Bar */}
      <div className="bg-[#0A1A2F] text-slate-300 text-xs py-1 px-3 sm:px-4 lg:px-6 xl:px-8 border-b border-slate-800/80 w-full">
        <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between flex-wrap gap-x-3 gap-y-1">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold tracking-wide text-[10px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Live Campus Portal
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300 text-[11px]">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              Rajkot-Morbi Road, Gujarat
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-[11px] flex-wrap justify-end">
            <span className="font-medium text-white inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <span>Location: MB315</span>
            </span>
            <span className="text-slate-600 hidden xs:inline">|</span>
            <span className="font-medium text-white inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Mon–Sat 8:30 AM – 6:00 PM</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Sticky Navigation Bar (Target: 85-95px on desktop) */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-slate-900/5 border-b border-slate-200/80 py-2' 
            : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/60 py-2.5'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 xl:gap-3 w-full">
            
            {/* Left: Branding & Logos (Compact & Balanced) */}
            <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center group focus:outline-none shrink-0" 
                aria-label="CampusFind Home (opens in new tab)"
              >
                <img 
                  src={imageAssets.logo.campusFindDark || imageAssets.logo.campusFind} 
                  alt="CampusFind Lost and Found Portal" 
                  className="w-[120px] sm:w-[130px] xl:w-[142px] h-auto max-h-8 sm:max-h-9 object-contain transition-transform duration-200 group-hover:scale-101"
                />
              </a>

              <div className="h-5 w-[1px] bg-slate-200 hidden sm:block shrink-0"></div>

              {/* Marwadi University Official Logo Badge */}
              <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 shrink-0">
                <img 
                  src={imageAssets.logo.marwadiUniversity} 
                  alt="Marwadi University Official Logo" 
                  className="w-[105px] sm:w-[115px] xl:w-[125px] h-auto max-h-7 sm:max-h-7.5 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = imageAssets.logo.marwadiUniversityPng;
                  }}
                />
                <span className="hidden min-[1280px]:inline-block text-[9.5px] xl:text-[10px] font-bold tracking-wider text-slate-500 uppercase border-l border-slate-200 pl-1.5 whitespace-nowrap">
                  NAAC A+ Campus
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - Flexible & Single Row, Opening in NEW TABS */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0" aria-label="Main Navigation">
              {navCategories.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                      isActive 
                        ? 'text-teal-700 bg-teal-50/90 font-bold' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile/Tablet Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Links open in NEW TABS and close drawer in current tab */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5 py-2">
              {navCategories.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                );
              })}

              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 border-t border-slate-100 mt-1 pt-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Terms &amp; Conditions</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Marwadi University Portal</span>
              <span>Rajkot, Gujarat</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

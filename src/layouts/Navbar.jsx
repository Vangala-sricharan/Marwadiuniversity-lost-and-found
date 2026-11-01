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
  FileText
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

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

  const isHome = location.pathname === '/';

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

      {/* Main Header / Sticky Navigation */}
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
              <Link to="/" className="flex items-center group focus:outline-none shrink-0" aria-label="CampusFind Home">
                <img 
                  src={imageAssets.logo.campusFind} 
                  alt="CampusFind Lost and Found Portal" 
                  className="w-[120px] sm:w-[130px] xl:w-[142px] h-auto max-h-8 sm:max-h-9 object-contain transition-transform duration-200 group-hover:scale-101"
                />
              </Link>

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

            {/* Desktop Navigation Links - Flexible & Single Row */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
              <Link 
                to="/" 
                className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  location.pathname === '/' 
                    ? 'text-teal-700 bg-teal-50/90 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Home
              </Link>

              <Link 
                to="/browse" 
                className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  location.pathname === '/browse' 
                    ? 'text-teal-700 bg-teal-50/90 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Browse Items
              </Link>

              <a 
                href="/#campus-showcase" 
                className="px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
              >
                Campus Landmarks
              </a>

              <a 
                href="/#how-it-works" 
                className="px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
              >
                How It Works
              </a>

              <Link 
                to="/campus-guide" 
                className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-medium whitespace-nowrap transition-colors ${
                  location.pathname === '/campus-guide' 
                    ? 'text-teal-700 bg-teal-50/90 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Collection Points
              </Link>

              <Link 
                to="/faq" 
                className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-medium whitespace-nowrap transition-colors ${
                  location.pathname === '/faq' 
                    ? 'text-teal-700 bg-teal-50/90 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                FAQs
              </Link>

              <Link 
                to="/help" 
                className={`px-2 xl:px-2.5 py-1 rounded-md text-xs xl:text-[13px] font-medium whitespace-nowrap transition-colors ${
                  location.pathname === '/help' 
                    ? 'text-teal-700 bg-teal-50/90 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                Help
              </Link>
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5 py-2">
              <Link
                to="/"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  location.pathname === '/' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4 text-teal-600" />
                Home
              </Link>
              <Link
                to="/browse"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  location.pathname === '/browse' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Search className="w-4 h-4 text-teal-600" />
                Browse Lost & Found Directory
              </Link>
              <a
                href="/#campus-showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Building2 className="w-4 h-4 text-teal-600" />
                Campus Landmarks
              </a>
              <a
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
                How It Works
              </a>
              <Link
                to="/campus-guide"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === '/campus-guide' ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MapPin className="w-4 h-4 text-teal-600" />
                Security & Collection Desks
              </Link>
              <Link
                to="/faq"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === '/faq' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
                Frequently Asked Questions
              </Link>
              <Link
                to="/help"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === '/help' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-teal-600" />
                Help Center &amp; Guides
              </Link>
              <Link
                to="/terms"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === '/terms' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-teal-600" />
                Terms &amp; Conditions
              </Link>
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  CheckCircle2, 
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
      <div className="bg-[#0A1A2F] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold tracking-wide text-[10px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Live Campus Portal
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              Rajkot-Morbi Road, Gujarat
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-slate-300 text-[11px] flex-wrap justify-end">
            <span className="font-medium text-white inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>Location: MB315</span>
            </span>
            <span className="text-slate-500 hidden xs:inline">|</span>
            <span className="font-medium text-white inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Mon–Sat 8:30 AM – 6:00 PM</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Sticky Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/80 py-3' 
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Branding & Logos */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                <img 
                  src={imageAssets.logo.campusFind} 
                  alt="CampusFind Lost and Found Portal" 
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
                />
              </Link>

              <div className="h-7 w-[1px] bg-slate-200 hidden sm:block"></div>

              {/* Marwadi University Official Logo Badge */}
              <div className="hidden sm:flex items-center gap-2.5 pl-1">
                <img 
                  src={imageAssets.logo.marwadiUniversity} 
                  alt="Marwadi University Official Logo" 
                  className="h-8 w-auto object-contain max-w-[120px] lg:max-w-[150px]"
                  onError={(e) => {
                    // Fallback to png if svg fails
                    e.currentTarget.src = imageAssets.logo.marwadiUniversityPng;
                  }}
                />
                <span className="hidden xl:inline-block text-[11px] font-semibold tracking-wider text-slate-500 uppercase border-l border-slate-200 pl-2">
                  NAAC A+ Campus
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === '/' 
                    ? 'text-teal-700 bg-teal-50/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Home
              </Link>

              <Link 
                to="/browse" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === '/browse' 
                    ? 'text-teal-700 bg-teal-50/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Browse Items
              </Link>

              <a 
                href="/#campus-showcase" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                Campus Landmarks
              </a>

              <a 
                href="/#how-it-works" 
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                How It Works
              </a>

              <Link 
                to="/campus-guide" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/campus-guide' 
                    ? 'text-teal-700 bg-teal-50/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Collection Points
              </Link>

              <Link 
                to="/faq" 
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/faq' 
                    ? 'text-teal-700 bg-teal-50/80' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                FAQs
              </Link>

              <Link 
                to="/track" 
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  location.pathname === '/track' 
                    ? 'text-cyan-800 bg-cyan-50/80 font-bold' 
                    : 'text-slate-700 hover:text-cyan-700 hover:bg-slate-100/70'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-cyan-600" />
                <span>Track Report</span>
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                to="/report-lost"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  location.pathname === '/report-lost'
                    ? 'bg-rose-600 text-white shadow-rose-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200/90 hover:bg-rose-100/80'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-rose-500" />
                Report Lost
              </Link>

              <Link
                to="/report-found"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${
                  location.pathname === '/report-found'
                    ? 'bg-teal-700 text-white shadow-teal-200'
                    : 'bg-[#0E7490] hover:bg-[#085a70] text-white shadow-cyan-900/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-teal-200" />
                Report Found
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                to="/terms"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === '/terms' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4 text-teal-600" />
                Terms &amp; Conditions
              </Link>
              <Link
                to="/track"
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  location.pathname === '/track' ? 'bg-cyan-50 text-cyan-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Search className="w-4 h-4 text-cyan-600" />
                Track with 12-Digit Token
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                to="/report-lost"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-sm font-bold shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-rose-600" />
                Report Lost Item
              </Link>
              <Link
                to="/report-found"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0E7490] hover:bg-[#085a70] text-white text-sm font-bold shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-200" />
                Report Found Item
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

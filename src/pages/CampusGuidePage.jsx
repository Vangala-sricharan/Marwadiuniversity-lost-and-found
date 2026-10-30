import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Coffee
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function CampusGuidePage() {
  const collectionPoints = [
    {
      title: 'MB315 Central Lost & Found Office',
      tag: 'Primary Headquarters',
      location: 'Room MB315, 3rd Floor, Main Academic Building (MB Building)',
      timing: 'Mon–Sat: 8:30 AM – 5:30 PM',
      contact: '+91 (0281) 7123456 Ext 315',
      description: 'The official centralized Lost & Found administration office for Marwadi University. All verified items, unclaimed valuables, and registration token handovers are coordinated here.',
      image: imageAssets.college.mainBuilding,
      icon: Building2,
    },
    {
      title: 'Main Academic Security Checkpoint',
      tag: '24/7 Security Gate',
      location: 'Ground Floor, Main Academic Building Entrance',
      timing: 'Round-the-clock (24/7)',
      contact: '+91 (0281) 7123456 Ext 101',
      description: 'Houses safe lockers for valuable items including laptops, smartphones, wallets, and official documents. All items handed to university guards are registered here.',
      image: imageAssets.college.mainBuilding,
      icon: ShieldCheck,
    },
    {
      title: 'Central Library Help Desk',
      tag: 'Academic Materials & IDs',
      location: 'Level 1 Reception Counter, Central Library Block',
      timing: 'Mon–Sat: 8:00 AM – 8:00 PM',
      contact: 'library.desk@marwadiuniversity.ac.in',
      description: 'Collection center for textbooks, notebooks, scientific calculators, stationery pouches, and student RFID cards misplaced in study cubicles or reading zones.',
      image: imageAssets.college.library,
      icon: BookOpen,
    },
    {
      title: 'Student Amenities & Food Court Post',
      tag: 'Daily Activity Hub',
      location: 'Near Canteen Office, Amenities Ground Floor',
      timing: 'Daily: 8:30 AM – 7:30 PM',
      contact: '+91 97123 45678',
      description: 'Dedicated intake box for water bottles, umbrellas, jackets, and accessories left behind in the campus cafeteria, lawn dining tables, and food courts.',
      image: imageAssets.college.cafeteria,
      icon: Coffee,
    },
    {
      title: 'PG & Engineering Complex Security Post',
      tag: 'Labs & Workshops',
      location: 'Block E Ground Foyer, PG Building',
      timing: 'Mon–Sat: 8:30 AM – 6:30 PM',
      contact: '+91 (0281) 7123456 Ext 305',
      description: 'Dedicated post covering high-tech engineering laboratories, mechanical workshops, and postgraduate lecture auditoriums.',
      image: imageAssets.college.pgBuilding,
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="bg-[#091527] text-white rounded-3xl p-8 sm:p-12 shadow-xl mb-12 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold tracking-wide uppercase mb-4">
              <Building2 className="w-4 h-4 text-teal-400" />
              Marwadi University Official Protocol
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Lost &amp; Found Collection Desks
            </h1>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Find out where your misplaced belonging has been secured, verify operating hours, and learn how to complete an on-campus recovery with your student credentials.
            </p>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden md:block">
            <img 
              src={imageAssets.college.mainBuilding} 
              alt="Campus" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* 4 Collection Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {collectionPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div 
                key={point.title}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img 
                    src={point.image} 
                    alt={point.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.src = '/images/college/marwadi-main-building.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                      {point.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Icon className="w-5 h-5 text-teal-600 shrink-0" />
                      {point.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {point.description}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{point.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span>{point.timing}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="font-mono text-slate-800">{point.contact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Claiming Guidelines for Students */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-teal-600" />
            Verification &amp; Claiming Checklist
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100">
              <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                1
              </span>
              <h4 className="font-bold text-slate-900 mb-1">Bring Valid University ID</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Present your official Marwadi University physical ID badge or digital ERP login proof before custody transfer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-100">
              <span className="w-8 h-8 rounded-xl bg-cyan-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                2
              </span>
              <h4 className="font-bold text-slate-900 mb-1">Prove Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For devices, unlock the screen or quote the serial number. For bags, describe internal contents or distinct marks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-xs mb-3">
                3
              </span>
              <h4 className="font-bold text-slate-900 mb-1">Sign the Registry</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log your roll number and signature in the campus physical handover ledger to conclude the case.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Questions regarding lost property? Visit the Main Academic Gate security office.
            </span>
            <Link
              to="/browse"
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <span>Check Current Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

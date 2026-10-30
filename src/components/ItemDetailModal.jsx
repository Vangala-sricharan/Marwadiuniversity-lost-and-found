import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Share2, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function ItemDetailModal({ item, onClose }) {
  if (!item) return null;

  const isLost = item.type === 'lost';
  const categoryIcon = imageAssets.categories[item.category] || imageAssets.placeholders.item;
  const displayImage = item.imageUrl || categoryIcon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top header bar */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isLost ? 'bg-rose-50/70 border-rose-100' : 'bg-teal-50/70 border-teal-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <span 
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isLost ? 'bg-rose-600 text-white' : 'bg-teal-700 text-white'
              }`}
            >
              {isLost ? 'Lost Report' : 'Found Report'}
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 bg-white/90 border border-slate-200 px-2.5 py-0.5 rounded-full">
              Token: {item.token || item.id}
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Item Header */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center p-3 shrink-0 mx-auto sm:mx-0">
              <img 
                src={displayImage} 
                alt={item.itemName} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = imageAssets.placeholders.item;
                }}
              />
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {item.itemName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                  {item.category || 'General Item'}
                </span>
                <span>•</span>
                <span>Reported on {item.date}</span>
              </div>
              <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Location & Time details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              Location Details
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Campus Zone:</span>
                <span className="font-semibold text-slate-800">{item.location}</span>
              </div>

              {item.specificSpot && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Exact Landmark/Spot:</span>
                  <span className="font-semibold text-slate-800">{item.specificSpot}</span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-0.5">Reported Date:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> {item.date}
                </span>
              </div>

              {item.approximateTime && (
                <div>
                  <span className="text-slate-400 block mb-0.5">Approximate Time:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.approximateTime}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Reporter & Contact info */}
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-600" />
              Student Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">Name:</span>
                <span className="font-semibold text-slate-900">{item.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone / Email:</span>
                <span className="font-semibold text-teal-800 font-mono">
                  {item.contact || item.email || 'Contact via University Helpdesk'}
                </span>
              </div>
            </div>
          </div>

          {/* Recovery / Claim Advice Notice */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">Verification Instructions for Marwadi Students</p>
              <p className="text-amber-800 leading-relaxed">
                For further details, please visit <span className="font-bold underline">MB315, Marwadi University</span>. Bring your 12-digit registration token (<span className="font-mono font-bold">{item.token || item.id}</span>) and your official student ID card.
              </p>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <a
            href={`/track?token=${item.token || item.id}`}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 underline flex items-center gap-1"
          >
            Track in Portal
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

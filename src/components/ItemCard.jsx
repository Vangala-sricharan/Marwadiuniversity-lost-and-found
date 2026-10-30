import React from 'react';
import { MapPin, Calendar, Clock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { imageAssets } from '../config/imageAssets';

export default function ItemCard({ item, onSelect }) {
  const isLost = item.type === 'lost';
  
  // Resolve category icon or placeholder
  const categoryIcon = imageAssets.categories[item.category] || imageAssets.placeholders.item;
  const displayImage = item.imageUrl || categoryIcon;

  return (
    <div 
      onClick={() => onSelect && onSelect(item)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
    >
      {/* Top Banner & Status */}
      <div className="p-4 pb-0 flex items-center justify-between gap-2">
        {item.status === 'Found / Ready for Claim' ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Located / Ready
          </span>
        ) : (
          <span 
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
              isLost 
                ? 'bg-rose-50 text-rose-700 border border-rose-200/70' 
                : 'bg-teal-50 text-teal-700 border border-teal-200/70'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLost ? 'bg-rose-500 animate-pulse' : 'bg-teal-500'}`}></span>
            {isLost ? 'Lost Item' : 'Found Item'}
          </span>
        )}

        <span className="text-[11px] font-mono text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded font-medium">
          {item.token || item.id}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center justify-center p-2.5 shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-200">
            <img 
              src={displayImage} 
              alt={item.itemName} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = imageAssets.placeholders.item;
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
              {item.itemName}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Location & Time Metadata */}
        <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          {item.specificSpot && (
            <div className="text-[11px] text-slate-500 pl-5 truncate">
              Spot: {item.specificSpot}
            </div>
          )}

          <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{item.date}</span>
            </div>
            {item.approximateTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{item.approximateTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer / Quick Action bar */}
      <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 flex items-center gap-1 font-medium">
          <User className="w-3.5 h-3.5 text-slate-400" />
          {item.studentName.split(' ')[0]}
        </span>

        <span className="text-teal-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
          View details
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

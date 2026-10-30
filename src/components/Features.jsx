import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Zap, 
  Lock, 
  Users, 
  Bell,
  CheckCircle2
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Frictionless Reporting',
      description: 'No login required. Students can file a report immediately from their phone right after a lecture or while in the canteen.',
      color: 'teal',
      stats: '< 1 min reporting',
    },
    {
      icon: MapPin,
      title: 'MU Campus Zone Tagging',
      description: 'Items are pinpointed to exact campus locations like Lab 402, PG Block E, Amphitheatre steps, or Canteen juice corner.',
      color: 'cyan',
      stats: '15+ Campus Zones',
    },
    {
      icon: ShieldCheck,
      title: 'Security Desk Collection Hubs',
      description: 'High-value items like laptops and wallets are routed through the Main Academic Gate security post for verified verification.',
      color: 'blue',
      stats: 'Mon–Sat Guarded',
    },
    {
      icon: Users,
      title: 'Community-Driven Recovery',
      description: 'Direct peer-to-peer reconnects allow students to return student ID cards and notebooks directly within departments.',
      color: 'emerald',
      stats: '95% Match Rate',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-bold tracking-wide uppercase mb-3">
            Built for Marwadi University
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Fast Campus Recovery
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Every feature is tailored to the daily workflow of engineering, management, and pharmacy students across our campus.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-teal-700 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-800">
                  <span>{feat.stats}</span>
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

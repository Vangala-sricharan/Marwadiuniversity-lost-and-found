import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cookie, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { 
  getCookiePreferences, 
  saveCookiePreferences 
} from '../services/consentService';

export default function CookieModal({ isOpen, onClose }) {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getCookiePreferences();
      if (current) {
        setPreferences({
          essential: true,
          analytics: Boolean(current.analytics),
          marketing: Boolean(current.marketing)
        });
      } else {
        setPreferences({
          essential: true,
          analytics: false,
          marketing: false
        });
      }
      setSavedNotice(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveCookiePreferences(preferences);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    setPreferences(all);
    saveCookiePreferences(all);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const handleRejectOptional = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false };
    setPreferences(essentialOnly);
    saveCookiePreferences(essentialOnly);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#0B1A30] to-[#132A4A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cookie-modal-title" className="text-lg font-bold text-white">
                Browser Storage &amp; Cookie Preferences
              </h2>
              <p className="text-xs text-slate-300">
                Manage client-side storage and telemetry settings
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Close preferences"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
            CampusFind is an academic prototype for Marwadi University. We do not sell data or deploy advertising trackers. You can configure your local device storage preferences below.
          </div>

          {/* Option 1: Essential Storage */}
          <div className="p-4 rounded-2xl border-2 border-teal-500/40 bg-teal-50/30 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-600" />
                <span className="font-bold text-slate-900">Essential Preferences &amp; Session Storage</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 uppercase tracking-wider">
                  Always Required
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Required for the core preferences of CampusFind. Stores your legal consent state and cookie preferences on your device.
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <div className="w-12 h-6 bg-teal-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-80">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>

          {/* Option 2: Analytics & Performance */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-600" />
                <span className="font-bold text-slate-900">Anonymous Usage Telemetry</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Allows evaluation of page performance and workflow navigation. 
                <span className="block mt-1 text-[11px] text-teal-700 font-medium">
                  Note: In this academic prototype, no external telemetry tools (Google Analytics, etc.) are installed.
                </span>
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <button
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  preferences.analytics ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
                aria-pressed={preferences.analytics}
                aria-label="Toggle anonymous analytics"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>

          {/* Option 3: Marketing & Tracking */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-600" />
                <span className="font-bold text-slate-900">Marketing &amp; Personalization</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                  Optional
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personalized suggestions and external marketing campaigns.
                <span className="block mt-1 text-[11px] text-teal-700 font-medium">
                  Note: CampusFind is non-commercial. No advertising trackers are integrated.
                </span>
              </p>
            </div>
            <div className="shrink-0 mt-1">
              <button
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
                  preferences.marketing ? 'bg-teal-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
                aria-pressed={preferences.marketing}
                aria-label="Toggle marketing preferences"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </button>
            </div>
          </div>

          {savedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Preferences saved successfully to browser storage.</span>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleRejectOptional}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              Reject Optional
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors"
            >
              Accept All
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition-all"
          >
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
}

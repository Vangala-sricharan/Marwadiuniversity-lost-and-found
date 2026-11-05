import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Sliders, Check, X } from 'lucide-react';
import { 
  getLegalConsent, 
  getCookiePreferences, 
  saveCookiePreferences 
} from '../services/consentService';

export default function CookieBanner({ onOpenCustomize }) {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    const legalConsent = getLegalConsent();
    const cookiePrefs = getCookiePreferences();

    // Show banner only if legal consent has been granted AND cookie prefs have not yet been chosen
    if (legalConsent && !cookiePrefs) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    checkVisibility();

    const handleConsentUpdate = () => checkVisibility();
    const handlePrefsUpdate = () => checkVisibility();

    window.addEventListener('campusfind_consent_updated', handleConsentUpdate);
    window.addEventListener('campusfind_cookie_prefs_updated', handlePrefsUpdate);

    return () => {
      window.removeEventListener('campusfind_consent_updated', handleConsentUpdate);
      window.removeEventListener('campusfind_cookie_prefs_updated', handlePrefsUpdate);
    };
  }, []);

  if (!isVisible) return null;

  const handleAcceptAll = () => {
    saveCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true
    });
    setIsVisible(false);
  };

  const handleRejectOptional = () => {
    saveCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false
    });
    setIsVisible(false);
  };

  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 text-white shadow-2xl transition-all duration-300"
      role="region"
      aria-label="Cookie and storage preferences banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        
        {/* Banner Details */}
        <div className="flex items-start gap-4 max-w-3xl">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Your Privacy Matters
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Essential Preferences
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              CampusFind uses essential browser storage to preserve your legal consent and cookie preferences. We do not use third-party analytics or advertising trackers.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
          <button
            type="button"
            onClick={onOpenCustomize}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <button
            type="button"
            onClick={handleRejectOptional}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 text-xs font-semibold transition-colors"
          >
            <span>Reject Optional</span>
          </button>

          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all"
          >
            <Check className="w-4 h-4 text-slate-950" />
            <span>Accept All</span>
          </button>
        </div>

      </div>
    </div>
  );
}

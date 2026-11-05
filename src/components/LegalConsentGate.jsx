import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Building2, 
  Clock, 
  X,
  Eye,
  ArrowRight
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';
import { 
  getLegalConsent, 
  saveLegalConsent, 
  CURRENT_TERMS_VERSION, 
  CURRENT_PRIVACY_VERSION 
} from '../services/consentService';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';

export default function LegalConsentGate({ children }) {
  const [hasConsented, setHasConsented] = useState(false);
  const [checking, setChecking] = useState(true);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Embedded viewer state for Terms or Privacy Policy within the gate
  const [viewerDoc, setViewerDoc] = useState(null); // 'terms' | 'privacy' | null

  useEffect(() => {
    const consent = getLegalConsent();
    if (consent) {
      setHasConsented(true);
    }
    setChecking(false);

    const handleConsentUpdate = () => {
      const updated = getLegalConsent();
      if (updated) setHasConsented(true);
    };

    window.addEventListener('campusfind_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('campusfind_consent_updated', handleConsentUpdate);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If already consented, render the application normally
  if (hasConsented) {
    return <>{children}</>;
  }

  const handleContinue = (e) => {
    e.preventDefault();
    if (termsAccepted && privacyAccepted) {
      saveLegalConsent();
      setHasConsented(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-[#061224] via-[#091a33] to-[#0d284f] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full pt-4 pb-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
          
          <div className="flex items-center gap-3.5">
            <img 
              src={imageAssets.logo.campusFind} 
              alt="CampusFind Logo" 
              className="h-9 w-auto object-contain"
            />
            <div className="h-6 w-px bg-slate-700"></div>
            <img 
              src={imageAssets.logo.marwadiUniversityWhite || imageAssets.logo.marwadiUniversity} 
              alt="Marwadi University" 
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = imageAssets.logo.marwadiUniversity;
              }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Academic Demonstration Prototype</span>
          </div>

        </div>
      </div>

      {/* Main Consent Card */}
      <div className="max-w-4xl mx-auto w-full my-auto py-6">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60">
          
          {/* Title Area */}
          <div className="text-center sm:text-left mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Verification &amp; Compliance Step
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Before You Continue to CampusFind
            </h1>
            <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Welcome to the Marwadi University Lost &amp; Found demonstration portal. Please review and acknowledge our Terms &amp; Conditions and Privacy Policy before accessing the portal.
            </p>
          </div>

          {/* Prototype Disclosure Alert */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm leading-relaxed mb-8 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold">Important Notice:</strong>
              CampusFind is an independent student-developed prototype created for academic demonstration purposes. It is not an official Marwadi University website or university-authorized service. All submitted data is stored strictly inside your local browser storage.
            </div>
          </div>

          {/* Summaries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Terms Summary Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-bold text-white">Terms &amp; Conditions</h2>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">v{CURRENT_TERMS_VERSION}</span>
                </div>

                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed pt-1">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Independent academic demonstration project with zero university endorsement or liability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Submissions are indexed by a 12-digit token with contact details masked for student privacy protection.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>Strict prohibition of false reports, prank entries, or hazardous/illegal contraband.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold">•</span>
                    <span>12-digit tokens and printable QR badges serve as demonstration reference keys, not legal recovery titles.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setViewerDoc('terms')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read Full Terms &amp; Conditions &rarr;</span>
                </button>
              </div>
            </div>

            {/* Privacy Policy Summary Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h2 className="text-base font-bold text-white">Privacy Policy</h2>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">v{CURRENT_PRIVACY_VERSION}</span>
                </div>

                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed pt-1">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Zero centralized server database: all records remain isolated within your device&apos;s browser.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>No student passwords, accounts, or university credential logins required.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Automatic phone and email masking in all public listings to safeguard student privacy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Printable QR codes link directly to public recovery routes without exposing private contact credentials.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setViewerDoc('privacy')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read Full Privacy Policy &rarr;</span>
                </button>
              </div>
            </div>

          </div>

          {/* Explicit Consent Checkboxes */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mandatory Consent Acknowledgments
            </h3>

            {/* Checkbox 1: Terms */}
            <label className="flex items-start gap-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-400 focus:ring-offset-slate-900 cursor-pointer transition-all"
              />
              <span className="text-xs sm:text-sm text-slate-200 leading-snug group-hover:text-white transition-colors">
                I have read, understood, and agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setViewerDoc('terms');
                  }}
                  className="font-bold text-teal-300 hover:underline inline"
                >
                  CampusFind Terms &amp; Conditions
                </button>
                , including its academic prototype status, data privacy guidelines, and user conduct rules.
              </span>
            </label>

            {/* Checkbox 2: Privacy */}
            <label className="flex items-start gap-3.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-400 focus:ring-offset-slate-900 cursor-pointer transition-all"
              />
              <span className="text-xs sm:text-sm text-slate-200 leading-snug group-hover:text-white transition-colors">
                I have read, understood, and agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setViewerDoc('privacy');
                  }}
                  className="font-bold text-cyan-300 hover:underline inline"
                >
                  CampusFind Privacy Policy
                </button>
                , acknowledging client-side data isolation, public masking standards, and zero server storage.
              </span>
            </label>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              {!termsAccepted || !privacyAccepted ? (
                <span className="text-amber-400 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Please accept both agreements above to unlock the portal
                </span>
              ) : (
                <span className="text-emerald-400 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                  <Check className="w-4 h-4 shrink-0" />
                  Ready to proceed to CampusFind
                </span>
              )}
            </div>

            <button
              type="button"
              disabled={!termsAccepted || !privacyAccepted}
              onClick={handleContinue}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-200 ${
                termsAccepted && privacyAccepted
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 shadow-xl shadow-teal-500/25 hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
              }`}
            >
              <span>Continue to CampusFind</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Footer Support Info */}
      <div className="max-w-4xl mx-auto w-full pt-4 text-center text-xs text-slate-400">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            <span>Demonstration Location: <strong>MB315</strong>, Marwadi University</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Mon–Sat 8:30 AM – 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Embedded Document Viewer Modal */}
      {viewerDoc && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            <div className="p-5 bg-gradient-to-r from-[#0F2347] to-[#1E3A8A] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {viewerDoc === 'terms' ? 'Terms & Conditions Document' : 'Privacy Policy Document'}
                </h3>
                <p className="text-xs text-slate-300">
                  CampusFind Marwadi University Academic Prototype
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewerDoc(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close document preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {viewerDoc === 'terms' ? <TermsPage /> : <PrivacyPage />}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setViewerDoc(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Close &amp; Return to Consent Gate
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

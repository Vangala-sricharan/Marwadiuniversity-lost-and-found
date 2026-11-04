import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Building2, 
  Clock, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { 
  getLegalConsent, 
  saveLegalConsent, 
  CURRENT_TERMS_VERSION, 
  CURRENT_PRIVACY_VERSION 
} from '../services/consentService';
import { imageAssets } from '../config/imageAssets';

/**
 * ReportConsentGate
 *
 * Ensures visitors review and acknowledge Terms & Conditions and Privacy Policy
 * strictly before accessing the Report Lost or Report Found forms.
 *
 * - Informational pages (Home, Browse, Landmarks, How It Works, FAQs, Guide, Help)
 *   are freely accessible without this gate.
 * - If legal consent is valid and up-to-date, the child reporting form renders directly.
 * - If consent is missing, incomplete, or version-outdated, the consent screen renders in-place.
 * - "Read Terms & Conditions" and "Read Privacy Policy" links open in NEW tabs,
 *   preserving the user's progress and reporting intent in the current tab.
 * - Both checkboxes must be manually checked to enable "Continue to Report".
 */
export default function ReportConsentGate({ children, reportType = 'item' }) {
  const [hasValidConsent, setHasValidConsent] = useState(false);
  const [loading, setLoading] = useState(true);

  // Both checkboxes are always unchecked when acceptance is required
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const existing = getLegalConsent();
    if (existing) {
      setHasValidConsent(true);
    } else {
      setHasValidConsent(false);
    }
    setLoading(false);

    const handleConsentUpdate = () => {
      const updated = getLegalConsent();
      if (updated) {
        setHasValidConsent(true);
      }
    };

    window.addEventListener('campusfind_consent_updated', handleConsentUpdate);
    return () => window.removeEventListener('campusfind_consent_updated', handleConsentUpdate);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8 bg-slate-50">
        <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If consent is already recorded and valid, render the report form directly in the same tab
  if (hasValidConsent) {
    return <>{children}</>;
  }

  const handleContinue = (e) => {
    e.preventDefault();
    if (termsAccepted && privacyAccepted) {
      saveLegalConsent();
      setHasValidConsent(true);
    }
  };

  const isLost = reportType === 'lost';

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to CampusFind Home</span>
          </Link>
        </div>

        {/* Main Consent Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in duration-300">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#1E3A8A] text-white p-6 sm:p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Verification &amp; Compliance Step</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Before You Submit Your Report
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Please review and acknowledge our Terms &amp; Conditions and Privacy Policy before submitting information through CampusFind.
              </p>
            </div>

            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-6 translate-y-6">
              <ShieldCheck className="w-48 h-48 text-white" />
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Academic Prototype Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-bold text-amber-950 block mb-0.5">Important Academic Demonstration Notice:</strong>
                CampusFind is an independent student-developed prototype created for academic demonstration purposes. It is not an official Marwadi University website or university-authorized service. All submitted reports are stored in local browser storage on this device.
              </div>
            </div>

            {/* Document Summaries */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Terms Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-teal-600" />
                      Terms &amp; Conditions
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">v{CURRENT_TERMS_VERSION}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Covers responsible reporting, prohibition of false or prank entries, token-based demonstration keys, and local browser storage limitations.
                  </p>
                </div>
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 underline pt-1"
                >
                  <span>Read Terms &amp; Conditions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Privacy Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-cyan-600" />
                      Privacy Policy
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">v{CURRENT_PRIVACY_VERSION}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Outlines client-side storage isolation, automatic phone/email masking in public listings, and zero server-side credential collection.
                  </p>
                </div>
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 underline pt-1"
                >
                  <span>Read Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>

            {/* Required Checkboxes (Unchecked by default) */}
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Required Acknowledgements
              </h3>

              {/* Checkbox 1: Terms */}
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer transition-all"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                  I have read and agree to the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-teal-700 hover:text-teal-800 underline inline-flex items-center gap-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Terms &amp; Conditions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </span>
              </label>

              {/* Checkbox 2: Privacy */}
              <label className="flex items-start gap-3.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded-lg border-2 border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer transition-all"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                  I have read and acknowledge the{' '}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-cyan-700 hover:text-cyan-800 underline inline-flex items-center gap-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Privacy Policy</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  .
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                {!termsAccepted || !privacyAccepted ? (
                  <span className="text-amber-700 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Please check both boxes above to enable reporting
                  </span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    Acknowledgements complete &bull; Ready to report
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/"
                  className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors w-full sm:w-auto text-center"
                >
                  Cancel
                </Link>

                <button
                  type="button"
                  disabled={!termsAccepted || !privacyAccepted}
                  onClick={handleContinue}
                  className={`px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto shadow-md ${
                    termsAccepted && privacyAccepted
                      ? 'bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-teal-900/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>Continue to Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Assistance footer callout */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" />
          <span>Need direct handover assistance? Visit <strong>MB315</strong>, Marwadi University (Mon–Sat 8:30 AM – 6:00 PM).</span>
        </div>

      </div>
    </div>
  );
}

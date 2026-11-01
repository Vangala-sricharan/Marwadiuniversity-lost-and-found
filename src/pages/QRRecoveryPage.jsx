import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Home, 
  Eye, 
  Lock, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { getReportByToken } from '../services/storage';
import { imageAssets } from '../config/imageAssets';

export default function QRRecoveryPage() {
  const { referenceId } = useParams();
  const [report, setReport] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (referenceId) {
      const found = getReportByToken(referenceId);
      setReport(found);
    }
    setChecked(true);
  }, [referenceId]);

  const cleanReference = (referenceId || '').trim();
  const isLost = report && (report.reportType === 'lost' || report.type === 'lost');
  const categoryIcon = report ? (imageAssets.categories[report.category] || imageAssets.placeholders.item) : imageAssets.placeholders.item;
  const displayImage = report?.imageUrl || categoryIcon;

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CampusFind Official Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            CampusFind &bull; Marwadi University Recovery Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Belonging Recovery Assistance
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            You scanned a CampusFind Belonging QR Identification Tag.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-[#0F2347] text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-teal-400 font-bold block mb-1">
                Reference Identifier
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-wider">
                {cleanReference || 'UNSPECIFIED'}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Secure QR Link
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">

            {/* CASE 1: Report Found in current browser storage */}
            {report ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Item Details Block */}
                <div className="flex flex-col sm:flex-row gap-5 items-start bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200 p-3 shrink-0 mx-auto sm:mx-0 flex items-center justify-center shadow-xs">
                    <img 
                      src={displayImage} 
                      alt={report.itemName} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = imageAssets.placeholders.item;
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isLost ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-teal-100 text-teal-800 border border-teal-200'
                      }`}>
                        {isLost ? 'Lost Belonging' : 'Found Belonging'}
                      </span>
                      <span className="bg-slate-200/80 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                        {report.category || 'Belonging'}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug break-words">
                      {report.itemName}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        {report.location}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* EXACT REQUIRED INSTRUCTION */}
                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-4 shadow-xs">
                  <Building2 className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Campus Handover Instruction
                    </p>
                    <p className="text-base sm:text-lg font-black text-amber-950">
                      Found this belonging? Please return it to MB315, Marwadi University, for further assistance.
                    </p>
                    <p className="text-xs text-amber-900 leading-relaxed pt-1">
                      Present this item at MB315 along with reference ID <span className="font-mono font-bold">{cleanReference}</span>. Staff will coordinate secure verification with the registered student owner.
                    </p>
                  </div>
                </div>

                {/* Privacy & Responsible Finder Guidance */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-950 text-xs flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-blue-950">Responsible Finder Privacy Notice</p>
                    <p className="text-blue-900 leading-relaxed">
                      To safeguard student privacy and prevent identity exposure, owner contact details are never disclosed through public QR scans. Please do not publish, photograph, or distribute private belongings on public social media.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* CASE 2: Invalid, Deleted, or Cross-Device Scan (LocalStorage boundary) */
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* EXACT REQUIRED MESSAGE */}
                <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-4 shadow-xs">
                  <Building2 className="w-7 h-7 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Item Record Status
                    </p>
                    <p className="text-base sm:text-lg font-black text-amber-950 leading-snug">
                      Sorry, we couldn&apos;t find this item record. Please visit MB315, Marwadi University, for further assistance.
                    </p>
                    <p className="text-xs text-amber-900/90 leading-relaxed pt-1">
                      Reference Identifier: <span className="font-mono font-bold bg-white/80 px-2 py-0.5 rounded border border-amber-200">{cleanReference || 'Not provided'}</span>
                    </p>
                  </div>
                </div>

                {/* Honest explanation of client-side storage architecture */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Info className="w-4 h-4 text-teal-600" />
                    <span>Why is this record unavailable on your device?</span>
                  </div>
                  <p className="leading-relaxed">
                    CampusFind is a student-developed academic prototype. Submission records are stored client-side in the local browser storage of the student who submitted the report. Reports are not automatically synchronized to an institutional database or across separate devices.
                  </p>
                  <p className="leading-relaxed text-slate-700 font-medium">
                    If you have located a misplaced belonging bearing this tag, please bring the item directly to <strong>MB315, Marwadi University</strong>. Campus coordinators will be able to verify and log the belonging.
                  </p>
                </div>

                {/* Privacy & Safe Conduct */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-950 text-xs flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-blue-950 mb-0.5">Privacy Protection</p>
                    <p className="text-blue-900 leading-relaxed">
                      In accordance with university privacy guidelines, CampusFind QR codes never contain or reveal student telephone numbers, email addresses, or sensitive personal data.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Action Buttons: Visit CampusFind button (Required) */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Visit CampusFind</span>
              </Link>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/faq"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider text-center transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  to="/terms"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider text-center transition-colors"
                >
                  Terms &amp; Disclaimer
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Campus Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>CampusFind &bull; Academic Lost &amp; Found Demonstration Prototype &bull; Marwadi University, Rajkot</p>
        </div>

      </div>
    </div>
  );
}

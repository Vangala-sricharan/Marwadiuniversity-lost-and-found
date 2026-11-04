import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  Printer, 
  X, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  FileText,
  Tag,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { imageAssets } from '../config/imageAssets';
import { DEPLOYED_RECOVERY_DOMAIN } from './PrintableQRCodeModal';

/**
 * PrintItemModal
 *
 * Provides a dedicated, print-friendly view of an item's details for students
 * who wish to keep a physical copy or receipt for verification at MB315.
 */
export default function PrintItemModal({ item, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const printSheetRef = useRef(null);

  if (!item) return null;

  const token = item.token || item.id;
  const isLost = item.type === 'lost' || item.reportType === 'lost';
  const trackUrl = `${DEPLOYED_RECOVERY_DOMAIN || window.location.origin}/track?token=${token}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // Keyboard accessibility: Escape key closes the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Generate QR code encoding direct track / recovery link for physical slip
  useEffect(() => {
    QRCode.toDataURL(
      trackUrl,
      {
        width: 240,
        margin: 2,
        color: {
          dark: '#0A1A2F',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [trackUrl]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
    >
      {/* Print-specific style rules */}
      <style>{`
        @media print {
          html, body {
            background: #ffffff !important;
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide all surrounding page elements */
          body * {
            visibility: hidden !important;
          }

          /* Show only the printable item record sheet */
          #printable-item-record,
          #printable-item-record * {
            visibility: visible !important;
          }

          #printable-item-record {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px 32px !important;
            box-sizing: border-box !important;
            background: #ffffff !important;
            border: 2px solid #0F2347 !important;
            border-radius: 12px !important;
            box-shadow: none !important;
            page-break-inside: avoid !important;
          }

          .print-modal-chrome,
          .print-hide {
            display: none !important;
            visibility: hidden !important;
          }
        }
      `}</style>

      {/* Modal Dialog Card */}
      <div 
        className="bg-white rounded-3xl max-w-2xl sm:max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-in fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar (Hidden during actual print) */}
        <div className="print-modal-chrome bg-[#0F2347] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Printer className="w-5 h-5 text-teal-400" />
            </span>
            <div>
              <h2 id="print-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Print-Friendly Item Record</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30">
                  Physical Copy
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Print or save a physical record for personal reference and desk verification
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close print preview"
            title="Close (Esc)"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-all duration-150 focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Print Preview Container */}
        <div className="p-5 sm:p-7 space-y-5 max-h-[80vh] overflow-y-auto bg-slate-100/60">
          
          <div className="print-hide flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" />
              Document Preview (Standard A4 / Letter Format)
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Ready to print
            </span>
          </div>

          {/* ======================================================== */}
          {/* THE PRINTABLE RECORD SHEET (Captured when user prints)    */}
          {/* ======================================================== */}
          <div 
            id="printable-item-record"
            ref={printSheetRef}
            className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 text-slate-900 shadow-sm space-y-6"
          >
            {/* 1. Header Banner */}
            <div className="border-b-2 border-slate-900 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={imageAssets.logo.campusFindDark || '/images/logo/campusfind-logo-dark.svg'} 
                    alt="CampusFind" 
                    className="h-8 w-auto object-contain"
                  />
                  <span className="h-6 w-[1.5px] bg-slate-300"></span>
                  <img 
                    src={imageAssets.logo.marwadiUniversity || '/images/logo/marwadi-university-logo.svg'} 
                    alt="Marwadi University" 
                    className="h-7 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.src = imageAssets.logo.marwadiUniversityPng || '/images/logo/marwadi-university-logo.png';
                    }}
                  />
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Marwadi University &bull; Rajkot
                  </div>
                  <div>Issued Copy: {currentDate}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                    Campus Belonging Report Record
                  </h1>
                  <p className="text-xs text-slate-500">
                    Official Student Physical Copy for Item Tracking &amp; Security Desk Handover
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isLost ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-teal-100 text-teal-800 border border-teal-200'
                }`}>
                  {isLost ? 'Lost Item Report' : 'Found Item Report'}
                </span>
              </div>
            </div>

            {/* 2. Registration Token & Live Status Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="sm:col-span-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Registration Token (Keep for Desk Verification)
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-teal-900 tracking-wider">
                  {token}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Current Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>{item.status || 'Active in Directory'}</span>
                </span>
              </div>
            </div>

            {/* 3. Primary Item Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Left 2 Columns: Detailed Item Specs */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Item Title &amp; Category
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.itemName}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md mt-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    <span>Category: <strong>{item.category || 'General Belonging'}</strong></span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-medium">Reported Date:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5 font-medium">Approximate Time:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {item.approximateTime || 'Not specified'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5 font-medium">Campus Zone:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      {item.location}
                    </span>
                  </div>

                  {item.specificSpot && (
                    <div>
                      <span className="text-slate-400 block mb-0.5 font-medium">Specific Spot / Room:</span>
                      <span className="font-semibold text-slate-800">
                        {item.specificSpot}
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Item Description &amp; Identifying Marks
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
                    {item.description || 'No detailed description provided.'}
                  </p>
                </div>
              </div>

              {/* Right Column: QR Code for Verification Scan & Item Photo */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt={`QR code for ${token}`} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">Loading QR...</span>
                  )}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider leading-tight">
                  Scan to verify live status on mobile
                </div>
                <div className="text-[10px] font-mono text-teal-800 truncate max-w-full px-2">
                  Token: {token}
                </div>
              </div>

            </div>

            {/* 4. Finder / Recovery Notes if present */}
            {item.foundDetails && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1 flex items-center gap-1 text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Item Found Information
                </span>
                <p className="text-[11px] text-slate-700">
                  Holding Spot: <strong>{item.foundDetails.foundLocation}</strong>
                  {item.foundDetails.note && ` — "${item.foundDetails.note}"`}
                </p>
              </div>
            )}

            {/* 5. Official Verification Instructions at MB315 */}
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>Verification Instructions for Marwadi University Students &amp; Staff</span>
              </div>
              <p className="text-amber-900/90 leading-relaxed text-[11px]">
                To claim or verify this item in person, bring this printed physical slip (or your 12-digit token: <strong>{token}</strong>) along with your official <strong>Marwadi University Student ID Card</strong> to the Demonstration &amp; Security Desk:
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] font-semibold text-slate-800">
                <span>Location: <strong>MB315, Main Academic Building</strong></span>
                <span>Hours: <strong>Mon–Sat | 8:30 AM – 6:00 PM</strong></span>
              </div>
            </div>

            {/* 6. Desk Verification Stamp / Signature Area */}
            <div className="pt-4 border-t-2 border-dashed border-slate-300 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-500">
              <div>
                <span className="block font-medium mb-8">Reporter / Student Signature:</span>
                <div className="border-b border-slate-400 w-3/4"></div>
              </div>
              <div>
                <span className="block font-medium mb-8">Security / MB315 Officer:</span>
                <div className="border-b border-slate-400 w-3/4"></div>
              </div>
              <div className="col-span-2 sm:col-span-1 text-right text-[10px] text-slate-400 self-end">
                <span>CampusFind Prototype &bull; Student Physical Copy</span>
              </div>
            </div>

          </div>

          {/* Action Buttons Row (Hidden during actual print) */}
          <div className="print-hide flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Printer-friendly view optimized for standard A4 / Letter paper.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex-1 sm:flex-initial"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
              >
                <Printer className="w-4 h-4" />
                <span>Print Physical Copy</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

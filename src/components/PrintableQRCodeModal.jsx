import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Printer, 
  Download, 
  X, 
  Copy, 
  Check, 
  Building2, 
  Scissors,
  Sparkles
} from 'lucide-react';

export default function PrintableQRCodeModal({ report, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const printRef = useRef(null);

  if (!report) return null;

  const token = report.token || report.id;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const trackingUrl = `${baseUrl}/track?token=${token}`;

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

  // Generate crisp QR code
  useEffect(() => {
    QRCode.toDataURL(
      trackingUrl,
      {
        width: 320,
        margin: 2,
        color: {
          dark: '#0A1A2F',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        } else {
          console.error('Failed generating QR code:', err);
        }
      }
    );
  }, [trackingUrl]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `CampusFind-QR-Token-${token}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(trackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close when clicking directly on the backdrop outside the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      {/* Print-specific style override: prints ONLY the horizontal badge */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-tag-area, #printable-tag-area * {
            visibility: visible !important;
          }
          #printable-tag-area {
            position: fixed !important;
            left: 50% !important;
            top: 30px !important;
            transform: translateX(-50%) !important;
            width: 680px !important;
            max-width: 95vw !important;
            display: block !important;
            border: 2px dashed #0F2347 !important;
            padding: 24px !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border-radius: 18px !important;
            page-break-inside: avoid !important;
          }
          #printable-tag-area .print-hide {
            display: none !important;
          }
          #printable-tag-area .tag-inner-layout {
            display: flex !important;
            flex-direction: row !important;
            align-items: stretch !important;
            gap: 24px !important;
          }
          #printable-tag-area .tag-qr-col {
            width: 250px !important;
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #printable-tag-area .tag-details-col {
            flex: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
        }
      `}</style>

      {/* Main Modal Card */}
      <div 
        className="bg-white rounded-3xl max-w-2xl sm:max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Prominent Close Button */}
        <div className="bg-[#0F2347] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <QrCode className="w-5 h-5 text-cyan-400" />
            </span>
            <div>
              <h2 id="qr-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                Printable Belonging ID Tag
              </h2>
              <p className="text-xs text-slate-300">
                Direct QR recovery sticker for campus belongings
              </p>
            </div>
          </div>

          {/* Close (X) button with circular background, hover, focus, and aria */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close QR badge preview"
            title="Close (Esc)"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-[#0F2347] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5 max-h-[82vh] overflow-y-auto">
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Identification Tag Preview</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-teal-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Ready to print or download
            </span>
          </div>

          {/* Printable Tag Container (Two-column on desktop, stacked on mobile) */}
          <div 
            id="printable-tag-area"
            ref={printRef}
            className="bg-slate-50/80 border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors rounded-3xl p-4 sm:p-6 text-slate-900 relative shadow-sm"
          >
            {/* Scissor Cut Line Guide (hidden during print) */}
            <div className="print-hide flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-3 px-1">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Scissors className="w-3.5 h-3.5" />
                Cut along dashed border
              </span>
              <span>Marwadi University Official Tag</span>
            </div>

            {/* Inner Badge Layout (Desktop: Horizontal 2-columns; Mobile: stacked) */}
            <div className="tag-inner-layout flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm">
              
              {/* LEFT COLUMN: Large, Clearly Scannable QR Code */}
              <div className="tag-qr-col w-full sm:w-[250px] shrink-0 flex flex-col items-center justify-center">
                <div className="w-56 h-56 sm:w-60 sm:h-60 bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-center shadow-inner">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt={`QR Code for ${report.itemName}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-xs text-slate-400 gap-2">
                      <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating QR Code...</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide uppercase">
                  Scan with any smartphone camera
                </span>
              </div>

              {/* RIGHT COLUMN: Owner and Item Details */}
              <div className="tag-details-col flex-1 flex flex-col justify-between text-left space-y-3.5 w-full min-w-0">
                
                {/* Branding & Identification Pill */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#0F2347]">
                      CAMPUSFIND &bull; MARWADI UNIVERSITY
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-[10px] font-extrabold uppercase tracking-wider">
                      BELONGING IDENTIFICATION
                    </span>
                  </div>

                  {/* Item Name */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug break-words">
                    {report.itemName}
                  </h3>

                  {/* Category & Location metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {report.category || 'Belonging'}
                    </span>
                    {report.location && (
                      <>
                        <span>&bull;</span>
                        <span className="truncate">{report.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Owner & 12-Digit Registration Token */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Registered Owner:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">
                      {report.studentName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium">Registration Token:</span>
                    <span className="font-mono text-sm font-black text-teal-800 tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200">
                      {token}
                    </span>
                  </div>
                </div>

                {/* Short Return Instruction */}
                <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    If found, please scan this QR code or return it to <strong className="font-bold text-amber-900">MB315, Marwadi University</strong>.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Direct Link Row */}
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="text-slate-400 font-medium shrink-0 pl-1">QR Link:</span>
            <span className="text-[11px] font-mono truncate flex-1 text-slate-700">
              {trackingUrl}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors shrink-0 flex items-center gap-1.5 text-xs cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>

          {/* Action Buttons: Download PNG, Print, Close */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG</span>
            </button>

            <div className="flex items-center gap-2.5 order-1 sm:order-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex-1 sm:flex-initial cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-initial"
              >
                <Printer className="w-4 h-4" />
                <span>Print Sticker Tag</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

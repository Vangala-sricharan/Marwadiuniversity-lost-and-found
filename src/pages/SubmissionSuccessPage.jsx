import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Search, 
  Home, 
  MapPin, 
  Clock, 
  Building2, 
  Info,
  QrCode,
  Printer
} from 'lucide-react';
import { fetchReportByToken } from '../services/api';
import { imageAssets } from '../config/imageAssets';
import PrintableQRCodeModal from '../components/PrintableQRCodeModal';

export default function SubmissionSuccessPage() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    // 1. Try to get report from router state (passed upon creation in MongoDB)
    if (location.state && location.state.report) {
      setReport(location.state.report);
      setLoading(false);
      return;
    }

    // 2. Otherwise try to resolve from query param `?token=...` via MongoDB Atlas API
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      fetchReportByToken(tokenParam)
        .then((data) => {
          if (data && data.report) {
            setReport(data.report);
          }
        })
        .catch((err) => {
          console.error('Error fetching report in success page:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location.state, searchParams]);

  const handleCopyToken = () => {
    if (!report?.token) return;
    navigator.clipboard.writeText(report.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border border-slate-200 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <Info className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Active Submission Found</h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            We couldn't locate recent submission details. If you have your 12-digit token, you can look it up in the tracking portal.
          </p>
          <div className="flex flex-col gap-2.5">
            <Link
              to="/track"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Track by Token
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isLost = report.reportType === 'lost' || report.type === 'lost';
  const categoryIcon = imageAssets.categories[report.category] || imageAssets.placeholders.item;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Success Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          
          {/* Top Banner with Celebratory / Professional Theme */}
          <div className={`p-8 sm:p-10 text-center relative overflow-hidden ${
            isLost 
              ? 'bg-gradient-to-b from-rose-50 via-white to-white' 
              : 'bg-gradient-to-b from-teal-50 via-white to-white'
          }`}>
            {/* Animated Success Badge Icon */}
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg ${
              isLost
                ? 'bg-rose-500 text-white shadow-rose-500/20'
                : 'bg-teal-600 text-white shadow-teal-600/20'
            }`}>
              <CheckCircle2 className="w-11 h-11" />
            </div>

            {/* Required Headline */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Thank You!
            </h1>

            {/* Required Supporting Message */}
            <p className="text-base sm:text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
              Your report has been successfully registered with CampusFind.
            </p>
          </div>

          <div className="px-6 sm:px-10 pb-10 space-y-6">
            
            {/* Token Display Card (Critical Requirement) */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 text-white text-center shadow-lg relative overflow-hidden border border-slate-800">
              <span className="text-xs uppercase tracking-widest text-teal-400 font-bold block mb-1">
                Your Official Registration Token
              </span>
              
              {/* Exactly 12 digits */}
              <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-wider text-white my-3 select-all">
                {report.token}
              </div>

              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Please save this 12-digit token. You will need it to track the status of your report or claim this item on campus.
              </p>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    copied
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Token Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-300" />
                      <span>Copy Token</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Summary Details Grid */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200/70">
                Registered Report Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Report Type</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isLost 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                      : 'bg-teal-100 text-teal-800 border border-teal-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isLost ? 'bg-rose-500' : 'bg-teal-500'}`}></span>
                    {isLost ? 'Lost Item Report' : 'Found Item Report'}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Item Name</span>
                  <span className="font-bold text-slate-900 truncate block">
                    {report.itemName}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Reported Campus Location</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    {report.location}
                  </span>
                  {report.specificSpot && (
                    <span className="text-xs text-slate-500 block pl-5 mt-0.5">
                      Spot: {report.specificSpot}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Submission Date &amp; Time</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                    {report.formattedSubmissionDate || report.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Student / Reporter Name</span>
                  <span className="font-semibold text-slate-800 block">
                    {report.studentName}
                  </span>
                </div>

                {report.grNumber && (
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Verified GR Number</span>
                    <span className="font-mono font-bold text-teal-700 block">
                      {report.grNumber}
                    </span>
                  </div>
                )}

                {report.email && (
                  <div className="sm:col-span-2">
                    <span className="text-xs text-slate-400 block mb-0.5">Institutional Email</span>
                    <span className="font-medium text-slate-700 block">
                      {report.email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Required Instruction Callout */}
            <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 flex items-start gap-3.5">
              <Building2 className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-amber-900 mb-0.5">
                  Important Campus Instruction
                </p>
                <p className="text-sm font-bold text-amber-900">
                  For further details, please visit MB315, Marwadi University.
                </p>
                <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                  Bring your 12-digit registration token (<span className="font-mono font-bold">{report.token}</span>) and your official Marwadi University student ID card when visiting MB315.
                </p>
              </div>
            </div>

            {/* Belonging QR Code Tag Generator Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-[#0F2347] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800 shadow-md">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <QrCode className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Print Belonging QR Tag</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold tracking-wider uppercase border border-cyan-400/30">
                      New
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Generate a printable sticker tag with a direct QR code for this report to stick on your belonging.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQRModal(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                <span>Generate Tag</span>
              </button>
            </div>

            {/* Required Action Buttons: Copy Token, Track Report, Back to Home */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyToken}
                className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy Token'}</span>
              </button>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors flex-1 sm:flex-initial"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  <span>Back to Home</span>
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(`/track?token=${report.token}`)}
                  className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer flex-1 sm:flex-initial"
                >
                  <Search className="w-4 h-4 text-teal-200" />
                  <span>Track Report</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Printable QR Code Modal */}
      {showQRModal && (
        <PrintableQRCodeModal
          report={report}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
}

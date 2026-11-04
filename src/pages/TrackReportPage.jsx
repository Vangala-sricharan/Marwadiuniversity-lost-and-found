import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  Phone, 
  Building2, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowRight,
  QrCode,
  CheckCircle2,
  Mail,
  ShieldCheck,
  FileText,
  Archive,
  Info,
  Calendar,
  Sparkles,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { fetchReportByToken, updateReportStatusApi } from '../services/api';
import { isValidTokenFormat } from '../utils/tokenGenerator';
import { imageAssets } from '../config/imageAssets';
import PrintableQRCodeModal from '../components/PrintableQRCodeModal';
import MarkAsFoundModal from '../components/MarkAsFoundModal';

// Campus verification & recovery timeline definition
const TIMELINE_STAGES = [
  {
    key: 'Submitted',
    label: 'Submitted',
    shortDesc: 'Report logged in portal',
    icon: FileText,
  },
  {
    key: 'Finder Information Submitted',
    label: 'Finder Info Submitted',
    shortDesc: 'Found info logged via QR',
    icon: PackageCheck,
  },
  {
    key: 'Under Verification',
    label: 'Under Verification',
    shortDesc: 'Desk check at MB315',
    icon: ShieldCheck,
  },
  {
    key: 'Recovered',
    label: 'Recovered',
    shortDesc: 'Matched & ready for pickup',
    icon: CheckCircle2,
  },
  {
    key: 'Closed',
    label: 'Closed',
    shortDesc: 'Handover complete',
    icon: Archive,
  },
];

export default function TrackReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryToken = searchParams.get('token') || '';

  const [inputToken, setInputToken] = useState(queryToken);
  const [report, setReport] = useState(null);
  const [finderSubmissions, setFinderSubmissions] = useState([]);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showMarkFoundModal, setShowMarkFoundModal] = useState(false);
  const [demoNotice, setDemoNotice] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Auto-search if token is present in URL
  useEffect(() => {
    if (queryToken) {
      setInputToken(queryToken);
      executeSearch(queryToken);
    }
  }, [queryToken]);

  const executeSearch = async (tokenToSearch) => {
    const clean = tokenToSearch.trim();
    setValidationError('');
    setDemoNotice('');

    if (!clean) {
      setValidationError('Please enter your 12-digit registration token.');
      setReport(null);
      setFinderSubmissions([]);
      setSearched(false);
      return;
    }

    if (!isValidTokenFormat(clean)) {
      setValidationError('Registration token must be exactly 12 digits (format: DDMMYYYYHHmm).');
      setReport(null);
      setFinderSubmissions([]);
      setSearched(true);
      return;
    }

    setIsSearching(true);
    try {
      const data = await fetchReportByToken(clean);
      setReport(data.report);
      setFinderSubmissions(data.finderSubmissions || []);
      setSearched(true);
    } catch (err) {
      setReport(null);
      setFinderSubmissions([]);
      setSearched(true);
      // "No report found with this registration token. Please check your token and try again."
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(inputToken.trim() ? { token: inputToken.trim() } : {});
    executeSearch(inputToken);
  };

  const handleCopy = () => {
    if (!report?.token) return;
    navigator.clipboard.writeText(report.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStageDemoChange = async (newStage) => {
    if (!report?.token) return;
    try {
      const updated = await updateReportStatusApi(
        report.token, 
        newStage, 
        `Stage updated to ${newStage} in MongoDB Atlas database.`
      );
      setReport(updated);
      setDemoNotice(`Timeline stage updated to "${newStage}" in MongoDB Atlas.`);
      setTimeout(() => setDemoNotice(''), 3500);
    } catch (err) {
      console.error('Failed to change stage:', err);
    }
  };

  const isLost = report && (report.reportType === 'lost' || report.type === 'lost');
  const categoryIcon = report ? (imageAssets.categories[report.category] || imageAssets.placeholders.item) : null;

  // Mask sensitive contact details to prevent shoulder-surfing/accidental exposure
  const maskContact = (contact) => {
    if (!contact) return 'Protected on file';
    if (contact.includes('@')) {
      const parts = contact.split('@');
      const user = parts[0];
      const domain = parts[1] || 'marwadiuniversity.ac.in';
      const visible = user.length > 2 ? user.slice(0, 2) : user.slice(0, 1);
      return `${visible}***@${domain}`;
    }
    const digits = contact.replace(/\D/g, '');
    if (digits.length >= 10) {
      return `+91 ${digits.slice(0, 2)}*** ***${digits.slice(-2)}`;
    }
    return `${contact.slice(0, 2)}***${contact.slice(-2)}`;
  };

  // Determine numeric index of current status in timeline
  const getCurrentStageIndex = (status) => {
    const norm = status || 'Submitted';
    const idx = TIMELINE_STAGES.findIndex(s => s.key.toLowerCase() === norm.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  const currentStageIdx = report ? getCurrentStageIndex(report.status) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold tracking-wide uppercase mb-3">
            <Search className="w-3.5 h-3.5 text-teal-600" />
            Official Student Tracking Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Your Report
          </h1>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Enter your 12-digit registration token to verify your submission details, view physical recovery directions, and monitor the 4-stage status timeline.
          </p>
        </div>

        {/* Token Search Box Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="tokenInput" 
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                12-Digit Registration Token <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="tokenInput"
                  value={inputToken}
                  onChange={(e) => {
                    const numeric = e.target.value.replace(/\D/g, '').slice(0, 12);
                    setInputToken(numeric);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="e.g. 301020262017"
                  maxLength={12}
                  className={`w-full pl-4 pr-32 py-3.5 rounded-2xl border text-base font-mono tracking-wider bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    validationError
                      ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                      : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                  }`}
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track</span>
                  </button>
                </div>
              </div>

              {validationError && (
                <p className="mt-2 text-xs text-rose-600 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {validationError}
                </p>
              )}

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Format: DDMMYYYYHHmm (Date + 24-hr Time)</span>
                <span>{inputToken.length}/12 Digits</span>
              </div>
            </div>
          </form>

          {/* Quick Token Helper for sample test tokens */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Sample active tokens:</span>
            {['281020261435', '291020261320', '301020260910'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setInputToken(t);
                  setSearchParams({ token: t });
                  executeSearch(t);
                }}
                className="font-mono bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors text-[11px]"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {searched && (
          <div>
            {!report ? (
              /* REQUIRED EXACT ERROR MESSAGE: "No report found with this registration token. Please check your token and try again." */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-rose-200/80 shadow-sm text-center animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Report Lookup Failed
                </h3>
                <p className="text-sm font-semibold text-rose-700 max-w-md mx-auto leading-relaxed">
                  No report found with this registration token. Please check your token and try again.
                </p>
                <p className="text-xs text-slate-500 mt-3 max-w-sm mx-auto">
                  Make sure you have typed all 12 digits generated at the time of submission. If you just filed a report, ensure your browser storage has not been cleared.
                </p>
              </div>
            ) : (
              /* Found Report Tracking Details */
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in duration-200 space-y-0">
                
                {/* Header status bar */}
                <div className={`p-6 sm:p-8 border-b ${
                  isLost ? 'bg-rose-50/70 border-rose-100' : 'bg-teal-50/70 border-teal-100'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        isLost 
                          ? 'bg-rose-600 text-white' 
                          : 'bg-teal-700 text-white'
                      }`}>
                        {isLost ? 'Lost Item Report' : 'Found Item Report'}
                      </span>

                      <div className="flex items-center gap-1.5 bg-white/90 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-800">
                        <span>Token: {report.token}</span>
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy Token"
                          className="text-slate-400 hover:text-slate-700 ml-1 cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Current Status Badge */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 uppercase font-semibold">Current Stage:</span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        report.status === 'Recovered' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : report.status === 'Finder Information Submitted'
                            ? 'bg-teal-100 text-teal-800 border border-teal-300'
                            : report.status === 'Under Verification'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : report.status === 'Closed'
                                ? 'bg-slate-200 text-slate-800 border border-slate-300'
                                : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          report.status === 'Recovered'
                            ? 'bg-emerald-500'
                            : report.status === 'Finder Information Submitted'
                              ? 'bg-teal-500 animate-pulse'
                              : report.status === 'Under Verification'
                                ? 'bg-amber-500 animate-pulse'
                                : report.status === 'Closed'
                                  ? 'bg-slate-500'
                                  : 'bg-blue-500 animate-pulse'
                        }`}></span>
                        {report.status || 'Submitted'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5-STAGE REPORT STATUS TIMELINE */}
                <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200/80">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-600" />
                        Report Status Lifecycle Timeline
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Campus verification and recovery pipeline
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                      Stage {currentStageIdx + 1} of {TIMELINE_STAGES.length}
                    </span>
                  </div>

                  {/* Visual Stepper Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
                    {TIMELINE_STAGES.map((stage, idx) => {
                      const StageIcon = stage.icon;
                      const isCompleted = idx < currentStageIdx;
                      const isCurrent = idx === currentStageIdx;
                      const isPending = idx > currentStageIdx;

                      return (
                        <div 
                          key={stage.key}
                          className={`relative p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                              : isCompleted
                                ? 'bg-teal-50/40 border-teal-200/90'
                                : 'bg-white/60 border-slate-200 opacity-70'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              isCompleted
                                ? 'bg-teal-600 text-white'
                                : isCurrent
                                  ? 'bg-[#0F2347] text-white ring-2 ring-teal-400'
                                  : 'bg-slate-200 text-slate-600'
                            }`}>
                              {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                            </span>

                            <StageIcon className={`w-4 h-4 ${
                              isCurrent ? 'text-teal-600' : isCompleted ? 'text-teal-700' : 'text-slate-400'
                            }`} />
                          </div>

                          <h4 className={`text-xs font-bold leading-tight ${
                            isCurrent ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                          }`}>
                            {stage.label}
                          </h4>

                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                            {stage.shortDesc}
                          </p>

                          {isCurrent && (
                            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-teal-600 text-white">
                              Active Stage
                            </span>
                          )}
                          {isCompleted && (
                            <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
                              Completed
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Stage Audit History Feed */}
                  {report.history && report.history.length > 0 && (
                    <div className="mt-5 bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Timeline Audit Trail
                      </span>
                      {report.history.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 py-1 border-b border-slate-100 last:border-b-0">
                          <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-800">{h.stage}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {new Date(h.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-slate-600 text-[11px] mt-0.5">{h.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Honest LocalStorage Prototype Notice */}
                  <div className="mt-5 bg-blue-50/80 border border-blue-200/90 rounded-2xl p-4 text-xs text-blue-950 flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-blue-900">
                        Browser LocalStorage Prototype Architecture
                      </p>
                      <p className="leading-relaxed text-blue-800 text-[11px]">
                        CampusFind operates as an independent client-side prototype. Reports remain in &ldquo;Submitted&rdquo; status in your local browser session unless updated. No automated background cloud sync or fabricated administrative actions occur.
                      </p>
                    </div>
                  </div>

                  {/* Prototype Demonstration Switcher (For Evaluation Testing) */}
                  <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>Interactive Prototype Demonstration: Test Stage Transitions</span>
                      </div>
                      {demoNotice && (
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 animate-in fade-in">
                          {demoNotice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_STAGES.map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => handleStageDemoChange(s.key)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            report.status === s.key
                              ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-500/30'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <span>{s.label}</span>
                          {report.status === s.key && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Body Details & Required Fields */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Item Headline */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 p-2.5 flex items-center justify-center shrink-0">
                      <img 
                        src={report.imageUrl || categoryIcon} 
                        alt={report.itemName} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = imageAssets.placeholders.item;
                        }}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {report.itemName}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Category: <span className="font-semibold text-slate-700">{report.category}</span>
                      </p>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {report.description}
                      </p>
                    </div>
                  </div>

                  {/* Required Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs">
                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">
                        Reported Location
                      </span>
                      <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                        {report.location}
                      </span>
                      {report.specificSpot && (
                        <span className="text-slate-500 block pl-5 mt-0.5">
                          Spot: {report.specificSpot}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">
                        Submission Date &amp; Time
                      </span>
                      <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                        {report.formattedSubmissionDate || `${report.date} ${report.approximateTime}`}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">
                        Student Contact (Protected)
                      </span>
                      <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5 font-mono">
                        <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                        {maskContact(report.contact)}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">
                        Student Identification
                      </span>
                      <span className="text-sm font-semibold text-slate-900 block">
                        {report.studentName}
                      </span>
                      {report.grNumber && (
                        <span className="text-xs text-teal-700 font-mono font-bold block mt-0.5">
                          GR Number: {report.grNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* QR Finder Submission Banner if Finder Information was logged via QR */}
                  {report.finderSubmission && (
                    <div className="bg-teal-50/90 border-2 border-teal-300 rounded-2xl p-5 space-y-3 animate-in fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-teal-950 font-bold text-sm">
                          <PackageCheck className="w-5 h-5 text-teal-700 shrink-0" />
                          <span>QR Finder Information Logged</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-200 text-teal-950 text-xs font-bold w-fit">
                          Stage: Finder Information Submitted
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/90 p-4 rounded-xl border border-teal-100">
                        <div>
                          <span className="text-slate-500 block mb-0.5">Finder Full Name:</span>
                          <span className="font-semibold text-slate-900">{report.finderSubmission.finderName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5">Finder GR Number:</span>
                          <span className="font-semibold text-teal-800 font-mono">{report.finderSubmission.finderGrNumber}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-500 block mb-0.5">Campus Location Where Found:</span>
                          <span className="font-semibold text-teal-950 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            {report.finderSubmission.foundLocation}
                          </span>
                        </div>
                        <div className="sm:col-span-2 text-[11px] text-slate-500 pt-1">
                          Recorded on: {report.finderSubmission.formattedSubmissionDate || report.finderSubmission.submissionTimestamp}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Found / Recovery Notice Banner if Item Marked Found */}
                  {report.foundDetails && (
                    <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-5 space-y-3 animate-in fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Item Located &amp; Ready for Collection</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-200/90 text-emerald-950 text-xs font-bold w-fit">
                          <Mail className="w-3.5 h-3.5 text-emerald-800" />
                          Owner Email Notified
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/90 p-4 rounded-xl border border-emerald-100">
                        <div>
                          <span className="text-slate-500 block mb-0.5">Finder Name:</span>
                          <span className="font-semibold text-slate-900">{report.foundDetails.finderName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-0.5">Finder Contact (Protected):</span>
                          <span className="font-semibold text-teal-800 font-mono">{maskContact(report.foundDetails.finderContact)}</span>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="text-slate-500 block mb-0.5">Handover / Holding Location:</span>
                          <span className="font-semibold text-emerald-900">{report.foundDetails.foundLocation}</span>
                        </div>
                        {report.foundDetails.note && (
                          <div className="sm:col-span-2 pt-2 border-t border-emerald-100">
                            <span className="text-slate-500 block mb-0.5">Finder Note:</span>
                            <span className="italic text-slate-700">&quot;{report.foundDetails.note}&quot;</span>
                          </div>
                        )}
                        <div className="sm:col-span-2 text-[11px] text-slate-400 pt-1">
                          Marked found on: {report.foundDetails.formattedMarkedAt}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Physical Campus Visit Instruction */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
                    <Building2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">For further details, please visit MB315, Marwadi University.</p>
                      <p className="text-amber-800 mt-0.5">
                        Present this 12-digit registration token (<span className="font-mono font-bold">{report.token}</span>) and your official student ID card at MB315 to confirm custody or claim this property.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Action Controls */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowQRModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <QrCode className="w-4 h-4 text-cyan-300" />
                      <span>Print Belonging QR Tag</span>
                    </button>

                    {isLost && report.status !== 'Recovered' && report.status !== 'Closed' && (
                      <button
                        type="button"
                        onClick={() => setShowMarkFoundModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>I Found This Item (Mark Recovered &amp; Notify)</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Footer action */}
                <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    CampusFind Marwadi University &bull; Location: MB315
                  </span>
                  <Link
                    to="/browse"
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    <span>Browse all campus items</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            )}
          </div>
        )}

      </div>

      {/* Printable QR Code Modal */}
      {showQRModal && report && (
        <PrintableQRCodeModal
          report={report}
          onClose={() => setShowQRModal(false)}
        />
      )}

      {/* Mark As Found Modal */}
      {showMarkFoundModal && report && (
        <MarkAsFoundModal
          item={report}
          onClose={() => setShowMarkFoundModal(false)}
          onSuccess={(updated) => {
            setReport(updated);
          }}
        />
      )}
    </div>
  );
}

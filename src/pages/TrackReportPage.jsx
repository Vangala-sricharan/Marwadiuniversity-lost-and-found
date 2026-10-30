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
  ArrowRight
} from 'lucide-react';
import { getReportByToken } from '../services/storage';
import { isValidTokenFormat } from '../utils/tokenGenerator';
import { imageAssets } from '../config/imageAssets';

export default function TrackReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryToken = searchParams.get('token') || '';

  const [inputToken, setInputToken] = useState(queryToken);
  const [report, setReport] = useState(null);
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Auto-search if token is present in URL
  useEffect(() => {
    if (queryToken) {
      setInputToken(queryToken);
      executeSearch(queryToken);
    }
  }, [queryToken]);

  const executeSearch = (tokenToSearch) => {
    const clean = tokenToSearch.trim();
    setValidationError('');

    if (!clean) {
      setValidationError('Please enter your 12-digit registration token.');
      setReport(null);
      setSearched(false);
      return;
    }

    if (!isValidTokenFormat(clean)) {
      setValidationError('Registration token must be exactly 12 digits (format: DDMMYYYYHHmm).');
      setReport(null);
      setSearched(true);
      return;
    }

    const found = getReportByToken(clean);
    setReport(found);
    setSearched(true);
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

  const isLost = report && (report.reportType === 'lost' || report.type === 'lost');
  const categoryIcon = report ? (imageAssets.categories[report.category] || imageAssets.placeholders.item) : null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            Enter your 12-digit registration token to verify your submission details and real-time status.
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
                    // Filter to numeric only, max 12 chars
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
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in duration-200">
                
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
                          className="text-slate-400 hover:text-slate-700 ml-1"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Current Report Status: Initial "Submitted" */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 uppercase font-semibold">Current Status:</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        {report.status || 'Submitted'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
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
                        Student Contact
                      </span>
                      <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                        {report.contact}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 uppercase tracking-wider font-bold block mb-1">
                        Student Name
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {report.studentName}
                      </span>
                    </div>
                  </div>

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

                </div>

                {/* Footer action */}
                <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    CampusFind Marwadi University
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
    </div>
  );
}

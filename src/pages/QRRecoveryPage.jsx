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
  Sparkles,
  Info,
  PackageCheck,
  CheckCircle2,
  User,
  Mail,
  Hash,
  AlertCircle,
  Check
} from 'lucide-react';
import { isValidMUEmail, isValidGRNumber } from '../services/storage';
import { fetchReportByToken, submitFinderInfoApi } from '../services/api';
import { imageAssets } from '../config/imageAssets';

const FOUND_LOCATION_OPTIONS = [
  'MB Building',
  'Academic Block',
  'Classroom',
  'Library',
  'Hostel',
  'Cafeteria',
  'Sports Ground',
  'Parking Area',
  'Other'
];

export default function QRRecoveryPage() {
  const { referenceId } = useParams();
  const [report, setReport] = useState(null);
  const [checked, setChecked] = useState(false);
  const [existingSubmission, setExistingSubmission] = useState(null);

  // Finder Form State
  const [showFinderForm, setShowFinderForm] = useState(false);
  const [finderData, setFinderData] = useState({
    finderName: '',
    finderEmail: '',
    finderGrNumber: '',
    foundLocation: 'MB Building',
    customLocation: '',
  });
  const [finderErrors, setFinderErrors] = useState({});
  const [finderTouched, setFinderTouched] = useState({});
  const [isSubmittingFinder, setIsSubmittingFinder] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadQRReport() {
      if (!referenceId) {
        setChecked(true);
        return;
      }
      try {
        const clean = referenceId.trim();
        const data = await fetchReportByToken(clean);
        if (isMounted) {
          setReport(data.report);
          if (data.finderSubmissions && data.finderSubmissions.length > 0) {
            setExistingSubmission(data.finderSubmissions[0]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setReport(null);
        }
      } finally {
        if (isMounted) setChecked(true);
      }
    }
    loadQRReport();
    return () => { isMounted = false; };
  }, [referenceId]);

  const cleanReference = (referenceId || '').trim();
  const isLost = report && (report.reportType === 'lost' || report.type === 'lost');
  const categoryIcon = report ? (imageAssets.categories[report.category] || imageAssets.placeholders.item) : imageAssets.placeholders.item;
  const displayImage = report?.imageUrl || categoryIcon;

  // Validation logic
  const validateFinderField = (field, value) => {
    let err = null;
    switch (field) {
      case 'finderName':
        if (!value || !value.trim()) {
          err = 'Finder full name is required.';
        } else if (value.trim().length < 2) {
          err = 'Please enter at least 2 characters.';
        }
        break;
      case 'finderEmail':
        if (!value || !value.trim()) {
          err = 'Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.';
        } else if (!isValidMUEmail(value.trim())) {
          err = 'Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.';
        }
        break;
      case 'finderGrNumber':
        if (!value || !String(value).trim()) {
          err = 'GR Number is required.';
        } else if (!isValidGRNumber(String(value).trim())) {
          err = 'GR Number must be exactly 6 digits.';
        }
        break;
      case 'foundLocation':
        if (!value) {
          err = 'Please select the place where the item was found.';
        }
        break;
      case 'customLocation':
        if (finderData.foundLocation === 'Other' && (!value || !value.trim())) {
          err = 'Please specify the exact campus location.';
        }
        break;
      default:
        break;
    }
    setFinderErrors(prev => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleFinderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'finderGrNumber') {
      const numeric = value.replace(/\D/g, '').slice(0, 6);
      setFinderData(prev => ({ ...prev, finderGrNumber: numeric }));
      if (finderErrors.finderGrNumber) {
        setFinderErrors(prev => ({ ...prev, finderGrNumber: null }));
      }
      return;
    }

    setFinderData(prev => ({ ...prev, [name]: value }));
    if (finderErrors[name]) {
      setFinderErrors(prev => ({ ...prev, [name]: null }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleFinderBlur = (field) => {
    setFinderTouched(prev => ({ ...prev, [field]: true }));
    validateFinderField(field, finderData[field]);
  };

  const handleFinderSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingFinder) return;

    setGeneralError('');

    const fieldsToValidate = ['finderName', 'finderEmail', 'finderGrNumber', 'foundLocation'];
    if (finderData.foundLocation === 'Other') {
      fieldsToValidate.push('customLocation');
    }

    let hasError = false;
    fieldsToValidate.forEach(f => {
      const valid = validateFinderField(f, finderData[f]);
      if (!valid) hasError = true;
    });

    setFinderTouched({
      finderName: true,
      finderEmail: true,
      finderGrNumber: true,
      foundLocation: true,
      customLocation: true,
    });

    if (hasError) {
      return;
    }

    setIsSubmittingFinder(true);

    try {
      const tokenToUse = report?.token || cleanReference;
      const result = await submitFinderInfoApi(tokenToUse, finderData);
      setReport(result.updatedReport);
      setSubmissionSuccess(result.submissionRecord);
      setExistingSubmission(result.submissionRecord);
      setShowFinderForm(false);
    } catch (err) {
      setGeneralError(err.message || 'Failed to submit finder information.');
    } finally {
      setIsSubmittingFinder(false);
    }
  };

  const activeRecord = submissionSuccess || existingSubmission;

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
                      {report.status === 'Finder Information Submitted' && (
                        <span className="bg-teal-100 text-teal-800 border border-teal-200 text-xs px-2.5 py-0.5 rounded-full font-bold">
                          Finder Info Recorded
                        </span>
                      )}
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

                {/* EXACT REQUIRED HANDOVER INSTRUCTION */}
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

                {/* CONFIRMATION VIEW IF FINDER INFORMATION ALREADY SUBMITTED */}
                {activeRecord ? (
                  <div className="p-6 sm:p-7 rounded-3xl bg-emerald-50/80 border-2 border-emerald-300 text-emerald-950 space-y-4 animate-in fade-in duration-300 shadow-sm">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-emerald-950">
                          Thank You for Helping!
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                          Your item-found information has been recorded for this CampusFind report.
                        </p>
                      </div>
                    </div>

                    {/* Recorded Submission Summary Details */}
                    <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-emerald-200 text-xs space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Original Item Name
                          </span>
                          <span className="font-bold text-slate-900 text-sm">
                            {activeRecord.originalItemName || report.itemName}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Registration Token
                          </span>
                          <span className="font-mono font-bold text-teal-800 text-sm">
                            {activeRecord.originalToken || report.token}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Finder&apos;s Name
                          </span>
                          <span className="font-semibold text-slate-800">
                            {activeRecord.finderName}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Found Location
                          </span>
                          <span className="font-semibold text-slate-800 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            {activeRecord.foundLocation}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Submission Date &amp; Time
                          </span>
                          <span className="font-semibold text-slate-800 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                            {activeRecord.formattedSubmissionDate || activeRecord.submissionTimestamp}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 uppercase tracking-wider font-bold block text-[10px]">
                            Recovery Status
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-900 border border-teal-300">
                            Finder Information Submitted
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Accurate Disclosures & Next Steps */}
                    <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950 text-xs flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-amber-950">
                          Please visit MB315, Marwadi University, for further assistance.
                        </p>
                        <p className="text-amber-900 leading-relaxed text-[11px]">
                          Your submission has been logged into this local CampusFind record. To safeguard security and protocol, physical possession must be handed over at MB315 for administrative custody and official owner verification.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ACTION BUTTON OR EXPANDED FINDER FORM */
                  <div className="space-y-4">
                    {!showFinderForm ? (
                      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider">
                            Campus Assistance
                          </span>
                          <h3 className="text-lg font-extrabold text-slate-900">
                            Did You Find This Misplaced Belonging?
                          </h3>
                          <p className="text-xs text-slate-600 max-w-md">
                            Help reunite this item with its student owner by logging your finder report.
                          </p>
                        </div>

                        {/* PROMINENT "I FOUND THIS ITEM" ACTION BUTTON */}
                        <button
                          type="button"
                          onClick={() => setShowFinderForm(true)}
                          className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-900/20 transition-all cursor-pointer shrink-0 w-full sm:w-auto"
                        >
                          <PackageCheck className="w-5 h-5 text-white" />
                          <span>I Found This Item</span>
                        </button>
                      </div>
                    ) : (
                      /* FINDER INFORMATION FORM */
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 border-2 border-teal-500/80 shadow-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start justify-between gap-4 mb-5 border-b border-slate-200 pb-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
                              <PackageCheck className="w-4 h-4 text-teal-600" />
                              Finder Verification Form
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">
                              Have You Found This Item?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                              Please provide your details and the location where you found this belonging so the recovery process can continue.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowFinderForm(false)}
                            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white transition-colors"
                          >
                            Cancel
                          </button>
                        </div>

                        {generalError && (
                          <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2.5">
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <span>{generalError}</span>
                          </div>
                        )}

                        <form onSubmit={handleFinderSubmit} noValidate className="space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* 1. Finder Full Name */}
                            <div>
                              <label htmlFor="finderName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Finder Full Name <span className="text-rose-500">*</span>
                              </label>
                              <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  id="finderName"
                                  name="finderName"
                                  value={finderData.finderName}
                                  onChange={handleFinderChange}
                                  onBlur={() => handleFinderBlur('finderName')}
                                  placeholder="e.g. Rahul Sharma"
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none transition-all ${
                                    finderErrors.finderName && finderTouched.finderName
                                      ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                                      : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                  }`}
                                />
                              </div>
                              {finderErrors.finderName && finderTouched.finderName && (
                                <p className="mt-1 text-[11px] text-rose-600 font-medium">
                                  {finderErrors.finderName}
                                </p>
                              )}
                            </div>

                            {/* 2. GR Number (exactly 6 digits numeric) */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label htmlFor="finderGrNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                                  GR Number <span className="text-rose-500">*</span>
                                </label>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {finderData.finderGrNumber.length}/6 digits
                                </span>
                              </div>
                              <div className="relative">
                                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  id="finderGrNumber"
                                  name="finderGrNumber"
                                  maxLength={6}
                                  value={finderData.finderGrNumber}
                                  onChange={handleFinderChange}
                                  onBlur={() => handleFinderBlur('finderGrNumber')}
                                  placeholder="e.g. 135062"
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-mono tracking-wider bg-white focus:outline-none transition-all ${
                                    finderErrors.finderGrNumber && finderTouched.finderGrNumber
                                      ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                                      : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                  }`}
                                />
                              </div>
                              {finderErrors.finderGrNumber && finderTouched.finderGrNumber ? (
                                <p className="mt-1 text-[11px] text-rose-600 font-medium">
                                  {finderErrors.finderGrNumber}
                                </p>
                              ) : (
                                <p className="mt-1 text-[10px] text-slate-400">
                                  Exactly 6 numeric digits (e.g. 135062)
                                </p>
                              )}
                            </div>

                            {/* 3. Marwadi University Email ID */}
                            <div className="sm:col-span-2">
                              <label htmlFor="finderEmail" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Marwadi University Email ID <span className="text-rose-500">*</span>
                              </label>
                              <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                  type="email"
                                  id="finderEmail"
                                  name="finderEmail"
                                  value={finderData.finderEmail}
                                  onChange={handleFinderChange}
                                  onBlur={() => handleFinderBlur('finderEmail')}
                                  placeholder="student@marwadiuniversity.ac.in"
                                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs bg-white focus:outline-none transition-all ${
                                    finderErrors.finderEmail && finderTouched.finderEmail
                                      ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/20'
                                      : 'border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20'
                                  }`}
                                />
                              </div>
                              {finderErrors.finderEmail && finderTouched.finderEmail ? (
                                <p className="mt-1 text-[11px] text-rose-600 font-medium">
                                  {finderErrors.finderEmail}
                                </p>
                              ) : (
                                <p className="mt-1 text-[10px] text-slate-400">
                                  Must end with @marwadiuniversity.ac.in
                                </p>
                              )}
                            </div>

                            {/* 4. Place Where Item Was Found */}
                            <div className="sm:col-span-2">
                              <label htmlFor="foundLocation" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Place Where Item Was Found <span className="text-rose-500">*</span>
                              </label>
                              <div className="relative">
                                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <select
                                  id="foundLocation"
                                  name="foundLocation"
                                  value={finderData.foundLocation}
                                  onChange={handleFinderChange}
                                  onBlur={() => handleFinderBlur('foundLocation')}
                                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-medium"
                                >
                                  {FOUND_LOCATION_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Conditional Custom Location if 'Other' is chosen */}
                            {finderData.foundLocation === 'Other' && (
                              <div className="sm:col-span-2 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                                <label htmlFor="customLocation" className="block text-xs font-bold text-amber-950 uppercase tracking-wider mb-1.5">
                                  Enter Custom Campus Location <span className="text-rose-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="customLocation"
                                  name="customLocation"
                                  value={finderData.customLocation}
                                  onChange={handleFinderChange}
                                  onBlur={() => handleFinderBlur('customLocation')}
                                  placeholder="e.g. Near ATM Kiosk, Main Walkway, or Basketball Court"
                                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-white focus:outline-none transition-all ${
                                    finderErrors.customLocation && finderTouched.customLocation
                                      ? 'border-rose-400 ring-2 ring-rose-100'
                                      : 'border-amber-300 focus:border-teal-500'
                                  }`}
                                />
                                {finderErrors.customLocation && finderTouched.customLocation && (
                                  <p className="mt-1 text-[11px] text-rose-600 font-medium">
                                    {finderErrors.customLocation}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Privacy Notice inside form */}
                          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-950 flex items-start gap-2.5">
                            <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>
                              We do not ask for or disclose the original owner&apos;s private phone or email. Your submission will link this item to your verified institutional credentials and update the recovery timeline.
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setShowFinderForm(false)}
                              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                            >
                              Cancel
                            </button>

                            <button
                              type="submit"
                              disabled={isSubmittingFinder}
                              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                              {isSubmittingFinder ? (
                                <>
                                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  <span>Recording Information...</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Submit Finder Information</span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}

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

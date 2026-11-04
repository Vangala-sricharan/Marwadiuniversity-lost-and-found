import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Mail, 
  Send, 
  MapPin, 
  User, 
  Phone, 
  Building2, 
  AlertCircle, 
  Eye, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { markItemAsFoundApi } from '../services/api';

export default function MarkAsFoundModal({ item, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    finderName: '',
    finderContact: '',
    foundLocation: 'Deposited at MB315, Marwadi University',
    note: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  if (!item) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.finderName.trim()) {
      newErrors.finderName = 'Finder name is required.';
    }
    if (!formData.finderContact.trim()) {
      newErrors.finderContact = 'Phone number or email is required so the owner can connect.';
    }
    if (!formData.foundLocation.trim()) {
      newErrors.foundLocation = 'Please specify where the item was found or handed over.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await markItemAsFoundApi(item.token || item.id, formData);
      setSuccessResult(result);
      if (onSuccess) {
        onSuccess(result.updatedReport);
      }
    } catch (err) {
      alert(err.message || 'Failed to update report status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0F2347] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Mark Item as Found</h3>
              <p className="text-[11px] text-slate-300">Automatic Email Notification System</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!successResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Info Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Item</span>
                  <span className="font-bold text-slate-900 text-sm">{item.itemName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Token</span>
                  <span className="font-mono font-bold text-teal-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {item.token || item.id}
                  </span>
                </div>
              </div>

              {/* Informative notification callout */}
              <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950 flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  Submitting this update will automatically dispatch an <strong>email notification</strong> to <span className="font-semibold text-slate-900">{item.studentName}</span> informing them their item has been located!
                </div>
              </div>

              {/* Finder Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.finderName}
                    onChange={(e) => setFormData(prev => ({ ...prev, finderName: e.target.value }))}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                {errors.finderName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.finderName}</p>
                )}
              </div>

              {/* Finder Contact */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Contact Phone or Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.finderContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, finderContact: e.target.value }))}
                    placeholder="e.g. +91 98250 12345 or student@marwadiuniversity.ac.in"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  />
                </div>
                {errors.finderContact && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.finderContact}</p>
                )}
              </div>

              {/* Current Found Location / Handover spot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Handover Location <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.foundLocation}
                  onChange={(e) => setFormData(prev => ({ ...prev, foundLocation: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 font-medium"
                >
                  <option value="Deposited at MB315, Marwadi University">Deposited at MB315, Marwadi University (Recommended)</option>
                  <option value="Deposited at Main Academic Gate Security Checkpoint">Deposited at Main Gate Security Checkpoint</option>
                  <option value="Deposited at Central Library Reception">Deposited at Central Library Reception</option>
                  <option value="With Finder (Please Contact Directly)">In My Care (Owner please contact me directly)</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Finder Note / Where it was found (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="e.g. Found on desk in Lab 402, handed over to security desk guard."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Dispatching Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Mark Found &amp; Send Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success confirmation & Email Receipt */
            <div className="text-center py-2 space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Item Marked as Found!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  The report status has been updated to <strong className="text-emerald-700">Found / Ready for Claim</strong>.
                </p>
              </div>

              {/* Email Notification Card */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between text-teal-900 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-teal-600" />
                    Email Notification Dispatched
                  </span>
                  <span className="bg-teal-200/80 text-teal-950 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    {successResult.emailReceipt?.status || 'Sent'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-teal-100">
                  <div><strong>Recipient:</strong> {successResult.emailReceipt?.to}</div>
                  <div><strong>Subject:</strong> {successResult.emailReceipt?.subject}</div>
                  <div><strong>Dispatch ID:</strong> <span className="font-mono">{successResult.emailReceipt?.id}</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowEmailPreview(!showEmailPreview)}
                  className="mt-2 text-teal-700 hover:text-teal-800 font-bold underline flex items-center gap-1 text-[11px]"
                >
                  <Eye className="w-3 h-3" />
                  <span>{showEmailPreview ? 'Hide Email Message' : 'View Dispatched Email Preview'}</span>
                </button>
              </div>

              {/* Email Message Preview Toggle */}
              {showEmailPreview && successResult.emailReceipt && (
                <div className="text-left p-3.5 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono max-h-48 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                  {successResult.emailReceipt.plainText}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

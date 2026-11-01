import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Star, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Clock, 
  ThumbsUp, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';
import { saveFeedback, getStoredFeedback } from '../services/consentService';

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [easeRating, setEaseRating] = useState(5);
  const [category, setCategory] = useState('Usability & UI');
  const [comments, setComments] = useState('');
  const [studentName, setStudentName] = useState('');
  const [department, setDepartment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [recentEntries, setRecentEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setRecentEntries(getStoredFeedback());
  }, [submitted]);

  const ratingLabels = {
    1: 'Needs Major Improvement',
    2: 'Below Expectations',
    3: 'Average / Functional',
    4: 'Good & Clean',
    5: 'Excellent Experience'
  };

  const easeLabels = {
    1: 'Difficult to use',
    2: 'Somewhat confusing',
    3: 'Straightforward',
    4: 'Very Easy',
    5: 'Effortless & Fast'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comments.trim()) {
      setError('Please provide your feedback comments or observations.');
      return;
    }
    setError('');

    saveFeedback({
      rating,
      easeRating,
      category,
      comments: comments.trim(),
      studentName,
      department
    });

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setComments('');
    setStudentName('');
    setDepartment('');
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to CampusFind Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold tracking-wide uppercase mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              Academic Evaluation &amp; Feedback
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Prototype Feedback
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Help us evaluate the usability, responsiveness, and token verification workflow of this Marwadi University student project.
            </p>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-amber-950 mb-1">
              Demonstration Storage Notice
            </p>
            <p className="text-amber-900">
              CampusFind is an independent student academic prototype. Feedback submitted through this form is recorded locally inside your browser storage for demonstration review and presentation. It is not connected to a live central university ticketing system.
            </p>
          </div>
        </div>

        {/* Submission Confirmation Card */}
        {submitted ? (
          <div className="bg-white rounded-3xl border border-emerald-200 shadow-md p-8 sm:p-10 text-center animate-fade-in space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Thank You for Your Feedback!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Your evaluation has been successfully recorded in your browser&apos;s LocalStorage. This data helps demonstrate user engagement and frontend form workflows during academic review.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors shadow-sm"
              >
                Submit Another Review
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Return to CampusFind Home
              </Link>
            </div>
          </div>
        ) : (
          /* Feedback Form */
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8"
          >
            {/* Rating 1: Overall Experience */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. Overall Application Experience
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-teal-400"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        star <= rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-slate-200'
                      }`} 
                    />
                  </button>
                ))}
                <span className="ml-3 text-xs font-semibold text-slate-600">
                  {ratingLabels[rating]}
                </span>
              </div>
            </div>

            {/* Rating 2: Ease of Reporting */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                2. Ease of Reporting &amp; Token Generation
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEaseRating(star)}
                    className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-teal-400"
                    aria-label={`Rate ease ${star} star`}
                  >
                    <Star 
                      className={`w-7 h-7 ${
                        star <= easeRating 
                          ? 'text-teal-500 fill-teal-500' 
                          : 'text-slate-200'
                      }`} 
                    />
                  </button>
                ))}
                <span className="ml-3 text-xs font-semibold text-slate-600">
                  {easeLabels[easeRating]}
                </span>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                3. Feedback Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  'Usability & UI',
                  'Feature Request',
                  'Bug / Alignment',
                  'General Feedback'
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-2xl border text-xs font-semibold text-center transition-all ${
                      category === cat
                        ? 'border-teal-600 bg-teal-50 text-teal-800 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Comments */}
            <div>
              <label htmlFor="feedback-comments" className="block text-sm font-bold text-slate-900 mb-1">
                4. Your Observations &amp; Suggestions <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Share your thoughts on design polish, privacy protection, QR code badges, or campus zone clarity.
              </p>
              <textarea
                id="feedback-comments"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Write your feedback here..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
              />
              {error && (
                <p className="mt-1.5 text-xs text-rose-600 font-medium">
                  {error}
                </p>
              )}
            </div>

            {/* Student Info (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Priyansh Shah"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
                />
              </div>

              <div>
                <label htmlFor="student-dept" className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Semester (Optional)
                </label>
                <input
                  type="text"
                  id="student-dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. B.Tech CSE, Sem 6"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Stored in client-side LocalStorage
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>

          </form>
        )}

        {/* Stored Feedback Records (Demonstration Preview) */}
        {recentEntries.length > 0 && (
          <div className="mt-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Locally Stored Feedback Entries ({recentEntries.length})</span>
            </h3>
            <div className="space-y-3">
              {recentEntries.slice(0, 3).map((fb) => (
                <div key={fb.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-800">{fb.studentName} ({fb.category})</span>
                    <span>{fb.formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    &ldquo;{fb.comments}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assistance Information */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Demonstration Desk: <strong>MB315</strong>, Marwadi University</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Mon–Sat 8:30 AM – 6:00 PM</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ArrowLeft, 
  Sparkles,
  Building2,
  FileText,
  RotateCcw
} from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({ 1: true }); // First question open by default

  const faqData = [
    {
      id: 1,
      question: 'What is CampusFind?',
      answer: 'CampusFind is a student-developed prototype that demonstrates how students can report and track lost and found belongings.',
    },
    {
      id: 2,
      question: 'Is CampusFind an official Marwadi University website?',
      answer: 'No. It is an independent student-developed academic prototype and is not an officially approved university service.',
    },
    {
      id: 3,
      question: 'How can I report a lost item?',
      answer: 'Open Report Lost, enter the required item and location details, and submit the form.',
      link: { to: '/report-lost', label: 'Go to Report Lost' }
    },
    {
      id: 4,
      question: 'How can I report a found item?',
      answer: "Open Report Found, provide the item's details and location, and submit the report.",
      link: { to: '/report-found', label: 'Go to Report Found' }
    },
    {
      id: 5,
      question: 'What is the registration token?',
      answer: 'It is a 12-digit reference generated when a report is submitted. It can be used to locate the report in the browser where it was saved.',
    },
    {
      id: 6,
      question: 'How can I track my report?',
      answer: 'Open Track Report and enter the registration token associated with your report.',
      link: { to: '/track', label: 'Go to Track Report' }
    },
    {
      id: 7,
      question: 'Where is my report stored?',
      answer: 'Your report is stored in the CampusFind portal registry associated with your unique 12-digit registration token.',
    },
    {
      id: 8,
      question: 'Can I access my report from another device?',
      answer: 'Yes. You can access and track your report from any browser or device by entering your 12-digit registration token on the Track Report page.',
    },
    {
      id: 9,
      question: 'Does the QR code show my personal contact information?',
      answer: 'No. QR recovery links should not expose private contact details.',
    },
    {
      id: 10,
      question: "What happens when someone scans my item's QR code?",
      answer: 'The QR code opens the CampusFind recovery page. If the report is unavailable on the scanning device, the page provides further assistance instructions.',
    },
    {
      id: 11,
      question: 'Does submitting a report guarantee item recovery?',
      answer: 'No. CampusFind is a demonstration prototype and cannot guarantee item recovery or verification.',
    },
    {
      id: 12,
      question: 'Do I need to create an account?',
      answer: 'No. The current prototype does not require account registration or login.',
    },
    {
      id: 13,
      question: 'Where can I get further information?',
      answer: "For further details about the prototype's campus workflow, you may visit MB315, Marwadi University.",
    },
  ];

  // Search filter
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return faqData;
    return faqData.filter(item => 
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allOpen = {};
    faqData.forEach(item => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

        {/* Page Header Banner */}
        <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#0E7490] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/30 text-xs font-bold tracking-wide uppercase mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
              Frequently Asked Questions
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
              Find clear answers regarding the prototype, registration tokens, reporting, privacy, and campus recovery procedures.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <HelpCircle className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Search & Controls Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. token, account, QR code, MB315, storage)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/70 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 placeholder-slate-400"
              aria-label="Search questions"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Showing {filteredFaqs.length} of {faqData.length} questions</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-teal-700 hover:text-teal-800 font-semibold cursor-pointer"
              >
                Expand all
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm animate-in fade-in duration-200">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find an answer matching &quot;{searchQuery}&quot;. Try using a different keyword like &quot;token&quot;, &quot;device&quot;, or &quot;MB315&quot;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Search</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = Boolean(openItems[faq.id]);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500/30"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 sm:mt-0 font-mono">
                        Q{faq.id}
                      </span>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h2>
                    </div>

                    <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-100 text-teal-800' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Panel */}
                  {isOpen && (
                    <div 
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-150"
                    >
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                        {faq.answer}
                      </p>

                      {faq.link && (
                        <div className="pl-10 mt-3">
                          <Link
                            to={faq.link.to}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                          >
                            <span>{faq.link.label}</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Location & Disclaimer Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-900 text-white shadow-lg border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <Building2 className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-teal-400">
                Project Assistance Location
              </p>
              <h3 className="text-base font-bold text-white mt-0.5">
                Have questions about the campus workflow?
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                For further details regarding the prototype workflow, you may visit <strong>MB315, Marwadi University</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
            <Link
              to="/terms"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-300" />
              <span>Terms &amp; Conditions</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

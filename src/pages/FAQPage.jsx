import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ArrowLeft, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({ 1: true }); // Q1 open by default

  const faqData = [
    {
      id: 1,
      category: 'general',
      categoryLabel: 'About CampusFind',
      question: 'What is CampusFind?',
      answer: 'CampusFind is a student-developed prototype designed to demonstrate how students can report and track lost and found belongings on campus.',
    },
    {
      id: 2,
      category: 'general',
      categoryLabel: 'About CampusFind',
      question: 'Is CampusFind an official Marwadi University website?',
      answer: 'No. CampusFind is an independent student project and is not an official university website or an officially approved university service.',
    },
    {
      id: 3,
      category: 'reporting',
      categoryLabel: 'Reporting Items',
      question: 'How can I report a lost item?',
      answer: 'Open the Report Lost section, enter the required information and submit the form.',
      actionLink: { to: '/report-lost', label: 'Go to Report Lost Form' }
    },
    {
      id: 4,
      category: 'reporting',
      categoryLabel: 'Reporting Items',
      question: 'How can I report a found item?',
      answer: 'Open Report Found, provide the item details, location and contact information, then submit the report.',
      actionLink: { to: '/report-found', label: 'Go to Report Found Form' }
    },
    {
      id: 5,
      category: 'tokens',
      categoryLabel: 'Tokens & Tracking',
      question: 'What is the registration token?',
      answer: 'It is a 12-digit reference generated when a report is submitted. You can use it to find your report in the same browser.',
    },
    {
      id: 6,
      category: 'tokens',
      categoryLabel: 'Tokens & Tracking',
      question: 'How can I track my report?',
      answer: 'Open Track Report and enter the registration token generated during submission.',
      actionLink: { to: '/track', label: 'Open Track Report Portal' }
    },
    {
      id: 7,
      category: 'privacy',
      categoryLabel: 'Data & Storage',
      question: 'Where is my report data stored?',
      answer: 'The prototype uses browser LocalStorage. Reports are not automatically synchronized between different devices or browsers.',
    },
    {
      id: 8,
      category: 'privacy',
      categoryLabel: 'Data & Storage',
      question: 'Can I access my report from another device?',
      answer: 'No. The current prototype does not have centralized cloud storage. Your saved reports are available only in the browser where they were submitted.',
    },
    {
      id: 9,
      category: 'reporting',
      categoryLabel: 'Reporting Items',
      question: 'Can I upload an item photograph?',
      answer: 'Yes. The reporting forms provide an optional photograph upload feature.',
    },
    {
      id: 10,
      category: 'tokens',
      categoryLabel: 'Tokens & Tracking',
      question: 'What should I do after submitting a report?',
      answer: "Keep your registration token safe. For further details about the prototype's campus workflow, you may visit MB315, Marwadi University.",
    },
    {
      id: 11,
      category: 'general',
      categoryLabel: 'About CampusFind',
      question: 'Does submitting a report guarantee that my item will be recovered?',
      answer: 'No. CampusFind is a prototype and cannot guarantee item recovery or verification.',
    },
    {
      id: 12,
      category: 'general',
      categoryLabel: 'About CampusFind',
      question: 'Do I need to create an account?',
      answer: 'No. The current prototype does not require login or account creation.',
    },
    {
      id: 13,
      category: 'tokens',
      categoryLabel: 'Tokens & Tracking',
      question: 'How do email notifications work when my lost item is found?',
      answer: 'When another student or staff member discovers your lost item and marks it as found in CampusFind, an automated email notification is dispatched to the contact email you provided during submission, including the finder’s details and handover location.',
    },
    {
      id: 14,
      category: 'tokens',
      categoryLabel: 'Tokens & Tracking',
      question: 'What is the printable QR code feature?',
      answer: 'After registering any belonging, CampusFind generates a printable identification tag with a unique QR code. You can print and attach this tag to your laptop, bag, calculator, or binder so anyone on campus can scan it with their phone to instantly view your recovery record and reach you.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'About CampusFind' },
    { id: 'reporting', label: 'Reporting Items' },
    { id: 'tokens', label: 'Tokens & Tracking' },
    { id: 'privacy', label: 'Data & Storage' },
  ];

  // Filter FAQs based on query and selected category
  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery = 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

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
              Questions &amp; Answers
            </h1>
            <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
              Find quick answers regarding how the CampusFind prototype functions, registration tokens, reporting, and browser storage.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <HelpCircle className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions (e.g. token, photo, MB315, account)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50/70 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Category Tabs & Expand/Collapse shortcuts */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleExpandAll}
                className="text-teal-700 hover:text-teal-800 font-semibold transition-colors"
              >
                Expand all
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching questions found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select another category filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
            >
              Reset Search
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
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 sm:mt-0">
                        {faq.id}
                      </span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700 mb-0.5">
                          {faq.categoryLabel}
                        </div>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </h2>
                      </div>
                    </div>

                    <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-100 text-teal-800' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content Panel */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-10">
                        {faq.answer}
                      </p>

                      {faq.actionLink && (
                        <div className="pl-10 mt-3">
                          <Link
                            to={faq.actionLink.to}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                          >
                            <span>{faq.actionLink.label}</span>
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

        {/* Prototype Location & Assistance Callout */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-900 text-white shadow-lg border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <Building2 className="w-6 h-6 text-teal-400 shrink-0 mt-1" />
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-teal-400">
                Campus Prototype Inquiries
              </p>
              <h3 className="text-base font-bold text-white mt-0.5">
                Have more questions or need project details?
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
              <span>Terms &amp; Disclaimer</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  AlertTriangle, 
  ShieldAlert, 
  Database, 
  Key, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  Lock,
  UserCheck
} from 'lucide-react';

export default function TermsPage() {
  const sections = [
    {
      num: '1',
      title: 'Introduction',
      icon: FileText,
      content: (
        <p>
          CampusFind is a student-developed web application prototype created exclusively for academic demonstration and portfolio purposes. The objective of the platform is to demonstrate how a modern, zero-barrier digital Lost &amp; Found reporting and tracking workflow can function in a collegiate campus environment.
        </p>
      ),
    },
    {
      num: '2',
      title: 'Prototype Status & Non-Affiliation',
      icon: AlertTriangle,
      content: (
        <p>
          This website is an independent student project. It is <strong>not</strong> an official website of Marwadi University and is <strong>not</strong> an officially approved, endorsed, or operational university service. All university names, building references, and branding elements are referenced solely to establish a realistic campus prototype context.
        </p>
      ),
    },
    {
      num: '3',
      title: 'User Responsibility',
      icon: UserCheck,
      content: (
        <p>
          Students and visitors interacting with this prototype agree to provide accurate, genuine, and truthful information when submitting reports. Users must exercise appropriate caution and discretion when sharing descriptions, approximate locations, or contact numbers.
        </p>
      ),
    },
    {
      num: '4',
      title: 'Personal Information & Privacy',
      icon: Lock,
      content: (
        <p>
          Contact details (such as student phone numbers or university email addresses) entered in the forms are used solely to demonstrate direct peer communication regarding misplaced belongings. This prototype stores all submitted report information directly in client-side <strong>browser LocalStorage</strong>. No passwords or user credentials are collected.
        </p>
      ),
    },
    {
      num: '5',
      title: 'Data Storage Limitations',
      icon: Database,
      content: (
        <p>
          All report records submitted through this application reside locally within the browser storage of the specific device used. Reports are <strong>not</strong> uploaded to an institutional cloud server, are <strong>not</strong> automatically synchronized across different mobile phones or computers, and are <strong>not</strong> accessible to university administrative staff unless manually inspected on the same browser.
        </p>
      ),
    },
    {
      num: '6',
      title: 'Registration Tokens',
      icon: Key,
      content: (
        <p>
          The 12-digit registration token (formatted as <code>DDMMYYYYHHmm</code>) generated upon form submission serves strictly as an algorithmic index reference within the user&apos;s local browser. Registration tokens are <strong>not</strong> official university-issued claim documents, legal instruments, or proof of property custody.
        </p>
      ),
    },
    {
      num: '7',
      title: 'Item Ownership & Verification',
      icon: CheckCircle2,
      content: (
        <p>
          Users claiming an item are responsible for proving lawful ownership (such as unlocking digital devices, quoting serial numbers, or matching unique physical characteristics). Any physical handover should occur under appropriate supervision with a valid student identity card.
        </p>
      ),
    },
    {
      num: '8',
      title: 'Prohibited Use',
      icon: ShieldAlert,
      content: (
        <p>
          Submitting fabricated, prank, defamatory, offensive, or intentionally misleading reports is strictly prohibited. Misusing the platform to broadcast false emergency alerts or unauthorized commercial solicitations is not allowed under any circumstances.
        </p>
      ),
    },
    {
      num: '9',
      title: 'Limitation of Responsibility',
      icon: AlertTriangle,
      content: (
        <p>
          CampusFind is a demonstration prototype provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. The developers, student team, and project contributors make no guarantees regarding item recovery, verification accuracy, safe custody, or permanent data persistence.
        </p>
      ),
    },
    {
      num: '10',
      title: 'Contact and Campus Assistance',
      icon: Building2,
      content: (
        <p>
          For academic queries, feedback, or further details regarding the student prototype workflow on campus, users may visit <strong>MB315, Marwadi University</strong>. Please note that MB315 is provided solely as the student project contact location for inquiries and is not represented as an officially designated university Lost &amp; Found administrative office.
        </p>
      ),
    },
  ];

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
        <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold tracking-wide uppercase mb-3">
              <FileText className="w-3.5 h-3.5 text-teal-400" />
              Student Academic Project
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Important information regarding the prototype status, client-side data boundaries, and user guidelines for the CampusFind demonstration portal.
            </p>
          </div>
        </div>

        {/* Prominent Disclaimer Notice Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-amber-950 mb-1">
              Important Academic Prototype Notice
            </p>
            <p className="text-amber-900">
              CampusFind is an independent, student-developed software engineering prototype created for demonstration purposes. Using this prototype does not create an official service relationship or contractual agreement with Marwadi University.
            </p>
          </div>
        </div>

        {/* Terms Sections Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 divide-y divide-slate-100 space-y-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.num}
                className={`${idx > 0 ? 'pt-8' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/70 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">
                    {section.num}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {section.title}
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-11">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helpful Navigation */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-100/80 rounded-2xl border border-slate-200 text-xs text-slate-600">
          <div>
            Have questions about how the prototype works?
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/faq"
              className="font-bold text-teal-700 hover:text-teal-800 underline flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </Link>
            <span className="text-slate-400">|</span>
            <Link
              to="/"
              className="font-semibold text-slate-700 hover:text-slate-900"
            >
              Return Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

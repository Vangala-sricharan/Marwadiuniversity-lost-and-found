import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  AlertTriangle, 
  Database, 
  Lock, 
  EyeOff, 
  QrCode, 
  Key, 
  UserX, 
  Cookie, 
  ExternalLink, 
  Trash2, 
  ShieldAlert, 
  Building2, 
  Clock, 
  RefreshCw,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { openCookieModal } from '../services/consentService';

export default function PrivacyPage() {
  const sections = [
    {
      num: '1',
      title: 'Introduction & Academic Demonstration Notice',
      icon: ShieldCheck,
      content: (
        <div className="space-y-3">
          <p>
            CampusFind is an independent, student-developed web application created as an academic software engineering prototype for Marwadi University students and evaluators.
          </p>
          <p>
            This Privacy Policy explains how data is handled when you interact with the CampusFind portal. We are committed to absolute transparency regarding privacy limitations, data storage boundaries, and client-side isolation in this demonstration system.
          </p>
        </div>
      )
    },
    {
      num: '2',
      title: 'Prototype Scope & Zero Centralized Database Architecture',
      icon: Database,
      content: (
        <div className="space-y-3">
          <p>
            CampusFind operates with <strong>no central server database</strong> (no SQL server, Firebase, MongoDB, or remote cloud storage). 
          </p>
          <p>
            All submitted reports, registration tokens, and preferences exist exclusively within your local web browser session. Data entered on one computer, phone, or browser will <strong>not</strong> synchronize, transmit, or replicate to any other device or to Marwadi University central servers.
          </p>
        </div>
      )
    },
    {
      num: '3',
      title: 'LocalStorage & Client-Side Data Storage',
      icon: Lock,
      content: (
        <div className="space-y-3">
          <p>
            When you report a lost or found item, the application writes a structured JSON document to your browser&apos;s <code>window.localStorage</code> under the key <code>campusfind_reports_v2</code>.
          </p>
          <p>
            LocalStorage is unencrypted client-side web storage managed by your browser. Anyone with physical access to your device or browser developer tools can inspect the contents stored within LocalStorage.
          </p>
        </div>
      )
    },
    {
      num: '4',
      title: 'Information Collected During Report Submission',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3">
          <p>
            To simulate a realistic campus lost and found workflow, the submission forms request:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-2">
            <li><strong>Student Name:</strong> To record the reporting owner or finder.</li>
            <li><strong>Contact Number &amp; Email:</strong> To facilitate contact exchange between owner and finder.</li>
            <li><strong>Item Name, Category, Description:</strong> Identifying characteristics of the belonging.</li>
            <li><strong>Location &amp; Date / Approximate Time:</strong> Campus zone where item was lost or discovered.</li>
            <li><strong>Optional Photograph:</strong> Stored locally as a base64 Data URL or sample campus asset.</li>
          </ul>
          <p className="text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs">
            <strong>Guideline:</strong> Please do not submit confidential financial credentials, passwords, government IDs, or sensitive private information.
          </p>
        </div>
      )
    },
    {
      num: '5',
      title: 'Public Display & Masking of Personal Information',
      icon: EyeOff,
      content: (
        <div className="space-y-3">
          <p>
            To protect student privacy, CampusFind enforces <strong>automatic contact masking</strong> in all public views (including Browse Archive and Item Detail modal):
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-2">
            <li>Phone numbers are masked to display only the initial and trailing digits (e.g., <code>+91 98*** **210</code>).</li>
            <li>Email addresses are masked to obscure personal user identifiers (e.g., <code>a***l@marwadiuniversity.ac.in</code>).</li>
            <li>Full unmasked details are only visible to the user holding the exact 12-digit registration token on the Track Report page.</li>
          </ul>
        </div>
      )
    },
    {
      num: '6',
      title: 'QR Code Functionality & Public Recovery Page',
      icon: QrCode,
      content: (
        <div className="space-y-3">
          <p>
            CampusFind provides printable QR codes that students can attach to personal belongings (notebooks, bags, calculator cases, ID pouches).
          </p>
          <p>
            The QR code encodes a direct public web link to the deployed recovery endpoint: 
            <br />
            <code>https://marwadiuniversity-lost-and-found.vercel.app/recover/:referenceId</code>
          </p>
          <p>
            The QR code does <strong>not</strong> contain raw phone numbers, home addresses, or unencrypted private credentials. Any individual who scans the QR code will be taken to a streamlined recovery screen providing safe drop-off guidance at campus collection hubs (such as <strong>MB315</strong> or the Main Academic Gate security desk).
          </p>
        </div>
      )
    },
    {
      num: '7',
      title: 'Token-Based Status Tracking',
      icon: Key,
      content: (
        <div className="space-y-3">
          <p>
            Every report receives a 12-digit numeric registration token (formatted as <code>DDMMYYYYHHmm</code> based on submission timestamp).
          </p>
          <p>
            The token functions as a query key within your browser&apos;s LocalStorage. Entering this token on the Track Report page queries stored items on that specific browser. The token does not grant access to external university databases or registrar records.
          </p>
        </div>
      )
    },
    {
      num: '8',
      title: 'Absence of User Accounts & Passwords',
      icon: UserX,
      content: (
        <div className="space-y-3">
          <p>
            CampusFind intentionally omits user accounts, student login portals, and password management to maximize accessibility and eliminate password breach vulnerabilities for this demonstration prototype.
          </p>
          <p>
            You are not asked to create a password or log in with university credentials. Your reports are linked solely to your generated registration token.
          </p>
        </div>
      )
    },
    {
      num: '9',
      title: 'Cookies & Browser Storage Preferences',
      icon: Cookie,
      content: (
        <div className="space-y-3">
          <p>
            CampusFind uses essential LocalStorage to maintain report records, your legal consent acknowledgment, and your cookie preferences.
          </p>
          <p>
            We do not use advertising cookies, behavior-tracking beacons, or third-party marketing pixels. You can review or adjust your browser storage settings at any time using our preferences panel.
          </p>
          <button
            type="button"
            onClick={openCookieModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 font-semibold text-xs transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            Open Cookie Preferences Modal
          </button>
        </div>
      )
    },
    {
      num: '10',
      title: 'Third-Party Services & Links',
      icon: ExternalLink,
      content: (
        <div className="space-y-3">
          <p>
            The application may display links to official Marwadi University web resources, campus maps, or external tools for informational reference.
          </p>
          <p>
            CampusFind is not responsible for the privacy practices, content, or policies of external websites. We encourage you to review their respective privacy statements when navigating outside this portal.
          </p>
        </div>
      )
    },
    {
      num: '11',
      title: 'Data Retention & Cache Clearing',
      icon: Trash2,
      content: (
        <div className="space-y-3">
          <p>
            Because data is retained locally in your browser&apos;s LocalStorage, records remain stored until:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-2">
            <li>You manually clear your browser cookies, site data, or cache.</li>
            <li>You browse in Private / Incognito mode (data is discarded when the incognito window closes).</li>
            <li>Browser storage quotas are reached or cleared by operating system storage maintenance.</li>
          </ul>
          <p className="text-slate-600 text-xs">
            We recommend recording your 12-digit registration token or downloading the printable QR badge immediately upon report confirmation.
          </p>
        </div>
      )
    },
    {
      num: '12',
      title: 'Student Safety & Prohibited Uses',
      icon: ShieldAlert,
      content: (
        <div className="space-y-3">
          <p>
            To safeguard the campus community, users are strictly prohibited from using CampusFind to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-2">
            <li>Submit prank, fraudulent, or harassing lost/found submissions.</li>
            <li>Report prohibited, hazardous, or illegal contraband.</li>
            <li>Attempt to harvest personal contact information of other students.</li>
            <li>Impersonate university staff, security personnel, or administration.</li>
          </ul>
        </div>
      )
    },
    {
      num: '13',
      title: 'Inquiries & Further Assistance',
      icon: Building2,
      content: (
        <div className="space-y-3">
          <p>
            For questions regarding this student prototype, demonstration workflows, or academic evaluation, you may contact the student developers at the project demonstration desk:
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Location: MB315, Marwadi University</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>Demonstration Hours: Monday – Saturday | 8:30 AM – 6:00 PM</span>
            </div>
            <p className="text-slate-500 text-[11px] pt-1">
              Note: MB315 is designated for student project queries and portfolio presentations, not for official administrative claims.
            </p>
          </div>
        </div>
      )
    },
    {
      num: '14',
      title: 'Amendments & Policy Updates',
      icon: RefreshCw,
      content: (
        <div className="space-y-3">
          <p>
            This Privacy Policy (Version 1.0) was last reviewed in October 2026. 
          </p>
          <p>
            As the CampusFind prototype evolves through academic evaluation and coursework review, this policy may be revised to reflect new architectural features or data handling standards.
          </p>
        </div>
      )
    }
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
        <div className="bg-gradient-to-r from-[#0F2347] via-[#0A1A2F] to-[#0D3B66] text-white rounded-3xl p-6 sm:p-10 shadow-lg mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold tracking-wide uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Privacy &amp; Data Transparency • Version 1.0
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Complete disclosure regarding client-side LocalStorage, personal contact masking, QR code recovery routes, and zero server storage architecture.
            </p>
          </div>
        </div>

        {/* Prominent Disclaimer Notice Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-sm flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <p className="font-bold text-amber-950 mb-1">
              Independent Student Prototype Notice
            </p>
            <p className="text-amber-900">
              CampusFind is an independent student-developed prototype created for academic demonstration purposes. It is not an official Marwadi University website or university-authorized service. All information entered remains stored strictly within your local browser session.
            </p>
          </div>
        </div>

        {/* Sections Card */}
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
            Questions about our Terms &amp; Conditions or Help resources?
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/terms"
              className="font-bold text-teal-700 hover:text-teal-800 underline"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-400">|</span>
            <Link
              to="/help"
              className="font-semibold text-slate-700 hover:text-slate-900"
            >
              Help Center
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

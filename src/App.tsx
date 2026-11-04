import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import ReportLostPage from './pages/ReportLostPage';
import ReportFoundPage from './pages/ReportFoundPage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import CampusLandmarksPage from './pages/CampusLandmarksPage';
import HowItWorksPage from './pages/HowItWorksPage';
import CampusGuidePage from './pages/CampusGuidePage';
import TrackReportPage from './pages/TrackReportPage';
import SubmissionSuccessPage from './pages/SubmissionSuccessPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import QRRecoveryPage from './pages/QRRecoveryPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import FeedbackPage from './pages/FeedbackPage';
import ReportConsentGate from './components/ReportConsentGate';
import CookieBanner from './components/CookieBanner';
import CookieModal from './components/CookieModal';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenCookieModal = () => {
      setCookieModalOpen(true);
    };

    window.addEventListener('campusfind_open_cookie_modal', handleOpenCookieModal);
    return () => {
      window.removeEventListener('campusfind_open_cookie_modal', handleOpenCookieModal);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 w-full max-w-full overflow-x-hidden">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow w-full flex flex-col">
          <Routes>
            {/* Clean Landing Page */}
            <Route path="/" element={<HomePage />} />

            {/* Reporting Flows with Mandatory Pre-Submission Consent Gate */}
            <Route 
              path="/report-lost" 
              element={
                <ReportConsentGate reportType="lost">
                  <ReportLostPage />
                </ReportConsentGate>
              } 
            />
            <Route 
              path="/report-found" 
              element={
                <ReportConsentGate reportType="found">
                  <ReportFoundPage />
                </ReportConsentGate>
              } 
            />

            {/* Dedicated Pages for Every Navigation Category */}
            <Route path="/browse" element={<BrowseItemsPage />} />
            <Route path="/campus-landmarks" element={<CampusLandmarksPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/campus-guide" element={<CampusGuidePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Other System Routes */}
            <Route path="/track" element={<TrackReportPage />} />
            <Route path="/submission-success" element={<SubmissionSuccessPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/recover/:referenceId" element={<QRRecoveryPage />} />
            <Route path="/qr-recovery/:referenceId" element={<QRRecoveryPage />} />

            {/* Fallback route back to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />

        {/* Cookie Banner & Preferences Modal */}
        <CookieBanner onOpenCustomize={() => setCookieModalOpen(true)} />
        <CookieModal 
          isOpen={cookieModalOpen} 
          onClose={() => setCookieModalOpen(false)} 
        />
      </div>
    </BrowserRouter>
  );
}

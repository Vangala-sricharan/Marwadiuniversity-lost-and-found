import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import HomePage from './pages/HomePage';
import ReportLostPage from './pages/ReportLostPage';
import ReportFoundPage from './pages/ReportFoundPage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import CampusGuidePage from './pages/CampusGuidePage';
import TrackReportPage from './pages/TrackReportPage';
import SubmissionSuccessPage from './pages/SubmissionSuccessPage';
import TermsPage from './pages/TermsPage';
import FAQPage from './pages/FAQPage';
import QRRecoveryPage from './pages/QRRecoveryPage';
import HelpPage from './pages/HelpPage';
import PrivacyPage from './pages/PrivacyPage';
import FeedbackPage from './pages/FeedbackPage';
import LegalConsentGate from './components/LegalConsentGate';
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
      <LegalConsentGate>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 w-full max-w-full overflow-x-hidden">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/report-lost" element={<ReportLostPage />} />
              <Route path="/report-found" element={<ReportFoundPage />} />
              <Route path="/track" element={<TrackReportPage />} />
              <Route path="/submission-success" element={<SubmissionSuccessPage />} />
              <Route path="/browse" element={<BrowseItemsPage />} />
              <Route path="/campus-guide" element={<CampusGuidePage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/recover/:referenceId" element={<QRRecoveryPage />} />
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
      </LegalConsentGate>
    </BrowserRouter>
  );
}


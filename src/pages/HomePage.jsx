import React from 'react';
import HeroSection from '../components/HeroSection';

/**
 * HomePage
 *
 * Clean, focused landing page for CampusFind – Marwadi University Lost & Found Portal.
 * Contains only the HeroSection with primary action buttons and feature highlight cards,
 * connecting directly to the global footer.
 *
 * Sections such as Campus Landmarks, Photo Gallery, How It Works, and Collection Desks
 * are now hosted on dedicated pages accessible via the top navigation bar.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col flex-grow w-full">
      <HeroSection />
    </div>
  );
}

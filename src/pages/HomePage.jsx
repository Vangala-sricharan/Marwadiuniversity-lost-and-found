import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import RecentItems from '../components/RecentItems';
import CampusShowcase from '../components/CampusShowcase';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import CampusGallery from '../components/CampusGallery';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Large Campus Photograph */}
      <HeroSection />

      {/* 2. Common Lost Categories */}
      <CategoriesSection />

      {/* 3. Recent Live Campus Bulletin */}
      <RecentItems />

      {/* 4. Campus Landmarks & Collection Hubs Showcase */}
      <CampusShowcase />

      {/* 5. How It Works Section */}
      <HowItWorks />

      {/* 6. Feature Highlights */}
      <Features />

      {/* 7. Actual Campus Photo Gallery */}
      <CampusGallery />
    </div>
  );
}

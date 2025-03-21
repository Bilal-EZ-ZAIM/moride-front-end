import React from 'react';
import { WelcomeHero } from '../components/home/WelcomeHero';
import { InnovativeFeatures } from '../components/home/InnovativeFeatures';
import { VehicleOptions } from '../components/vehicles/VehicleOptions';
import { Safety } from '../components/safety/Safety';
import { PricingSection } from '../components/pricing/PricingSection';
import { SpecialServices } from '../components/services/SpecialServices';
import { Testimonials } from '../components/testimonials/Testimonials';
import DownloadApp from '../components/DownloadApp';

export function Home() {
  return (
    <main>
      <WelcomeHero />
      <InnovativeFeatures />
      <VehicleOptions />
      <Safety />
      <PricingSection />
      <SpecialServices />
      <Testimonials />
      <DownloadApp />
    </main>
  );
}
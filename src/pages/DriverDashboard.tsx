import React from 'react';
import { CoverSection } from '../components/dashboard/CoverSection';
import { PersonalInfo } from '../components/dashboard/PersonalInfo';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { VehicleDetails } from '../components/dashboard/VehicleDetails';
import { EarningsChart } from '../components/dashboard/EarningsChart';

export function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CoverSection />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfo />
            <VehicleDetails />
            <EarningsChart />
          </div>
          <div>
            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  );
}
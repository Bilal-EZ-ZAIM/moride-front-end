import React from "react";
import { CoverSection } from "../components/dashboard/CoverSection";
import { PersonalInfo } from "../components/dashboard/PersonalInfo";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { VehicleDetails } from "../components/dashboard/VehicleDetails";
import { EarningsChart } from "../components/dashboard/EarningsChart";
import { TripHistory } from "../components/profile/TripHistory";
import { ProfileStats } from "../components/profile/ProfileStats";
import { WorkSchedule } from "../components/profile/WorkSchedule";
import { PricingSettings } from "../components/profile/PricingSettings";

export function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CoverSection />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProfileStats />
            <PersonalInfo />
            <VehicleDetails />
            <TripHistory />

            <EarningsChart />
          </div>
          <div className="gap-4 flex flex-col">
            <PricingSettings />
            <WorkSchedule />
            <DashboardStats />
          </div>
        </div>
      </div>
    </div>
  );
}

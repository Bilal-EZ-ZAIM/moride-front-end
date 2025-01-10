import React, { useState } from 'react';
import { ProfileCover } from '../components/profile/ProfileCover';
import { ProfileStats } from '../components/profile/ProfileStats';
import { VehicleInfo } from '../components/profile/VehicleInfo';
import { TripHistory } from '../components/profile/TripHistory';
import { WorkSchedule } from '../components/profile/WorkSchedule';
import { PricingSettings } from '../components/profile/PricingSettings';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { EarningsChart } from '../components/dashboard/EarningsChart';

export function DriverProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileCover onEdit={() => setIsEditModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProfileStats />
            <VehicleInfo />
            <EarningsChart />
            <TripHistory />
          </div>
          
          <div className="space-y-8">
            <PricingSettings />
            <WorkSchedule />
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
}
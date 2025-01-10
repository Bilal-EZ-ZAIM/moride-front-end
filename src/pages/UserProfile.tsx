import React, { useState } from 'react';
import { UserCover } from '../components/user/UserCover';
import { UserInfo } from '../components/user/UserInfo';
import { UserSocialLinks } from '../components/user/UserSocialLinks';
import { UserStats } from '../components/user/UserStats';
import { UserLocation } from '../components/user/UserLocation';
import { UserTrips } from '../components/user/UserTrips';
import { BecomeDriverModal } from '../components/user/BecomeDriverModal';

export function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserCover onEdit={() => setIsEditModalOpen(true)} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <UserStats />
            <UserTrips />
            <UserLocation />
          </div>
          <div className="space-y-8">
            <UserInfo onBecomeDriver={() => setIsDriverModalOpen(true)} />
            <UserSocialLinks />
          </div>
        </div>
      </div>

      <BecomeDriverModal 
        isOpen={isDriverModalOpen} 
        onClose={() => setIsDriverModalOpen(false)} 
      />
    </div>
  );
}
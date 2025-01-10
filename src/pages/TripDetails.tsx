import React from 'react';
import { TripInfo } from '../components/trips/TripInfo';
import { DriverApplications } from '../components/trips/DriverApplications';
import { ClientInfo } from '../components/trips/ClientInfo';

export function TripDetails() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TripInfo />
            <DriverApplications />
          </div>
          <div>
            <ClientInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
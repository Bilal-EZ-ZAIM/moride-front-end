import React from 'react';
import { SearchFilters } from '../components/drivers/SearchFilters';
import { DriversList } from '../components/drivers/DriversList';
import { DriversHeader } from '../components/drivers/DriversHeader';

export function DriversListing() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <DriversHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SearchFilters />
          <div className="lg:col-span-3">
            <DriversList />
          </div>
        </div>
      </div>
    </div>
  );
}
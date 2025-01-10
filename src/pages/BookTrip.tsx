import React from 'react';
import { BookingForm } from '../components/booking/BookingForm';
import { DriverResponses } from '../components/booking/DriverResponses';

export function BookTrip() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Réserver un Trajet</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <div>
            <DriverResponses />
          </div>
        </div>
      </div>
    </div>
  );
}
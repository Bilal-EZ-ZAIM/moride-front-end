import React from 'react';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';

interface Trip {
  id: number;
  driver: string;
  date: string;
  from: string;
  to: string;
  rating: number;
  status: 'completed' | 'cancelled';
  amount: number;
}

export function UserTrips() {
  const trips: Trip[] = [
    {
      id: 1,
      driver: "Mohammed A.",
      date: "2024-03-15",
      from: "Domicile",
      to: "Aéroport Mohammed V",
      rating: 5,
      status: 'completed',
      amount: 350
    },
    {
      id: 2,
      driver: "Karim B.",
      date: "2024-03-10",
      from: "Bureau",
      to: "Morocco Mall",
      rating: 4,
      status: 'completed',
      amount: 120
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Historique des Trajets</h2>
      <div className="space-y-6">
        {trips.map((trip) => (
          <div key={trip.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-semibold">{trip.driver}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {trip.date}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">{trip.amount} MAD</div>
                <div className="flex items-center gap-1">
                  {[...Array(trip.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              {trip.from} → {trip.to}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
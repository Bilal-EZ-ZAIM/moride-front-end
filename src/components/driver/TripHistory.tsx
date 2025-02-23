import React from 'react';
import { Star, MapPin, Calendar, Clock } from 'lucide-react';

interface Trip {
  id: number;
  client: string;
  date: string;
  from: string;
  to: string;
  rating: number;
  review: string;
  amount: number;
}

export function TripHistory() {
  const trips: Trip[] = [
    {
      id: 1,
      client: "Sarah L.",
      date: "2024-03-15",
      from: "Casablanca",
      to: "Rabat",
      rating: 5,
      review: "Excellent service, très professionnel et ponctuel.",
      amount: 450
    },
    {
      id: 2,
      client: "Ahmed M.",
      date: "2024-03-14",
      from: "Rabat",
      to: "Fès",
      rating: 4,
      review: "Très bon voyage, chauffeur sympathique.",
      amount: 600
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
                <h3 className="font-semibold">{trip.client}</h3>
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
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              {trip.from} → {trip.to}
            </div>
            <p className="text-gray-600 text-sm">{trip.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
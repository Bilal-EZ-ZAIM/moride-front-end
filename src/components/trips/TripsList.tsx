import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export function TripsList() {
  const trips = [
    {
      id: 1,
      from: "Casablanca, Maârif",
      to: "Rabat, Agdal",
      date: "2024-03-20",
      time: "14:00",
      passengers: 2,
      type: "private",
      budget: "400-500 MAD",
      client: {
        name: "Sarah L.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
        rating: 4.8
      }
    },
    {
      id: 2,
      from: "Marrakech, Guéliz",
      to: "Agadir",
      date: "2024-03-21",
      time: "09:00",
      passengers: 3,
      type: "shared",
      budget: "600-700 MAD",
      client: {
        name: "Ahmed M.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
        rating: 4.9
      }
    }
  ];

  return (
    <div className="space-y-6">
      {trips.map((trip) => (
        <div key={trip.id} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={trip.client.image}
              alt={trip.client.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{trip.client.name}</h3>
              <div className="text-sm text-gray-600">
                Note: {trip.client.rating}/5
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Départ</div>
                  <div className="font-medium">{trip.from}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">{trip.date}</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Arrivée</div>
                  <div className="font-medium">{trip.to}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-sm text-gray-600">Heure</div>
                  <div className="font-medium">{trip.time}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span>{trip.passengers} passagers</span>
              </div>
              <div className="text-emerald-600 font-semibold">
                {trip.budget}
              </div>
            </div>
            <Link to={`/trips/${trip.id}`}>
              <Button className="flex items-center gap-2">
                Voir détails
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
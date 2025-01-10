import React from 'react';
import { Star, Clock, Car } from 'lucide-react';
import { Button } from '../common/Button';

export function DriverApplications() {
  const applications = [
    {
      id: 1,
      driver: {
        name: "Mohammed Alami",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviews: 245
      },
      price: 450,
      vehicle: "Mercedes-Benz Classe E",
      proposedTime: "14:00",
      status: "pending"
    },
    {
      id: 2,
      driver: {
        name: "Karim Benjelloun",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviews: 189
      },
      price: 420,
      vehicle: "BMW Série 5",
      proposedTime: "14:15",
      status: "pending"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Propositions des Chauffeurs</h2>
      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={app.driver.image}
                alt={app.driver.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{app.driver.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{app.driver.rating}</span>
                  </div>
                  <span>({app.driver.reviews} avis)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">{app.price} MAD</div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {app.proposedTime}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <Car className="w-4 h-4" />
              {app.vehicle}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Contacter
              </Button>
              <Button size="sm" className="flex-1">
                Accepter l'offre
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Clock } from 'lucide-react';

export function AvailabilitySchedule() {
  const schedule = [
    { day: "Lundi", hours: "08:00 - 20:00" },
    { day: "Mardi", hours: "08:00 - 20:00" },
    { day: "Mercredi", hours: "08:00 - 20:00" },
    { day: "Jeudi", hours: "08:00 - 20:00" },
    { day: "Vendredi", hours: "08:00 - 22:00" },
    { day: "Samedi", hours: "10:00 - 22:00" },
    { day: "Dimanche", hours: "10:00 - 18:00" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-bold">Disponibilité</h2>
      </div>
      
      <div className="space-y-4">
        {schedule.map((item) => (
          <div key={item.day} className="flex justify-between items-center">
            <span className="font-medium">{item.day}</span>
            <span className="text-gray-600">{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
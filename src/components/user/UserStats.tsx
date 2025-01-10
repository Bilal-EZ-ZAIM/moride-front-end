import React from 'react';
import { Route, Star, Award, Clock } from 'lucide-react';

export function UserStats() {
  const stats = [
    {
      icon: Route,
      label: "Trajets Totaux",
      value: "45",
    },
    {
      icon: Star,
      label: "Note Moyenne",
      value: "4.8",
    },
    {
      icon: Award,
      label: "Statut",
      value: "Premium",
    },
    {
      icon: Clock,
      label: "Membre depuis",
      value: "2023",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Statistiques</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="inline-flex p-3 rounded-full bg-emerald-50 mb-3">
              <stat.icon className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
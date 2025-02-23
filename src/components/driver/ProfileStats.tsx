import React from 'react';
import { Route, Clock, ThumbsUp, Shield } from 'lucide-react';

interface ProfileStatsProps {
  experience: number;
  languages: string[];
  rating: number;
}

export function ProfileStats({ experience, languages, rating }: ProfileStatsProps) {
  const stats = [
    {
      icon: Route,
      label: "Courses totales",
      value: "1,234",
    },
    {
      icon: Clock,
      label: "Heures de conduite",
      value: "3,500+",
    },
    {
      icon: ThumbsUp,
      label: "Taux d'acceptation",
      value: `${rating}%`,
    },
    {
      icon: Shield,
      label: "Années d'expérience",
      value: experience.toString(),
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
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Langues parlées :</h3>
        <p className="text-gray-700">{languages.join(", ")}</p>
      </div>
    </div>
  );
}

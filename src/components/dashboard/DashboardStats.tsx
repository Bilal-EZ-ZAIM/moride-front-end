import React from 'react';
import { Star, TrendingUp, Users, DollarSign } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      label: "Note moyenne",
      value: "4.9",
      icon: Star,
      trend: "+0.2",
      color: "text-yellow-500"
    },
    {
      label: "Courses du mois",
      value: "142",
      icon: TrendingUp,
      trend: "+12%",
      color: "text-emerald-500"
    },
    {
      label: "Clients réguliers",
      value: "38",
      icon: Users,
      trend: "+5",
      color: "text-blue-500"
    },
    {
      label: "Revenus du mois",
      value: "8,450 MAD",
      icon: DollarSign,
      trend: "+18%",
      color: "text-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <span className="text-sm text-emerald-600 font-medium">{stat.trend}</span>
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
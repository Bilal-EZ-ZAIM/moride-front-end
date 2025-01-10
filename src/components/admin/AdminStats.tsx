import React from 'react';
import { Users, Car, DollarSign, TrendingUp } from 'lucide-react';

export function AdminStats() {
  const stats = [
    {
      label: "Utilisateurs Totaux",
      value: "12,345",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      label: "Chauffeurs Actifs",
      value: "1,234",
      change: "+8%",
      icon: Car,
      color: "bg-emerald-500"
    },
    {
      label: "Revenu Mensuel",
      value: "234,567 MAD",
      change: "+15%",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      label: "Courses Totales",
      value: "45,678",
      change: "+10%",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-emerald-600 text-sm font-medium">
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
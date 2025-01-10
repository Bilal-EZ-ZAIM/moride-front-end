import React from 'react';
import { Calendar } from 'lucide-react';

export function RevenueChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Revenus</h2>
        <select className="border rounded-lg px-3 py-2">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="h-64 flex items-center justify-center text-gray-500">
        Graphique des revenus ici
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="text-emerald-600 font-medium mb-1">Total du mois</div>
          <div className="text-2xl font-bold">234,567 MAD</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-blue-600 font-medium mb-1">Projection</div>
          <div className="text-2xl font-bold">250,000 MAD</div>
        </div>
      </div>
    </div>
  );
}
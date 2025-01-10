import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

export function EarningsChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Revenus</h2>
        <select className="p-2 border rounded-lg">
          <option>Ce mois</option>
          <option>3 derniers mois</option>
          <option>Cette année</option>
        </select>
      </div>

      <div className="h-64 flex items-center justify-center text-gray-500">
        Graphique des revenus ici
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-emerald-50 rounded-lg">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Total du mois</span>
          </div>
          <div className="text-2xl font-bold">8,450 MAD</div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Projection</span>
          </div>
          <div className="text-2xl font-bold">10,200 MAD</div>
        </div>
      </div>
    </div>
  );
}
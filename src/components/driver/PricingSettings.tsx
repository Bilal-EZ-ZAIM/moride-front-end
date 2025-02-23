import React, { useState } from 'react';
import { DollarSign, Save } from 'lucide-react';
import { Button } from '../common/Button';

export function PricingSettings() {
  const [pricing, setPricing] = useState({
    hourlyRate: 150,
    kmRate: 3.5,
    minimumFare: 50
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Tarification</h2>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif horaire (MAD/heure)
          </label>
          <input
            type="number"
            value={pricing.hourlyRate}
            onChange={(e) => setPricing({ ...pricing, hourlyRate: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif kilométrique (MAD/km)
          </label>
          <input
            type="number"
            value={pricing.kmRate}
            onChange={(e) => setPricing({ ...pricing, kmRate: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course minimum (MAD)
          </label>
          <input
            type="number"
            value={pricing.minimumFare}
            onChange={(e) => setPricing({ ...pricing, minimumFare: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
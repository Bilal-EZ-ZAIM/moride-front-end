import React, { useState } from 'react';
import { Car, Calendar, Settings, Users, Edit, Save } from 'lucide-react';
import { Button } from '../common/Button';

export function VehicleDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    model: 'Mercedes-Benz Classe E',
    year: '2022',
    transmission: 'Automatique',
    license: 'XX-123-YY',
    insurance: 'Valide jusqu 31/12/2024',
    lastMaintenance: '15/10/2023'
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Informations du Véhicule</h2>
        {isEditing ? (
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsEditing(false)}
          >
            <Save className="w-4 h-4" />
            Enregistrer
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4" />
            Modifier
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.entries(vehicleData).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Car className="w-5 h-5 text-emerald-600" />
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setVehicleData({ ...vehicleData, [key]: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-gray-900">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Object.entries(vehicleData).slice(3).map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-emerald-600" />
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setVehicleData({ ...vehicleData, [key]: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="text-gray-900">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
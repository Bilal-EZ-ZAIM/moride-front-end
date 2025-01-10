import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Languages, Save } from 'lucide-react';
import { Button } from '../common/Button';

export function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Mohammed Alami',
    email: 'mohammed.alami@example.com',
    phone: '+212 6XX-XXXXXX',
    address: 'Casablanca, Maroc',
    languages: 'Arabe, Français, Anglais'
  });

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Informations Personnelles</h2>
      
      <div className="space-y-6">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            {key === 'name' && <User className="w-5 h-5 text-emerald-600" />}
            {key === 'email' && <Mail className="w-5 h-5 text-emerald-600" />}
            {key === 'phone' && <Phone className="w-5 h-5 text-emerald-600" />}
            {key === 'address' && <MapPin className="w-5 h-5 text-emerald-600" />}
            {key === 'languages' && <Languages className="w-5 h-5 text-emerald-600" />}
            
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-900">{value}</p>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-end">
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
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../common/Button';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: 'Mohammed Alami',
    email: 'mohammed.alami@example.com',
    phone: '+212 6XX-XXXXXX',
    location: 'Casablanca, Maroc',
    bio: 'Chauffeur professionnel avec 5 ans d\'expérience',
    linkedin: 'https://linkedin.com/in/mohammed-alami',
    facebook: 'https://facebook.com/mohammed.alami',
    instagram: 'https://instagram.com/mohammed.alami',
    portfolio: 'https://mohammedalami.com'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Modifier le profil</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === 'bio' ? (
                <textarea
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={4}
                />
              ) : (
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onClose}>
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}
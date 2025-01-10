import React from 'react';
import { Camera, Edit } from 'lucide-react';
import { Button } from '../common/Button';

interface ProfileCoverProps {
  onEdit: () => void;
}

export function ProfileCover({ onEdit }: ProfileCoverProps) {
  return (
    <div className="relative h-[400px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute top-4 right-4">
        <Button 
          variant="secondary" 
          className="flex items-center gap-2"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
          Modifier le profil
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 pb-6">
          <div className="flex items-end gap-6">
            <div className="relative -mb-16">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-40 h-40 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-white pb-2">
              <h1 className="text-4xl font-bold mb-2">Mohammed Alami</h1>
              <p className="text-xl text-emerald-300">Chauffeur Premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
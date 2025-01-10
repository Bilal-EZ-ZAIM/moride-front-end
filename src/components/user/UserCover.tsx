import React from 'react';
import { Camera, Edit } from 'lucide-react';
import { Button } from '../common/Button';

interface UserCoverProps {
  onEdit: () => void;
}

export function UserCover({ onEdit }: UserCoverProps) {
  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&q=80"
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
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 text-white pb-2">
              <h1 className="text-3xl font-bold mb-1">Ahmed Benjelloun</h1>
              <p className="text-emerald-300">Membre depuis 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
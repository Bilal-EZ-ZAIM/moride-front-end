import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';

interface DeleteUserModalProps {
  user: any;
  onClose: () => void;
}

export function DeleteUserModal({ user, onClose }: DeleteUserModalProps) {
  const handleDelete = () => {
    // Handle user deletion
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-red-100">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">Supprimer l'utilisateur</h2>
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir supprimer {user.name} ? Cette action est irréversible.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}
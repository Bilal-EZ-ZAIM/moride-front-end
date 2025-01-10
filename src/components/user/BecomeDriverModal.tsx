import React from 'react';
import { X, Car, FileText, Shield } from 'lucide-react';
import { Button } from '../common/Button';

interface BecomeDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BecomeDriverModal({ isOpen, onClose }: BecomeDriverModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Devenir Chauffeur</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <Car className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Informations du Véhicule</h3>
              <p className="text-gray-600">Fournissez les détails de votre véhicule (marque, modèle, année)</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Documents Requis</h3>
              <p className="text-gray-600">Permis de conduire, carte grise, assurance professionnelle</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Vérification</h3>
              <p className="text-gray-600">Processus de vérification des antécédents pour la sécurité</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Plus tard
          </Button>
          <Button>
            Commencer
          </Button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Clock, Shield } from 'lucide-react';

export function PaymentSummary() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Résumé de la Commande</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Montant du trajet</span>
          <span className="font-semibold">350 MAD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Frais de service</span>
          <span className="font-semibold">20 MAD</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg">370 MAD</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg">
          <Shield className="w-5 h-5 text-emerald-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-800">Paiement Sécurisé</h3>
            <p className="text-sm text-emerald-600">
              Vos informations de paiement sont protégées par un cryptage SSL
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800">Réservation Instantanée</h3>
            <p className="text-sm text-blue-600">
              Confirmation immédiate après le paiement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
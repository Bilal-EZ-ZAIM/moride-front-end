import React from 'react';
import { PaymentForm } from '../components/payment/PaymentForm';
import { PaymentSummary } from '../components/payment/PaymentSummary';

export function Payment() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Paiement Sécurisé</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm />
          </div>
          <div>
            <PaymentSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
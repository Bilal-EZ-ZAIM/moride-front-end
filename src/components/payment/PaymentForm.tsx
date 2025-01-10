import React, { useState } from 'react';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { Button } from '../common/Button';
import { CardTypeIndicator } from './CardTypeIndicator';

export function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Informations de Paiement</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de Carte
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="w-full pl-10 pr-12 py-2 border rounded-lg"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CardTypeIndicator cardNumber={cardNumber} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date d'Expiration
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom sur la Carte
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 px-3 border rounded-lg"
            placeholder="JOHN DOE"
          />
        </div>

        <Button type="submit" className="w-full">
          Payer Maintenant
        </Button>

        <p className="text-center text-sm text-gray-600">
          Paiement sécurisé avec cryptage SSL 256-bit
        </p>
      </form>
    </div>
  );
}
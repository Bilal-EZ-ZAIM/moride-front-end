import React from 'react';

interface CardTypeIndicatorProps {
  cardNumber: string;
}

export function CardTypeIndicator({ cardNumber }: CardTypeIndicatorProps) {
  const getCardType = (number: string) => {
    const clean = number.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^5[1-5]/.test(clean)) return 'mastercard';
    return null;
  };

  const cardType = getCardType(cardNumber);

  if (!cardType) return null;

  return (
    <img 
      src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${cardType}.png`}
      alt={cardType}
      className="h-6 w-auto"
    />
  );
}
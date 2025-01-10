import React from 'react';
import { DriverCard } from './DriverCard';

export function DriversList() {
  const drivers = [
    {
      id: 1,
      name: "Mohammed Alami",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80",
      rating: 4.9,
      reviews: 520,
      experience: "5 ans",
      vehicle: "Mercedes-Benz Classe E",
      vehicleType: "Premium",
      languages: ["Français", "Arabe", "Anglais"]
    },
    {
      id: 2,
      name: "Karim Benjelloun",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      rating: 4.8,
      reviews: 342,
      experience: "4 ans",
      vehicle: "BMW Série 5",
      vehicleType: "Premium",
      languages: ["Français", "Arabe"]
    },
    {
      id: 3,
      name: "Hassan Tazi",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      rating: 4.7,
      reviews: 289,
      experience: "3 ans",
      vehicle: "Audi A6",
      vehicleType: "Premium",
      languages: ["Français", "Arabe", "Espagnol"]
    }
  ];

  return (
    <div className="space-y-6">
      {drivers.map(driver => (
        <DriverCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
}
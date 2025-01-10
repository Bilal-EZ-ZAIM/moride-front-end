import React from 'react';
import { MoreVertical } from 'lucide-react';

export function LatestUsers() {
  const users = [
    {
      name: "Sarah L.",
      email: "sarah@example.com",
      type: "Client",
      date: "Il y a 2h",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      name: "Mohammed A.",
      email: "mohammed@example.com",
      type: "Chauffeur",
      date: "Il y a 3h",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Nouveaux Utilisateurs</h2>
      
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-emerald-600">{user.type}</div>
              <div className="text-sm text-gray-500">{user.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
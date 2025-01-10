import React from 'react';
import { Bell, X, User, Car, AlertTriangle } from 'lucide-react';

export function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: 'user',
      message: 'Nouvel utilisateur inscrit',
      time: 'Il y a 5 min',
      icon: User,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'driver',
      message: 'Nouvelle demande de chauffeur',
      time: 'Il y a 10 min',
      icon: Car,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Signalement utilisateur',
      time: 'Il y a 30 min',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="font-semibold">Notifications</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-full pb-20">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
            <div className="flex gap-3">
              <div className={`p-2 rounded-lg ${notification.color}`}>
                <notification.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
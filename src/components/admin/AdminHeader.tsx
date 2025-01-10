import React from 'react';
import { Bell, Search, Settings, User } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button>
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
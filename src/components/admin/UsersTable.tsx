import React from 'react';
import { Edit2, Trash2, Search } from 'lucide-react';

interface UsersTableProps {
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}

export function UsersTable({ onEdit, onDelete }: UsersTableProps) {
  const users = [
    {
      id: 1,
      name: "Sarah L.",
      email: "sarah@example.com",
      role: "client",
      status: "active",
      joined: "2024-01-15",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Mohammed A.",
      email: "mohammed@example.com",
      role: "driver",
      status: "active",
      joined: "2024-02-01",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Utilisateurs</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Utilisateur</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date d'inscription</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="ml-3">
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'driver' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role === 'driver' ? 'Chauffeur' : 'Client'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
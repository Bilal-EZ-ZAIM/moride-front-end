import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  DollarSign, 
  Settings, 
  Shield,
  MessageSquare,
  FileText,
  HelpCircle
} from 'lucide-react';

export function AdminSidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
    { icon: Car, label: 'Chauffeurs', path: '/admin/drivers' },
    { icon: DollarSign, label: 'Revenus', path: '/admin/revenue' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: FileText, label: 'Rapports', path: '/admin/reports' },
    { icon: Shield, label: 'Vérifications', path: '/admin/verifications' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
    { icon: HelpCircle, label: 'Support', path: '/admin/support' }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold">MoRide Admin</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
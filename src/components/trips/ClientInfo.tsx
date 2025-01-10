import React from 'react';
import { Phone, Mail, MessageSquare, Star } from 'lucide-react';
import { Button } from '../common/Button';

export function ClientInfo() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
          alt="Client"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">Sarah L.</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>4.8/5</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <a href="tel:+212600000000" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
          <Phone className="w-5 h-5 text-emerald-600" />
          <span>+212 6XX-XXXXXX</span>
        </a>
        <a href="mailto:sarah@example.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
          <Mail className="w-5 h-5 text-emerald-600" />
          <span>sarah@example.com</span>
        </a>
        <a href="https://wa.me/212600000000" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>
      </div>

      <Button className="w-full">Envoyer un message</Button>
    </div>
  );
}
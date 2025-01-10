import React from 'react';
import { Linkedin, Facebook, Instagram, Globe, Mail, Phone } from 'lucide-react';

export function UserSocialLinks() {
  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/ahmed-benjelloun',
      color: 'text-blue-600'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      url: 'https://facebook.com/ahmed.benjelloun',
      color: 'text-blue-500'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      url: 'https://instagram.com/ahmed.benjelloun',
      color: 'text-pink-500'
    },
    {
      icon: Globe,
      label: 'Portfolio',
      url: 'https://ahmedbenjelloun.com',
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Réseaux Sociaux</h2>
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <link.icon className={`w-5 h-5 ${link.color}`} />
            <span className="text-gray-700">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
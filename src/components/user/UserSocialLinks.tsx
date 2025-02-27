import React from "react";
import {
  Linkedin,
  Facebook,
  Instagram,
  Globe,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";

export function UserSocialLinks({ socialLink }: any) {
  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: socialLink.linkedIn,
      color: "text-blue-600",
    },
    {
      icon: Facebook,
      label: "Facebook",
      url: socialLink.facebook,
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      label: "Whatsapp",
      url: socialLink.whatsapp,
      color: "text-green-500",
    },
    {
      icon: Globe,
      label: "Portfolio",
      url: socialLink.portfolio,
      color: "text-emerald-600",
    },
  ];
  console.log(socialLinks);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Réseaux Sociaux</h2>
      <div className="space-y-4">
        {socialLinks.map((link) =>
          link.url !== "" ? (
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
          ) : null
        )}
      </div>
    </div>
  );
}

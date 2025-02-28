import React from "react";
import { Sparkles, Shield, Users, Clock, CreditCard } from "lucide-react";

export function InnovativeFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "IA Prédictive",
      description:
        "Optimisation intelligente des trajets et prévision de la demande",
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Système de vérification et suivi en temps réel",
    },
    {
      icon: Users,
      title: "Transport Féminin",
      description: "Service dédié avec chauffeuses pour plus de confort",
    },
    {
      icon: Clock,
      title: "Flexibilité Horaire",
      description: "Disponibilité 24/7 selon vos besoins",
    },
    {
      icon: CreditCard,
      title: "Paiement Facile",
      description: "Options multiples de paiement sécurisé",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Innovation & Technologie
          </h2>
          <p className="text-xl text-gray-600">
            Des solutions modernes pour vos déplacements
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <feature.icon className="h-12 w-12 text-emerald-600 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

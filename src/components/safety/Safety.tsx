import React from 'react';
import { Shield, UserCheck, Bell, Lock } from 'lucide-react';

export function Safety() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Votre Sécurité, Notre Priorité</h2>
          <p className="text-xl text-gray-600">Des mesures de sécurité avancées pour votre tranquillité</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Shield className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Chauffeurs Vérifiés</h3>
                <p className="text-gray-600">
                  Vérification rigoureuse des antécédents et inspection des véhicules.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <UserCheck className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Double Vérification</h3>
                <p className="text-gray-600">
                  Système de vérification pour les chauffeurs et les passagers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Bell className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Suivi en Temps Réel</h3>
                <p className="text-gray-600">
                  Partagez votre trajet avec vos proches pour plus de sécurité.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
              alt="Sécurité routière"
              className="rounded-2xl shadow-2xl w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
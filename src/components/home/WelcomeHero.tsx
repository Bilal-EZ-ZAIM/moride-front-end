import React from 'react';
import { ArrowRight, Shield, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

export function WelcomeHero() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1565689478170-6624de957899?auto=format&fit=crop&q=80"
          alt="Moroccan cityscape at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
            Transport Intelligent au
            <span className="text-emerald-400"> Maroc</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Une solution moderne pour vos déplacements urbains. Sécurité, confort et innovation au service de votre mobilité.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" className="flex items-center gap-2">
              Réserver Maintenant
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
              En Savoir Plus
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-emerald-400" />
              <div className="text-white">
                <h3 className="font-semibold text-lg">Sécurité Garantie</h3>
                <p className="text-gray-300">Chauffeurs vérifiés</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-10 w-10 text-emerald-400" />
              <div className="text-white">
                <h3 className="font-semibold text-lg">Couverture Nationale</h3>
                <p className="text-gray-300">Dans toutes les villes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-emerald-400" />
              <div className="text-white">
                <h3 className="font-semibold text-lg">Support 24/7</h3>
                <p className="text-gray-300">À votre service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Shield, Star, Phone } from 'lucide-react';
import { Button } from '../common/Button';

export function DownloadApp() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Téléchargez Notre App</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Profitez de la meilleure expérience de transport avec notre application mobile.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">Sûr & Fiable</h3>
                  <p className="text-emerald-100">Votre sécurité est notre priorité</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">Note 4.9/5</h3>
                  <p className="text-emerald-100">Par plus de 10 000 utilisateurs</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">Support 24/7</h3>
                  <p className="text-emerald-100">Toujours là pour vous aider</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg">
                Télécharger pour iOS
              </Button>
              <Button variant="secondary" size="lg">
                Télécharger pour Android
              </Button>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80"
              alt="Capture d'écran de l'application"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { ArrowRight, Shield, MapPin } from "lucide-react";
import { Button } from "../common/Button";
import FeatureCard from "./FeatureCard";

export function WelcomeHero() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1565689478170-6624de957899?auto=format&fit=crop&q=80"
          alt="Moroccan cityscape at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-3xl text-center md:text-left">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-white">
            Transport Intelligent au
            <span className="text-emerald-400"> Maroc</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8">
            Une solution moderne pour vos déplacements urbains. Sécurité,
            confort et innovation au service de votre mobilité.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 md:mb-12">
            <Button
              size="md"
              className="flex items-center justify-center gap-2"
            >
              Réserver Maintenant
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="md"
              className="text-white border-white hover:bg-white/10"
            >
              En Savoir Plus
            </Button>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-emerald-400" />
              }
              title="Sécurité Garantie"
              description="Chauffeurs vérifiés"
            />
            <FeatureCard
              icon={
                <MapPin className="h-8 w-8 md:h-10 md:w-10 text-emerald-400" />
              }
              title="Couverture Nationale"
              description="Dans toutes les villes"
            />
            <FeatureCard
              icon={
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-emerald-400" />
              }
              title="Support 24/7"
              description="À votre service"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



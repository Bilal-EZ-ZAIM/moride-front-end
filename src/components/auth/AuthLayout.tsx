import React from "react";
import { Car } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?auto=format&fit=crop&q=80"
          alt="Transport au Maroc"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/80 flex items-center justify-center p-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <Car className="h-12 w-12 text-emerald-400" />
              <h1 className="text-4xl font-bold text-white">MoRide</h1>
            </div>
            <p className="text-xl text-emerald-100">
              Découvrez une nouvelle façon de voyager au Maroc. Sécurité,
              confort et innovation pour tous vos déplacements.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

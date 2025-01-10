import React from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Alami",
      location: "Casablanca",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      text: "Le meilleur service de transport au Maroc ! Toujours ponctuel et professionnel."
    },
    {
      name: "Mohammed Tazi",
      location: "Rabat",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      text: "J'apprécie l'option de trajet partagé. Écologique et convivial !"
    },
    {
      name: "Fatima Hassan",
      location: "Marrakech",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      text: "Sûr, fiable et abordable. Le paiement en espèces est très pratique."
    }
  ];

  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Témoignages</h2>
          <p className="text-xl text-gray-600">Ce que disent nos clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
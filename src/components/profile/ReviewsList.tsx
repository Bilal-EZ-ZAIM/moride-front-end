import React from 'react';
import { Star } from 'lucide-react';

export function ReviewsList() {
  const reviews = [
    {
      id: 1,
      author: "Sarah L.",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Excellent service, très professionnel et ponctuel. La voiture était impeccable.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      author: "Ahmed M.",
      rating: 5,
      date: "La semaine dernière",
      comment: "Chauffeur très sympathique et conduite très sûre. Je recommande !",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Avis des clients</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
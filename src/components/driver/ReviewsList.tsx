import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, Share2, Award, TrendingUp, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  likes?: number;
  replies?: number;
  isHelpful?: boolean;
  badge?: string;
}

interface ReviewsListProps {
  isDriver: boolean;
}

export function ReviewsList({ isDriver }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "Sarah L.",
      rating: 5,
      date: "Il y a 2 jours",
      comment: "Excellent service, très professionnel et ponctuel. La voiture était impeccable.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      likes: 24,
      replies: 3,
      badge: "Top Reviewer",
    },
    {
      id: 2,
      author: "Ahmed M.",
      rating: 5,
      date: "La semaine dernière",
      comment: "Chauffeur très sympathique et conduite très sûre. Je recommande !",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      likes: 18,
      replies: 2,
      badge: "Verified User",
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [hoverRating, setHoverRating] = useState(0);
  const [animateStars, setAnimateStars] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      rating: 5,
      comment: ''
    }
  });

  const currentRating = watch('rating');
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateStars(true);
      setTimeout(() => setAnimateStars(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data: any) => {
    const newReview = {
      id: reviews.length + 1,
      author: "Utilisateur",
      rating: data.rating,
      date: "À l'instant",
      comment: data.comment,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      likes: 0,
      replies: 0
    };
    setReviews([newReview, ...reviews]);
    reset();
  };

  const handleLike = (reviewId: number) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: (review.likes || 0) + 1, isHelpful: true }
        : review
    ));
  };

  const getFilteredReviews = () => {
    switch (activeFilter) {
      case 'recent':
        return [...reviews].sort((a, b) => b.id - a.id);
      case 'helpful':
        return [...reviews].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      case 'highest':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      default:
        return reviews;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-emerald-600">
            {averageRating}
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.round(Number(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
                    ${animateStars ? 'animate-bounce' : ''}`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-2">Note moyenne</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-emerald-600">
            <Users className="w-8 h-8" />
            {reviews.length}
          </div>
          <p className="text-gray-600 mt-2">Avis clients</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-4xl font-bold text-emerald-600">
            <TrendingUp className="w-8 h-8" />
            98%
          </div>
          <p className="text-gray-600 mt-2">Taux de satisfaction</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'all', label: 'Tous les avis' },
          { id: 'recent', label: 'Plus récents' },
          { id: 'helpful', label: 'Plus utiles' },
          { id: 'highest', label: 'Meilleures notes' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${activeFilter === filter.id 
                ? 'bg-emerald-600 text-white shadow-md transform scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {!isDriver && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Partagez votre expérience</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="transition-all duration-200 hover:scale-110 focus:outline-none"
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    const event = {
                      target: { value: rating }
                    } as React.ChangeEvent<HTMLInputElement>;
                    register('rating').onChange(event);
                  }}
                >
                  <Star 
                    className={`w-8 h-8 transition-all duration-200 ${
                      (hoverRating || currentRating) >= rating 
                        ? 'fill-yellow-400 text-yellow-400 transform scale-110' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Votre commentaire
            </label>
            <textarea
              id="comment"
              {...register('comment', { required: true })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Partagez votre expérience avec nous..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Publier mon avis
          </button>
        </form>
      )}

      <div className="space-y-6">
        {getFilteredReviews().map((review) => (
          <div 
            key={review.id} 
            className="group p-6 rounded-xl transition-all duration-300 hover:bg-emerald-50 border border-transparent hover:border-emerald-100"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                />
                {review.badge && (
                  <div className="absolute -top-2 -right-2">
                    <Award className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-gray-900">{review.author}</h3>
                      {review.badge && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          {review.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{review.date}</span>
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
                
                <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                  <button 
                    onClick={() => handleLike(review.id)}
                    className={`flex items-center gap-1 transition-colors duration-200 ${
                      review.isHelpful ? 'text-emerald-600' : 'hover:text-emerald-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                    <span>{review.replies || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
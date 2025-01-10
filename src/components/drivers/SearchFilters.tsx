import React from 'react';
import { Search, Filter, Star, Car } from 'lucide-react';

export function SearchFilters() {
  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un chauffeur..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold">Filtres</h2>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Note minimum</h3>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <label key={rating} className="flex items-center gap-2">
                <input type="radio" name="rating" className="text-emerald-600" />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600">et plus</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Vehicle Type Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Type de véhicule</h3>
          <div className="space-y-2">
            {['Berline', 'SUV', 'Van', 'Premium'].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input type="checkbox" className="text-emerald-600 rounded" />
                <span className="text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div>
          <h3 className="font-medium mb-3">Expérience</h3>
          <div className="space-y-2">
            {[
              '5+ ans d\'expérience',
              '3-5 ans d\'expérience',
              '1-3 ans d\'expérience'
            ].map((exp) => (
              <label key={exp} className="flex items-center gap-2">
                <input type="checkbox" className="text-emerald-600 rounded" />
                <span className="text-gray-600">{exp}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
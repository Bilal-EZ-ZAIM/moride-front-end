import { HandCoins, ThumbsUp, Clock, Users } from 'lucide-react';
import { useState } from 'react';

export default function PriceNegotiation() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Pricing</h2>
          <p className="text-xl text-gray-600">Negotiate your fare for longer journeys</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4">
                <HandCoins className="h-12 w-12 text-purple-600" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Name Your Price</h3>
                  <p className="text-gray-600">
                    For trips over 50km, discuss and agree on a fair price with your driver before the journey.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <ThumbsUp className="h-8 w-8 text-purple-600 mb-4" />
                <h4 className="font-bold mb-2">Fair Deals</h4>
                <p className="text-gray-600 text-sm">
                  Transparent negotiation based on distance and time
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Clock className="h-8 w-8 text-purple-600 mb-4" />
                <h4 className="font-bold mb-2">Long Trips</h4>
                <p className="text-gray-600 text-sm">
                  Special rates for intercity travel
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Users className="h-8 w-8 text-purple-600 mb-4" />
                <h4 className="font-bold mb-2">Group Discounts</h4>
                <p className="text-gray-600 text-sm">
                  Better rates for group bookings
                </p>
              </div>

              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 shadow-lg text-white cursor-pointer"
                onClick={() => setShowInfo(!showInfo)}
              >
                <h4 className="font-bold mb-2">How It Works</h4>
                <p className="text-sm">
                  Click to learn more about our negotiation process
                </p>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-2xl p-8 shadow-xl transition-all duration-500 ${showInfo ? 'scale-105' : ''}`}>
            <h3 className="text-2xl font-bold mb-6">Negotiation Guide</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  1
                </div>
                <p className="flex-1">Enter your destination and select "Negotiate Price"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  2
                </div>
                <p className="flex-1">Suggest your preferred price based on the journey</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  3
                </div>
                <p className="flex-1">Drivers can accept or propose a counter-offer</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  4
                </div>
                <p className="flex-1">Once agreed, your ride is confirmed at the negotiated price</p>
              </div>
              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">
                  Tip: Prices are generally more negotiable during off-peak hours and for longer journeys
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Phone, Shield, Star } from 'lucide-react';

export default function DownloadApp() {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Download Our App</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Get the best ride-sharing experience with our mobile app. Book rides, track your driver, and manage payments all in one place.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">Secure & Reliable</h3>
                  <p className="text-emerald-100">Your safety is our top priority</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">Rated 4.9/5</h3>
                  <p className="text-emerald-100">By over 10,000 users</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-8 w-8 text-emerald-300" />
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-emerald-100">Always here to help you</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                Download for iOS
              </button>
              <button className="bg-white text-emerald-900 px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors">
                Download for Android
              </button>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80"
              alt="Mobile app screenshot"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
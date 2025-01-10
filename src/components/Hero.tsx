import { ArrowRight, Shield, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1531237570672-7155f8eb1505?auto=format&fit=crop&q=80"
          alt="Morocco cityscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Your Safe Journey Through
            <span className="text-emerald-400"> Morocco</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience the perfect blend of traditional hospitality and modern convenience with our trusted transportation service.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full hover:bg-emerald-600 transition-colors">
              Book Your Ride
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-lg">Verified Drivers</h3>
                <p className="text-gray-300">100% background checked</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-10 w-10 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-lg">Nationwide Service</h3>
                <p className="text-gray-300">Available in all cities</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-emerald-400" />
              <div>
                <h3 className="font-semibold text-lg">24/7 Support</h3>
                <p className="text-gray-300">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
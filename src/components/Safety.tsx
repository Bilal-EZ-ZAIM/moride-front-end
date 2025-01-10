import { Shield, UserCheck, Bell, Lock } from 'lucide-react';

export default function Safety() {
  return (
    <section id="safety" className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Safety is Our Priority</h2>
          <p className="text-xl text-gray-600">Multiple safety features for complete peace of mind</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Shield className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Verified Drivers</h3>
                <p className="text-gray-600">
                  Every driver undergoes strict background checks and vehicle inspections for your safety.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <UserCheck className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Identity Verification</h3>
                <p className="text-gray-600">
                  Two-way verification system for both riders and drivers.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Bell className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600">
                  Track your ride in real-time and share your journey with trusted contacts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Lock className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-gray-600">
                  Choose between secure digital payments or cash payment on arrival.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&q=80"
              alt="Safe journey in Morocco"
              className="rounded-2xl shadow-2xl w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-2xl flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Travel with Confidence</h3>
                <p>Every journey is monitored for your safety and peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
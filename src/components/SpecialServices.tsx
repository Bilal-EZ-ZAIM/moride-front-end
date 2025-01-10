import { Heart, Users, Clock, ShieldCheck } from 'lucide-react';

export default function SpecialServices() {
  return (
    <section id="special-services" className="py-20 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Special Services</h2>
          <p className="text-xl text-gray-600">Safe and comfortable options for everyone</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <Heart className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Women Only Service</h3>
                <p className="text-gray-600 mb-6">
                  Exclusive service with verified female drivers for women passengers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>Certified female drivers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span>Women and children only</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <Users className="h-12 w-12 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Group Travel</h3>
                <p className="text-gray-600 mb-6">
                  Safe and comfortable shared rides with verified co-passengers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>Verified co-passengers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span>Cost-effective travel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
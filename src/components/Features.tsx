import { Car, Users, Clock, CreditCard, Heart, MapPin } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Car,
      title: "Multiple Vehicle Types",
      description: "Choose from our diverse fleet of vehicles"
    },
    {
      icon: Users,
      title: "Shared Rides",
      description: "Save money with carpooling options"
    },
    {
      icon: Heart,
      title: "Women Only Service",
      description: "Exclusive service with female drivers"
    },
    {
      icon: Clock,
      title: "Scheduled Rides",
      description: "Book in advance for your convenience"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay by cash or card, your choice"
    },
    {
      icon: MapPin,
      title: "City Tours",
      description: "Explore Morocco with local drivers"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600">Experience the best ride-sharing service in Morocco</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <feature.icon className="h-12 w-12 text-emerald-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
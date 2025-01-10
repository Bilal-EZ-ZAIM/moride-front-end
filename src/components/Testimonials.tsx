import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Real experiences from satisfied riders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              location: "Casablanca",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
              text: "The best ride-sharing service in Morocco! Always on time and very professional drivers."
            },
            {
              name: "Mohammed Ali",
              location: "Rabat",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
              text: "I love the shared ride option. It's eco-friendly and I've met some great people!"
            },
            {
              name: "Fatima Hassan",
              location: "Marrakech",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
              text: "Safe, reliable, and affordable. The cash payment option is very convenient."
            }
          ].map((testimonial, index) => (
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
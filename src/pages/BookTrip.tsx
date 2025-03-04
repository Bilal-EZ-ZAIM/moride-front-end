import { BookingForm } from "../components/booking/BookingForm";
import { Car } from "lucide-react";

export function BookTrip() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-4">
            <Car className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Réserver un Trajet
          </h1>
          <p className="text-lg text-gray-600">
            Trouvez le chauffeur idéal pour votre prochain trajet
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 transition-all duration-300 transform hover:translate-y-[-2px]">
              <div className="sticky top-8">
                <BookingForm />
              </div>
            </div>

            {/* Driver Responses Section */}
            {/* <div className="transition-all duration-300 transform hover:translate-y-[-2px]">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <span className="bg-emerald-100 p-2 rounded-lg mr-3">
                      <Car className="w-5 h-5 text-emerald-600" />
                    </span>
                    Réponses des Chauffeurs
                  </h2>
                  <DriverResponses />
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="bg-emerald-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">
              Besoin d'aide ?
            </h3>
            <p className="text-emerald-600">
              Notre équipe est disponible 24/7 pour vous assister dans votre
              réservation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookTrip;

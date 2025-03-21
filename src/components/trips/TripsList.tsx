import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  ArrowRight,
  Star,
  Search,
  Car,
  Shield,
} from "lucide-react";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBookings } from "../../store/features/booking/bookingSlice";

export function TripsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { bookings } = useAppSelector((state) => state.booking);
  const { driverId } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();
  console.log(bookings);

  const getBooking = async () => {
    await dispatch(fetchBookings());
  };

  useEffect(() => {
    getBooking();
  }, []);

  const filteredTrips = bookings?.filter(
    (trip: any) =>
      trip?.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip?.to?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {bookings?.length > 0 && (
        <div className="space-y-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par ville de départ ou d'arrivée..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid gap-6">
            {filteredTrips?.map((trip: any) => (
              <div
                key={trip._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                      <img
                        src={trip.profileId?.imageProfile.url}
                        alt={trip.profileId?.firstname}
                        className="w-20 h-20 rounded-xl object-cover ring-4 ring-emerald-50 group-hover:ring-emerald-100 transition-all duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-emerald-50 rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                        <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-700">
                          4
                        </span>
                      </div>

                      <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1.5 shadow-md">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {trip.profileId?.firstname}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            trip.tripType === "private"
                              ? "bg-purple-100 text-purple-700"
                              : trip.tripType === "premium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {trip.tripType === "private"
                            ? "Trajet privé"
                            : trip.tripType === "premium"
                            ? "Trajet premium"
                            : "Trajet partagé"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {trip.passengers} passagers
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Car className="w-4 h-4" />
                          Voiture confortable
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-100 z-0"></div>
                    <div className="relative z-10 space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-100 rounded-lg shadow-sm">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            Départ
                          </div>
                          <div className="font-semibold text-gray-900">
                            {trip.from}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {trip.date} à {trip.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-100 rounded-lg shadow-sm">
                          <MapPin className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            Arrivée
                          </div>
                          <div className="font-semibold text-gray-900">
                            {trip.to}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        Prix par personne
                      </div>
                      <div className="text-2xl font-bold text-emerald-600">
                        {trip.priceFrom}-{trip.priceTo} MAD
                      </div>
                    </div>
                    <Link to={`/tripDetails/${trip._id}`}>
                      {trip.applicants?.some(
                        (applicant: any) => applicant.driverId === driverId
                      ) ? (
                        <Button className="flex items-center gap-2 px-8 py-3 text-base bg-gray-400 cursor-not-allowed">
                          Déjà postulé
                        </Button>
                      ) : (
                        <Button className="flex items-center gap-2 px-8 py-3 text-base group-hover:bg-emerald-700 transition-colors duration-300">
                          Postuler
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

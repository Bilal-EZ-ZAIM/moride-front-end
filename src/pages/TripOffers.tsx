import { TripsList } from "../components/trips/TripsList";
import { TripsFilters } from "../components/trips/TripsFilters";
import { useAppSelector } from "../hooks";

export function TripOffers() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Offres de Trajets Disponibles
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TripsFilters />
          <div className="lg:col-span-3">
            <TripsList />
          </div>
        </div>
      </div>
    </div>
  );
}

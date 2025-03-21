import { TripsList } from "../components/trips/TripsList";

export function TripOffers() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Offres de Trajets Disponibles
        </h1>
        <div className="max-w-4xl w-full">
          <TripsList />
        </div>
      </div>
    </div>
  );
}

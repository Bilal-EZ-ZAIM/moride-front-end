import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchDriverPricingDetails,
} from "../../store/features/pricing/pricingSlice";
import { Loader2 } from "lucide-react";

export function PricingDetails({ userId }: { userId: string }) {
  const { isLoading, driverPricingDetails } = useAppSelector(
    (state) => state.pricing
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDriverPricingDetails(userId));
  }, [dispatch]);

  console.log(driverPricingDetails);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Chargement en cours...</span>
        </div>
      </div>
    );
  }

  if (!driverPricingDetails) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600">
          Aucune donnée de tarification disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Détails de la tarification</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif horaire (MAD/heure)
          </label>
          <input
            type="number"
            value={driverPricingDetails.hourlyRate}
            disabled
            className="w-full p-2 border rounded-lg border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif kilométrique (MAD/km)
          </label>
          <input
            type="number"
            value={driverPricingDetails.kmRate}
            disabled
            className="w-full p-2 border rounded-lg border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course minimum (MAD)
          </label>
          <input
            type="number"
            value={driverPricingDetails.minimumFare}
            disabled
            className="w-full p-2 border rounded-lg border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}

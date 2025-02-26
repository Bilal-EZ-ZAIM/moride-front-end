import { useEffect } from "react";
import { Car, Calendar, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCarByDriver } from "../../store/features/car/carSlice";

export function VehicleInfoDriver({ driverId = null }: any) {
  console.log(driverId);
  const dispatch = useAppDispatch();
  const { isLoading, carDriver } = useAppSelector((state) => state.car);
  useEffect(() => {
    dispatch(getCarByDriver(driverId));
  }, [driverId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="border-t-4 border-emerald-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
          <div className="text-2xl font-bold text-gray-500">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6">
        {carDriver?.model ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={
                  carDriver.image?.url ||
                  "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80"
                }
                alt="Vehicle"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{carDriver.model}</div>
                  <div className="text-sm text-gray-600">
                    {carDriver.transmission}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{carDriver.year}</div>
                  <div className="text-sm text-gray-600">Année du véhicule</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{carDriver.license}</div>
                  <div className="text-sm text-gray-600">Immatriculation</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Aucune voiture enregistrée.
          </div>
        )}
      </div>
    </>
  );
}

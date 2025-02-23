import React, { useEffect, useState } from "react";
import { Car, Calendar, Settings, Edit, PlusCircle } from "lucide-react";
import { Button } from "../common/Button";
import { EditVehicleModal } from "./EditVehicleModal";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMyCar } from "../../store/features/car/carSlice";

export function VehicleInfo() {
  const dispatch = useAppDispatch();
  const { isLoading, car } = useAppSelector((state) => state.car);
  console.log(car); 

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState({});

  const handleSave = (data:any) => {
    setVehicleData(data); 
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
  };

  useEffect(() => {
    const getMyCars = async () => {
      await dispatch(getMyCar()); 
    };

    getMyCars();

    return () => {
      console.log("Cleaning up");
    };
  }, [dispatch]);

  useEffect(() => {
    if (car) {
      setVehicleData(car); 
    }
  }, [car]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Véhicule</h2>
          {vehicleData?.model ? (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="w-4 h-4" />
              Modifier
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircle className="w-4 h-4" />
              Créer Véhicule
            </Button>
          )}
        </div>

        {vehicleData?.model ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={vehicleData.image?.url || "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80"}
                alt="Vehicle"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{vehicleData?.model}</div>
                  <div className="text-sm text-gray-600">{vehicleData?.transmission}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{vehicleData.year}</div>
                  <div className="text-sm text-gray-600">Année du véhicule</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{vehicleData.license}</div>
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

      <EditVehicleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
        vehicleData={vehicleData}
      />

      <CreateVehicleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}

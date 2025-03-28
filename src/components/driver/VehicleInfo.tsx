import React, { useEffect, useState } from "react";
import { Car, Calendar, Settings, Edit, PlusCircle } from "lucide-react";
import { Button } from "../common/Button";
import { EditVehicleModal } from "./EditVehicleModal";
import { CreateVehicleModal } from "./CreateVehicleModal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMyCar } from "../../store/features/car/carSlice";

export function VehicleInfo({ isOwner }: any) {
  const dispatch = useAppDispatch();
  const { isLoading, car } = useAppSelector((state) => state.car);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getMyCar());
  }, [dispatch]);

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Véhicule</h2>
          {isOwner && car?.model ? ( 
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="w-4 h-4" />
              Modifier
            </Button>
          ) : !car?.model ? ( 
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusCircle className="w-4 h-4" />
              Créer Véhicule
            </Button>
          ) : null}
        </div>

        {car?.model ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={
                  car.image?.url
                }
                alt="Vehicle"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{car.model}</div>
                  <div className="text-sm text-gray-600">
                    {car.transmission}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{car.year}</div>
                  <div className="text-sm text-gray-600">Année du véhicule</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="font-semibold">{car.license}</div>
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
        vehicleData={car}
      />

      <CreateVehicleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

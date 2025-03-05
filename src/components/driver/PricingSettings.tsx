import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Save, Plus, Pencil, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createPricing,
  fetchPricing,
  updatePricing,
} from "../../store/features/pricing/pricingSlice";

type PricingFormValues = {
  hourlyRate: number;
  kmRate: number;
  minimumFare: number;
};

export function PricingSettings() {
  const { isLoading, pricingData, error } = useAppSelector(
    (state) => state.pricing
  );

  console.log(pricingData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPricing());
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PricingFormValues>();

  useEffect(() => {
    if (!isLoading && pricingData) {
      setValue("hourlyRate", pricingData.hourlyRate);
      setValue("kmRate", pricingData.kmRate);
      setValue("minimumFare", pricingData.minimumFare);
    }
  }, [isLoading, pricingData, setValue]);

  const onSubmit = async (data: PricingFormValues) => {
    try {
      if (pricingData) {
        await dispatch(updatePricing({ id: pricingData._id, data }));
      } else {
        await dispatch(createPricing(data));
      }

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: pricingData
          ? "La tarification a été mise à jour avec succès"
          : "La tarification a été créée avec succès",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'enregistrement",
        confirmButtonText: "Réessayer",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

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

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          {pricingData ? "Modifier la tarification" : "Nouvelle tarification"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif horaire (MAD/heure)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 150 MAD/heure"
            {...register("hourlyRate", {
              required: "Ce champ est requis",
              min: {
                value: 1,
                message: "Le tarif horaire doit être supérieur à 0",
              },
            })}
            className={`w-full p-2 border rounded-lg ${
              errors.hourlyRate ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.hourlyRate && (
            <p className="text-red-500 text-sm">{errors.hourlyRate?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tarif kilométrique (MAD/km)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 2.5 MAD/km"
            {...register("kmRate", {
              required: "Ce champ est requis",
              min: {
                value: 0.1,
                message: "Le tarif kilométrique doit être supérieur à 0",
              },
            })}
            className={`w-full p-2 border rounded-lg ${
              errors.kmRate ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.kmRate && (
            <p className="text-red-500 text-sm">{errors.kmRate?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course minimum (MAD)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 30 MAD"
            {...register("minimumFare", {
              required: "Ce champ est requis",
              min: {
                value: 1,
                message: "Le tarif minimum doit être supérieur à 0",
              },
            })}
            className={`w-full p-2 border rounded-lg ${
              errors.minimumFare ? "border-red-500" : "border-gray-300"
            }`}
            disabled={isLoading}
          />
          {errors.minimumFare && (
            <p className="text-red-500 text-sm">
              {errors.minimumFare?.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {pricingData ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
}

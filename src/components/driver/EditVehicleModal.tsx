import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  X,
  Car,
  Calendar,
  Settings,
  FileImage,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "../common/Button";
import { updateCar } from "../../store/features/car/carSlice";
import { useAppDispatch } from "../../hooks";
import Swal from "sweetalert2";

// Définir le type pour les données du formulaire
interface VehicleFormData {
  model: string;
  year: string;
  license: string;
  insurance: string;
  transmission: string;
  lastMaintenance: string;
}

// Définir le type pour l'image
interface ImageFile extends File {
  preview?: string;
}

// Définir l'interface pour Car qui correspond au schéma
interface CarData {
  model: string;
  year: string;
  transmission: string;
  license: string;
  insurance: string;
  lastMaintenance: string;
  image: any;
}



export function EditVehicleModal({ isOpen, onClose, vehicleData }: any) {
  const [selectedPrevewise, setSelectedPrevewise] = useState<ImageFile | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  // Setup react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    defaultValues: {
      model: "",
      year: "",
      license: "",
      transmission: "automatic",
      insurance: "",
      lastMaintenance: new Date().toISOString().split("T")[0],
    },
  });

  // Initialiser le formulaire avec les données du véhicule si elles sont fournies
  useEffect(() => {
    if (vehicleData) {
      reset({
        model: vehicleData.model || "",
        year: vehicleData.year,
        license: vehicleData.license || "",
        insurance: vehicleData.insurance || "",
        transmission: vehicleData.transmission || "automatic",
        lastMaintenance:
          vehicleData.lastMaintenance || new Date().toISOString().split("T")[0],
      });

      if (vehicleData.image) {
        const fileWithPreview = {
          name: vehicleData.image.key,
          preview: vehicleData.image.url,
        } as ImageFile;
        setSelectedPrevewise(fileWithPreview);
      }
    }
  }, [vehicleData, reset]);

  // Gérer la sélection de fichier
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Nettoyer l'aperçu d'image précédent si existant
    if (selectedPrevewise?.preview) {
      URL.revokeObjectURL(selectedPrevewise.preview);
    }
    const file: any = e.target.files?.[0];
    setSelectedImage(file);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as ImageFile;

      // Ajouter URL d'aperçu pour l'image
      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedPrevewise(fileWithPreview);
    }
  };

  // Supprimer l'image sélectionnée
  const removeImage = () => {
    if (selectedPrevewise?.preview) {
      URL.revokeObjectURL(selectedPrevewise.preview);
    }
    setSelectedPrevewise(null);
  };

  // Gérer la soumission du formulaire

  const onSubmitForm = async (data: VehicleFormData) => {
    console.log(selectedImage);
    console.log(data);
    setIsLoading(true);
    try {
  

      const formData = new FormData();
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("transmission", data.transmission);
      formData.append("license", data.license);
      formData.append("insurance", data.insurance);
      formData.append("lastMaintenance", data.lastMaintenance);

      if (selectedImage instanceof File) {
        formData.append("image", selectedImage);
      }

      await dispatch(updateCar({ id: vehicleData?._id, updateData: formData }));

      reset();
      setSelectedPrevewise(null);
      onClose();

      Swal.fire({
        title: "Succès!",
        text: "Les informations du véhicule ont été mises à jour avec succès.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error saving vehicle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Nettoyer l'URL de l'objet lorsque le composant est démonté
  useEffect(() => {
    return () => {
      if (selectedPrevewise?.preview) {
        URL.revokeObjectURL(selectedPrevewise.preview);
      }
    };
  }, [selectedPrevewise]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between border-b pb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-semibold">Modifier le véhicule</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Champ Modèle */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Modèle du véhicule
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="model"
                  control={control}
                  rules={{ required: "Le modèle du véhicule est requis" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                        errors.model
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Mercedes-Benz Classe E"
                    />
                  )}
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            {/* Champ Année */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Année
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="year"
                  control={control}
                  rules={{ required: "L'année est requise" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                        errors.year
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="2024"
                    />
                  )}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.year.message}
                  </p>
                )}
              </div>
            </div>

            {/* Champ Numéro de plaque */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Numéro de plaque
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="license"
                  control={control}
                  rules={{ required: "Le numéro de plaque est requis" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                        errors.license
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="ABC-1234"
                    />
                  )}
                />
                {errors.license && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.license.message}
                  </p>
                )}
              </div>
            </div>
            {/* Champ Assurance */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Assurance
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="insurance"
                  control={control}
                  rules={{ required: "L'assurance est requise" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                        errors.insurance
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Assurance X"
                    />
                  )}
                />
                {errors.insurance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.insurance.message}
                  </p>
                )}
              </div>
            </div>

            {/* Champ Transmission */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Transmission
              </label>
              <div className="relative">
                <Settings className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="transmission"
                  control={control}
                  rules={{ required: "Le type de transmission est requis" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-emerald-500 ${
                        errors.transmission
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="automatic">Automatique</option>
                      <option value="manual">Manuelle</option>
                      <option value="semi-automatic">Semi-automatique</option>
                    </select>
                  )}
                />
                {errors.transmission && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.transmission.message}
                  </p>
                )}
              </div>
            </div>

            {/* Champ Dernière maintenance */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Dernière maintenance
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Controller
                  name="lastMaintenance"
                  control={control}
                  rules={{
                    required: "La date de la dernière maintenance est requise",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                        errors.lastMaintenance
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.lastMaintenance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastMaintenance.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section de téléchargement d'image */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image du véhicule
            </label>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <div className="flex flex-col justify-center items-center text-center space-y-2">
                <FileImage className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">
                  Sélectionnez une image de votre véhicule
                </p>
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors">
                    Parcourir des fichiers
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF</p>
              </div>
            </div>

            {/* Afficher l'image sélectionnée */}
            {selectedPrevewise && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image sélectionnée
                </p>
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src={selectedPrevewise.preview}
                    alt="Vehicle image"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions du formulaire */}
          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <Button
              onClick={onClose}
              type="button"
              variant="outline"
              className="text-gray-600 bg-gray-100 border-gray-300 hover:bg-gray-200"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

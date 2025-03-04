import React from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  Flag,
  MapPin,
  Dice1 as License,
  Clock,
  Languages,
  User,
  UserCircle,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createDriverProfile } from "../store/features/driver/driverSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface DriverProfile {
  gender: string;
  birthdate: string;
  nationality: string;
  address: string;
  licenseNumber: string;
  licenseExpirationDate: string;
  drivingExperience: number;
  status: string;
  preferredLanguages: string[];
  profile: string;
}

function CreateDiriverProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverProfile>();
  const { isLoading } = useAppSelector((state) => state.driver);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: DriverProfile) => {
    data.profile = profile?._id;

    try {
      await dispatch(createDriverProfile(data)).unwrap();

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Profil créé avec succès!",
        showCancelButton: true,
        confirmButtonText: "Aller à mon profil",
        cancelButtonText: "Retour à l'accueil",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/driver");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/home");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite lors de la création du profil.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Créer votre profil de chauffeur
          </h1>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register("gender", {
                        required: "Le genre est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      {...register("birthdate", {
                        required: "La date de naissance est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.birthdate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.birthdate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationalité
                </label>
                <div className="relative">
                  <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register("nationality", {
                      required: "La nationalité est obligatoire",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Française"
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    {...register("address", {
                      required: "L'adresse est obligatoire",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    rows={2}
                    placeholder="123 Rue Exemple, Paris, France"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de permis
                  </label>
                  <div className="relative">
                    <License className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("licenseNumber", {
                        required: "Le numéro de permis est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="AD123456789"
                    />
                    {errors.licenseNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.licenseNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'expiration du permis
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      {...register("licenseExpirationDate", {
                        required: "La date d'expiration est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                    {errors.licenseExpirationDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.licenseExpirationDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expérience de conduite (années)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      {...register("drivingExperience", {
                        required: "L'expérience est obligatoire",
                        min: {
                          value: 0,
                          message: "L'expérience ne peut pas être négative",
                        },
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="5"
                    />
                    {errors.drivingExperience && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.drivingExperience.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      {...register("status", {
                        required: "Le statut est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Disponible">Disponible</option>
                      <option value="Occupé">Occupé</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langues préférées
                </label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    multiple
                    {...register("preferredLanguages", {
                      required: "Au moins une langue est obligatoire",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Français">Français</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Espagnol">Espagnol</option>
                    <option value="Arabe">Arabe</option>
                  </select>
                  {errors.preferredLanguages && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferredLanguages.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Maintenez Ctrl (Cmd sur Mac) pour sélectionner plusieurs
                    langues
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Créer le profil
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDiriverProfile;

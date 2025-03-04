import React from "react";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Info,
  Car,
  Users2,
  Crown,
  Loader2,
} from "lucide-react";
import { Button } from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../store/features/booking/bookingSlice";
import Swal from "sweetalert2";

type TripType = "private" | "shared" | "premium";

interface BookingFormData {
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  tripType: TripType;
  notes?: string;
  priceFrom: number;
  priceTo: number;
  profileId: string;
}

export function BookingForm() {
  const { isLoading, id } = useAppSelector((state) => state.profile);
  const { isLogin } = useAppSelector((state) => state.auth);
  console.log(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<BookingFormData>({
    defaultValues: {
      tripType: "private",
      passengers: 1,
      from: "",
      to: "",
      date: "",
      time: "",
      notes: "",
      priceFrom: 0,
      priceTo: 0,
      profileId: id,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    if (isLogin) {
      if (!id) {
        await Swal.fire({
          icon: "warning",
          title: "Aucun profil trouvé",
          text: "Vous devez créer un profil avant de réserver un trajet.",
          confirmButtonColor: "#059669",
        });
        navigate("/create/profile");
        return;
      }
    }
    try {
      // Show loading state
      Swal.fire({
        title: "Création de la réservation...",
        html: "Veuillez patienter",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Dispatch the action
      console.log(data);
      await dispatch(createBooking(data)).unwrap();

      // Show success message
      await Swal.fire({
        icon: "success",
        title: "Réservation créée!",
        text: "Votre demande de trajet a été publiée avec succès.",
        confirmButtonColor: "#059669",
      });

      // Reset form and navigate
      reset();
      navigate("/bookings");
    } catch (error: any) {
      // Show error message
      console.log(error);

      // Check if the error is related to JWT authentication
      if (error?.message === "jwt malformed" && error?.statusCode === 401) {
        await Swal.fire({
          icon: "error",
          title: "Erreur d'authentification",
          text: "Vous devez vous connecter pour créer une réservation.",
          showCancelButton: true,
          confirmButtonText: "Se connecter",
          cancelButtonText: "Annuler",
          confirmButtonColor: "#059669",
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to login page if user confirms
            navigate("/login");
          }
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue lors de la création de la réservation.",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const renderError = (error?: { message?: string }) => {
    if (error?.message) {
      return (
        <p className="text-sm text-red-500 mt-1 animate-fadeIn">
          {error.message}
        </p>
      );
    }
    return null;
  };

  const tripTypes = [
    {
      id: "private",
      icon: Car,
      title: "Privé",
      description: "Voiture individuelle",
    },
    {
      id: "shared",
      icon: Users2,
      title: "Partagé",
      description: "Prix réduit",
    },
    {
      id: "premium",
      icon: Crown,
      title: "Premium",
      description: "Service luxe",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-8 transition-all duration-300 hover:shadow-xl"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Détails du Trajet
          </h2>
          <p className="text-gray-500">
            Remplissez les informations pour votre trajet
          </p>
        </div>

        <div className="space-y-8">
          {/* Type de trajet */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Type de trajet
            </label>
            <Controller
              name="tripType"
              control={control}
              rules={{ required: "Le type de trajet est requis" }}
              render={({ field }) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tripTypes.map(({ id, icon: Icon, title, description }) => (
                    <button
                      key={id}
                      type="button"
                      className={`group p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                        field.value === id
                          ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600 ring-opacity-50"
                          : "border-gray-200 hover:border-emerald-600/50 hover:bg-emerald-50/50"
                      }`}
                      onClick={() => field.onChange(id)}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <Icon
                          className={`w-6 h-6 ${
                            field.value === id
                              ? "text-emerald-600"
                              : "text-gray-400 group-hover:text-emerald-600"
                          } transition-colors`}
                        />
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            />
            {renderError(errors.tripType)}
          </div>

          {/* Lieu de départ et d'arrivée */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu de départ
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
                <Controller
                  name="from"
                  control={control}
                  rules={{ required: "Le lieu de départ est requis" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                      placeholder="Adresse de départ"
                    />
                  )}
                />
              </div>
              {renderError(errors.from)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
                <Controller
                  name="to"
                  control={control}
                  rules={{ required: "La destination est requise" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                      placeholder="Adresse de destination"
                    />
                  )}
                />
              </div>
              {renderError(errors.to)}
            </div>
          </div>

          {/* Date et heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "La date du trajet est requise" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                    />
                  )}
                />
              </div>
              {renderError(errors.date)}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure
              </label>
              <div className="relative group">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: "L'heure du trajet est requise" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="time"
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                    />
                  )}
                />
              </div>
              {renderError(errors.time)}
            </div>
          </div>

          {/* Nombre de passagers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de passagers
            </label>
            <div className="relative group">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
              <Controller
                name="passengers"
                control={control}
                rules={{
                  required: "Le nombre de passagers est requis",
                  min: {
                    value: 1,
                    message: "Il doit y avoir au moins un passager",
                  },
                  max: {
                    value: 4,
                    message: "Le nombre maximum de passagers est de 4",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    min="1"
                    max="4"
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                  />
                )}
              />
            </div>
            {renderError(errors.passengers)}
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix de la course
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  €
                </span>
                <Controller
                  name="priceFrom"
                  control={control}
                  rules={{
                    required: "Le prix minimum est requis",
                    min: { value: 0, message: "Le prix doit être positif" },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                      placeholder="Prix minimum"
                    />
                  )}
                />
              </div>
              <div className="relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  €
                </span>
                <Controller
                  name="priceTo"
                  control={control}
                  rules={{
                    required: "Le prix maximum est requis",
                    min: { value: 0, message: "Le prix doit être positif" },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                      placeholder="Prix maximum"
                    />
                  )}
                />
              </div>
            </div>
            {renderError(errors.priceFrom)}
            {renderError(errors.priceTo)}
          </div>

          {/* Notes supplémentaires */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes supplémentaires
            </label>
            <div className="relative group">
              <Info className="absolute left-3 top-3 text-gray-400 w-5 h-5 group-focus-within:text-emerald-600 transition-colors" />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-600/50 focus:border-emerald-600 transition-all"
                    rows={3}
                    placeholder="Instructions spéciales, bagages, etc."
                  />
                )}
              />
            </div>
            {renderError(errors.notes)}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting || isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>Traitement en cours...</span>
              </>
            ) : (
              <span>Publier la demande de trajet</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;

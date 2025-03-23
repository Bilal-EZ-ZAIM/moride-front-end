import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  FileText,
  Facebook,
  Linkedin,
  MessageSquare,
  Globe,
  User,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createProfile } from "../store/features/profile/profileSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const { isLoading, errorPhone } = useAppSelector((state) => state.profile);
  console.log(errorPhone);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const filteredData: any = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "")
    );
    
    Swal.fire({
      title: "Loading...",
      text: "Creating your profile, please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res:any = await dispatch(createProfile(filteredData));


    if (res.type === "profile/createProfile/fulfilled") {
      Swal.close();
      Swal.fire("Success", "Profile created successfully!", "success").then(
        () => {
          Swal.fire({
            title: "Votre profil a été créé!",
            text: "Souhaitez-vous revenir à la page d'accueil ou rester sur votre profil ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Aller à la page d'accueil",
            cancelButtonText: "Rester sur le profil",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            } else {
              navigate("/profile");
            }
          });
        }
      );
    } else if (res.error) {
      Swal.close();
      Swal.fire({
        title: "Erreur",
        text: res.error.message || "Une erreur est survenue",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Créer votre profil
          </h1>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 pt-4 space-y-6"
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("firstname", {
                        required: "Le prénom est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Votre prénom"
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      {...register("lastname", {
                        required: "Le nom est obligatoire",
                      })}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Votre nom"
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    {...register("address", {
                      required: "L'adresse est obligatoire",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="123 Rue Exemple, Casablanca, Maroc"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Le téléphone est obligatoire",
                      pattern: {
                        value: /^\+212[0-9]{9}$/,
                        message: "Le numéro de téléphone doit être valide",
                      },
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="+212612345678"
                  />
                </div>
                {errorPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    Ce numéro de téléphone est déjà utilisé. Veuillez en choisir
                    un autre.
                  </p>
                )}
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  À propos de vous
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    {...register("profileHighlight", {
                      required: "Ce champ est obligatoire",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    rows={4}
                    placeholder="Parlez-nous de vous..."
                  />
                  {errors.profileHighlight && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.profileHighlight.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      {...register("facebook")}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://facebook.com/profile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      {...register("linkedIn")}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://linkedin.com/in/profile"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      {...register("whatsapp")}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="+212612345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      {...register("portfolio")}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="https://monportfolio.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" type="button">
                  Annuler
                </Button>

                <Button type="submit">Créer le profil</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;

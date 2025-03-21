import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, KeyRound } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  forgetPassword,
  resetPassword,
} from "../store/features/auth/authSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { isLoading, msgErrUpPwd, step } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (step === "email") {
      dispatch(forgetPassword({ email: data.email }));
    } else if (step === "code") {
      const newdata = {
        code: data.code,
        newPassword: data.password,
      };

      const resultAction = await dispatch(resetPassword(newdata));
      if (resetPassword.fulfilled.match(resultAction)) {
        Swal.fire({
          title: "Succès!",
          text: "Votre mot de passe a été réinitialisé avec succès.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    }
  };

  const password = watch("password");

  return (
    <AuthLayout
      title="Réinitialiser le mot de passe"
      subtitle={
        step === "email"
          ? "Entrez votre email pour réinitialiser votre mot de passe"
          : "Entrez le code reçu par email et votre nouveau mot de passe"
      }
    >
      {msgErrUpPwd && (
        <div className="relative bg-red-50 border border-red-300 text-red-700 text-xs p-2 rounded-xl mb-4 shadow-md transition-opacity duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01"
              />
            </svg>
            <span>{msgErrUpPwd}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Adresse email invalide",
                },
              })}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              placeholder="exemple@email.com"
              disabled={step !== "email"}
            />
          </div>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
        {step === "code" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code de vérification
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  {...register("code", {
                    required: "Le code est requis",
                    minLength: {
                      value: 6,
                      message: "Le code doit comporter 6 chiffres",
                    },
                    maxLength: {
                      value: 6,
                      message: "Le code doit comporter 6 chiffres",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Entrez le code à 6 chiffres"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Un code a été envoyé à {watch("email")}
              </p>
            </div>
            {errors.code && (
              <p className="text-sm text-red-500 mt-1">{errors.code.message}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  {...register("password", {
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit contenir au moins 8 caractères",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial.",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "La confirmation est requise",
                    validate: (value) =>
                      value === password ||
                      "Les mots de passe ne correspondent pas",
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Chargement..."
            : step === "email"
            ? "Envoyer le code"
            : "Réinitialiser le mot de passe"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          <a href="/login" className="text-emerald-600 hover:text-emerald-500">
            Retour à la connexion
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}

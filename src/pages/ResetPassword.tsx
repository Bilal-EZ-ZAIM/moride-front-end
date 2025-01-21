import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock, KeyRound } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { forgetPassword } from "../store/features/auth/authSlice";

type FormValues = {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export function ResetPassword() {
  // const [step, setStep] = useState<"email" | "code" | "password">("email");
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (step === "email") {
      dispatch(forgetPassword(data));
    } else if (step === "code") {
      // Verify code
      console.log("Code:", data.code);
      dispatch(forgetPassword(data));
    } else {
      // Reset password
      console.log("Password:", data.password);
      console.log("Confirm Password:", data.confirmPassword);
    }
  };

  const password = watch("password");

  return (
    <AuthLayout
      title="Réinitialiser le mot de passe"
      subtitle={
        step === "email"
          ? "Entrez votre email pour réinitialiser votre mot de passe"
          : step === "code"
          ? "Entrez le code reçu par email"
          : "Créez votre nouveau mot de passe"
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
        {step === "email" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register("email", {
                  required: "L’email est requis",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Adresse email invalide",
                  },
                })}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="exemple@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {step === "code" && (
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
              {errors.code && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.code.message}
                </p>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Un code a été envoyé à {watch("email")}
            </p>
          </div>
        )}

        {step === "password" && (
          <>
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
                  })}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
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
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          {step === "email"
            ? "Envoyer le code"
            : step === "code"
            ? "Vérifier le code"
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

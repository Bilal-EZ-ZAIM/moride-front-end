import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { SocialAuth } from "../components/auth/SocialAuth";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { LoginIntrface } from "../interface/loginInterface";
import { login, loginByGoogle } from "../store/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { isLoading, errorLogin } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginIntrface>();

  const onSubmit = async (data: LoginIntrface) => {
    try {
      const result = await dispatch(login(data));
      console.log(result.type);

      if (result.type === "auth/login/fulfilled") {
        console.log(result.payload.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Bienvenue ! Connectez-vous pour continuer"
    >
      <SocialAuth  />

      {errorLogin && (
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
            <span>{errorLogin}</span>
          </div>
        </div>
      )}

      <form className="space-y-6"  data-cy="form-login" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="text"
              {...register("email", {
                required: "L’email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email invalide",
                },
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
              placeholder="exemple@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Se souvenir de moi
            </label>
          </div>

          <Link
            to="/reset-password"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Se connecter"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?
          <Link
            to="/register"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            S'inscrire
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;

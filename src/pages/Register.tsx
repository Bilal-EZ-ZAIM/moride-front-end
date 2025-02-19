import { User, Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { SocialAuth } from "../components/auth/SocialAuth";
import { Button } from "../components/common/Button";
import { useForm } from "react-hook-form";
import { registers, isLogins } from "../store/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RegisterIntrface } from "../interface/registerInterface";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterIntrface>();

  const { isLoading, errorRegister } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterIntrface) => {
    console.log(data);

    const result = await dispatch(registers(data));

    if (result.type === "auth/register/fulfilled") {
      console.log(result.payload.message);
      navigate("/login");
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Rejoignez-nous pour une meilleure expérience de transport"
    >
      <SocialAuth />

      {errorRegister && (
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
            <span>{errorRegister}</span>
          </div>
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom complet
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="John Doe"
              {...register("username", { required: "Le nom est requis" })}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="exemple@email.com"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email invalide",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              {...register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 6,
                  message:
                    "Le mot de passe doit comporter au moins 6 caractères",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirm-password"
              type="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "La confirmation du mot de passe est requise",
                validate: (value) =>
                  value === watch("password") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p
              data-cy="error-confirm-password"
              className="text-red-500 text-xs mt-1"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

    

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Créer un compte"}
        </Button>

        <p className="text-center text-sm text-gray-600">
          Déjà inscrit ?
          <Link
            to="/login"
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updatePassword } from "../store/features/auth/authSlice";

export function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const { isLoading, msgErrUpPwd } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    console.log("Password changed:", data);
    const res = await dispatch(updatePassword(data));
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 mt-14">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">
              Changer le mot de passe
            </h1>

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
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Entrez votre mot de passe actuel"
                    {...register("currentPassword", {
                      required: "Mot de passe actuel requis",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.currentPassword.message as string}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Entrez un nouveau mot de passe"
                    {...register("newPassword", {
                      required: "Nouveau mot de passe requis",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message as string}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Confirmez le nouveau mot de passe"
                    {...register("confirmPassword", {
                      required: "Confirmation requise",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Les mots de passe ne correspondent pas",
                    })}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                Changer le mot de passe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

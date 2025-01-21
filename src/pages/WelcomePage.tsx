import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { isLogins } from "../store/features/auth/authSlice";

const WelcomePage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl) {
      localStorage.removeItem("token");

      localStorage.setItem("token", tokenFromUrl);

      setToken(tokenFromUrl);
    }
  }, []);

  const handleNavigateHome = () => {
    dispatch(isLogins(token));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Bienvenue sur le site Moride
        </h2>

        <div className="mt-4 text-center text-gray-600">
          <p>Votre token a été stocké en toute sécurité.</p>
        </div>

        <div className="mt-6">
          <Button onClick={handleNavigateHome} className="w-full">
            Aller à la page d'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

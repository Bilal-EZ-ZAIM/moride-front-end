import React from "react";
import { Mail, Phone, MapPin, Car } from "lucide-react";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { changeRoleTodriver } from "../../store/features/driver/driverSlice";
import Swal from "sweetalert2";

interface UserInfoProps {
  onBecomeDriver: () => void;
  info: any;
}

export function UserInfo({ onBecomeDriver, info }: UserInfoProps) {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBecomeDriver = () => {
    Swal.fire({
      title: "Confirmation du changement",
      text: "Êtes-vous sûr de vouloir devenir chauffeur ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Oui, confirmer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeRoleTodriver());
        Swal.fire("Succès !", "Vous êtes maintenant un chauffeur.", "success");
        navigate("/create/driver");
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Informations Personnelles
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-emerald-600 hover:text-white hover:bg-emerald-600 border-emerald-600"
          onClick={handleBecomeDriver}
        >
          <Car className="w-4 h-4" />
          Devenir Chauffeur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium text-gray-800">{info?.email} </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-500">Téléphone</div>
            <div className="font-medium text-gray-800">{info?.phone}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-sm text-gray-500">Localisation</div>
            <div className="font-medium text-gray-800">{info?.address} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

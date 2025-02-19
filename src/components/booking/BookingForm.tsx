import React, { useState } from "react";
import { MapPin, Users, Calendar, Clock, Info } from "lucide-react";
import { Button } from "../common/Button";

type TripType = "private" | "shared" | "premium";

export function BookingForm() {
  const [tripType, setTripType] = useState<TripType>("private");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: 1,
    notes: "",
    priceFrom: "", // المبلغ من
    priceTo: "", // المبلغ إلى
  });

  const handlePriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, priceFrom: e.target.value });
  };

  const handlePriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, priceTo: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Détails du Trajet</h2>

      <div className="space-y-6">
        {/* Type de trajet */}
        <div className="grid grid-cols-3 gap-4">
          <button
            className={`p-4 rounded-lg border-2 text-center ${
              tripType === "private"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200"
            }`}
            onClick={() => setTripType("private")}
          >
            <h3 className="font-semibold mb-1">Privé</h3>
            <p className="text-sm text-gray-600">Voiture individuelle</p>
          </button>
          <button
            className={`p-4 rounded-lg border-2 text-center ${
              tripType === "shared"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200"
            }`}
            onClick={() => setTripType("shared")}
          >
            <h3 className="font-semibold mb-1">Partagé</h3>
            <p className="text-sm text-gray-600">Prix réduit</p>
          </button>
          <button
            className={`p-4 rounded-lg border-2 text-center ${
              tripType === "premium"
                ? "border-emerald-600 bg-emerald-50"
                : "border-gray-200"
            }`}
            onClick={() => setTripType("premium")}
          >
            <h3 className="font-semibold mb-1">Premium</h3>
            <p className="text-sm text-gray-600">Service luxe</p>
          </button>
        </div>

        {/* Lieu de départ et d'arrivée */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lieu de départ
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Adresse de départ"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Adresse de destination"
              />
            </div>
          </div>
        </div>

        {/* Date et heure */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heure
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Nombre de passagers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de passagers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="1"
              max="4"
              value={formData.passengers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passengers: parseInt(e.target.value),
                })
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Prix */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prix de la course
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={formData.priceFrom}
                onChange={handlePriceFromChange}
                className="w-full py-2 border rounded-lg pl-2"
                placeholder="Prix minimum"
              />
              <input
                type="number"
                value={formData.priceTo}
                onChange={handlePriceToChange}
                className="w-full py-2 border rounded-lg pl-2"
                placeholder="Prix maximum"
              />
            </div>
          </div>
        </div>

        {/* Notes supplémentaires */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes supplémentaires
          </label>
          <div className="relative">
            <Info className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              rows={3}
              placeholder="Instructions spéciales, bagages, etc."
            />
          </div>
        </div>

        <Button className="w-full">Publier la demande de trajet</Button>
      </div>
    </div>
  );
}

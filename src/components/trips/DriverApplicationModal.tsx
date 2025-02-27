import React, { useState } from "react";
import { X, Clock, DollarSign, MessageSquare, Calendar } from "lucide-react";
import { Button } from "../common/Button";

interface DriverApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    price: number;
    date: string;
    time: string;
    message: string;
  }) => void;
}

export function DriverApplicationModal({
  isOpen,
  onClose,
  onSubmit,
}: DriverApplicationModalProps) {
  const [formData, setFormData] = useState({
    price: "",
    date: "",
    time: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.price ||
      !formData.date ||
      !formData.time ||
      !formData.message
    ) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("La date ne peut pas être dans le passé !");
      return;
    }

    onSubmit({
      price: Number(formData.price),
      date: formData.date,
      time: formData.time,
      message: formData.message,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Proposer une offre</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prix proposé (MAD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-emerald-500"
                placeholder="Entrez votre prix"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date du trajet
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Heure */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Heure de départ proposée
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message au client
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:ring-emerald-500"
                rows={3}
                placeholder="Présentez-vous et donnez des détails..."
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm"
            >
              Annuler
            </Button>
            <Button type="submit" className="px-4 py-1 text-sm">
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '../common/Button';

interface CreateVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function CreateVehicleModal({ isOpen, onClose, onSave }: CreateVehicleModalProps) {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    type: 'sedan',
    color: '',
    plateNumber: '',
    insurance: '',
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files].slice(0, 5));
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.model) newErrors.model = 'Le modèle du véhicule est requis';
    if (!formData.year) newErrors.year = "L'année est requise";
    if (!formData.plateNumber) newErrors.plateNumber = "La plaque d'immatriculation est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 sticky top-0 bg-white">
          <h2 className="text-2xl font-semibold">Ajouter un nouveau véhicule</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              onSave({ ...formData, images: selectedFiles });
            }
          }}
          className="space-y-6 mt-6"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
              { label: "Modèle du véhicule", type: "text", name: "model", placeholder: "Mercedes Classe E" },
              { label: "Année", type: "number", name: "year", placeholder: "2024" },
              { label: "Couleur", type: "text", name: "color", placeholder: "Noir" },
              { label: "Plaque d'immatriculation", type: "text", name: "plateNumber", placeholder: "AB-123-CD" },
            ].map(({ label, type, name, placeholder }) => (
              <div key={name} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  value={formData[name as keyof typeof formData]}
                  onChange={(e) => {
                    setFormData({ ...formData, [name]: e.target.value });
                    setErrors({ ...errors, [name]: '' });
                  }}
                  className={`w-full p-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                    errors[name as keyof typeof formData] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={placeholder}
                />
                {errors[name as keyof typeof formData] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name as keyof typeof formData]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de véhicule</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 border-gray-300"
              >
                <option value="sedan">Berline</option>
                <option value="suv">SUV</option>
                <option value="van">Monospace</option>
                <option value="luxury">Véhicule de luxe</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration de l'assurance</label>
              <input
                type="date"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 border-gray-300"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos du véhicule</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
              }`}
            >
              <Upload className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
              <p className="text-sm text-gray-600 mb-2">Glissez et déposez vos photos ici ou</p>
              <label className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors">
                Parcourir les fichiers
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setSelectedFiles(prev => [...prev, ...files].slice(0, 5));
                  }}
                />
              </label>
              {selectedFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Aperçu ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Vous pouvez télécharger jusqu'à 5 photos. Formats acceptés : JPG, PNG</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Enregistrer le véhicule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVehicleModal;

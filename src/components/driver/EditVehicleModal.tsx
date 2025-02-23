import React, { useState, useCallback, useEffect } from 'react';
import { X, Car, Calendar, Settings, Upload, Clock, Hash, Palette } from 'lucide-react';
import { Button } from '../common/Button';

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    model: string;
    year: string;
    type: string;
    color: string;
    plateNumber: string;
    insurance: string;
    images: File[];
  }) => void;
  vehicleData?: {
    model: string;
    year: string;
    type: string;
    color: string;
    plateNumber: string;
    insurance: string;
    images: File[];
  };
}

export function EditVehicleModal({ isOpen, onClose, onSave, vehicleData }: EditVehicleModalProps) {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    type: 'sedan',
    color: '',
    plateNumber: '',
    insurance: '',
    images: [] as File[],
  });

  const [errors, setErrors] = useState<{
    model?: string;
    year?: string;
    plateNumber?: string;
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (vehicleData) {
      setFormData({
        model: vehicleData.model || '',
        year: vehicleData.year || '',
        type: vehicleData.type || 'sedan',
        color: vehicleData.color || '',
        plateNumber: vehicleData.plateNumber || '',
        insurance: vehicleData.insurance || '',
        images: vehicleData.images || [],
      });
      setSelectedFiles(vehicleData.images || []);
    }
  }, [vehicleData]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
    }
  }, []);

  const validateForm = () => {
    const newErrors: { model?: string; year?: string; plateNumber?: string } = {};
    if (!formData.model) newErrors.model = 'Le modèle du véhicule est requis';
    if (!formData.year) newErrors.year = "L'année est requise";
    if (!formData.plateNumber) newErrors.plateNumber = "La plaque d'immatriculation est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await onSave({ ...formData, images: selectedFiles });
        onClose();
      } catch (error) {
        console.error('Error saving vehicle:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-semibold">Modifier le véhicule</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Modèle du véhicule
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => {
                    setFormData({ ...formData, model: e.target.value });
                    setErrors({ ...errors, model: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                    errors.model ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Mercedes-Benz Classe E"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">{errors.model}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Année
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => {
                    setFormData({ ...formData, year: e.target.value });
                    setErrors({ ...errors, year: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                    errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="2024"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">{errors.year}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Type de véhicule
              </label>
              <div className="relative">
                <Settings className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-emerald-500 border-gray-300"
                >
                  <option value="sedan">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="van">Monospace</option>
                  <option value="luxury">Véhicule de luxe</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Couleur
              </label>
              <div className="relative">
                <Palette className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 border-gray-300"
                  placeholder="Noir"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Plaque d'immatriculation
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.plateNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, plateNumber: e.target.value });
                    setErrors({ ...errors, plateNumber: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all focus:ring-2 focus:ring-emerald-500 ${
                    errors.plateNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="ABC-123"
                />
                {errors.plateNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.plateNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Assurance
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.insurance}
                  onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 border-gray-300"
                  placeholder="Assurance X"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div
            className={`border-dashed border-2 p-6 rounded-lg ${
              isDragging ? 'border-emerald-600 bg-gray-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex justify-center items-center text-center space-x-2">
              <Upload className="w-6 h-6 text-gray-600" />
              <p className="text-sm text-gray-600">
                Faites glisser et déposez vos images ici ou cliquez pour sélectionner.
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 0) {
                  setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
                }
              }}
              className="hidden"
            />
            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                      onClick={() => {
                        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              variant="outline"
              className="text-gray-600 bg-gray-100 border-gray-300 hover:bg-gray-200"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

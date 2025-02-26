import React, { useState, useCallback } from 'react';
import { X, Loader2, ImageIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createCar } from '../../store/features/car/carSlice';
import Swal from 'sweetalert2';

interface CreateVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateVehicleModal({ isOpen, onClose }: CreateVehicleModalProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.car);
  
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    transmission: 'Automatique',
    license: '',
    insurance: '',
    lastMaintenance: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez sélectionner une image valide',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.model) newErrors.model = 'Le modèle du véhicule est requis';
    if (!formData.year) newErrors.year = "L'année est requise";
    if (!formData.license) newErrors.license = "La plaque d'immatriculation est requise";
    if (!formData.insurance) newErrors.insurance = "La date d'assurance est requise";
    if (!selectedImage) newErrors.image = "Une photo du véhicule est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(createCar({
          ...formData,
          image: selectedImage
        })).unwrap();
        
        Swal.fire({
          title: 'Succès!',
          text: 'Le véhicule a été ajouté avec succès!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        onClose();
        // Reset form
        setFormData({
          model: '',
          year: '',
          transmission: 'Automatique',
          license: '',
          insurance: '',
          lastMaintenance: '',
        });
        setSelectedImage(null);
        setImagePreview(null);
      } catch (error) {
        console.error('Failed to create car:', error);
        Swal.fire({
          title: 'Erreur!',
          text: "L'ajout du véhicule a échoué.",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold">Ajouter un nouveau véhicule</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Modèle</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Mercedes-Benz Classe E"
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Année</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="2022"
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Transmission</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Automatique">Automatique</option>
                <option value="Manuelle">Manuelle</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Plaque d'immatriculation</label>
              <input
                type="text"
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="XX-123-YY"
              />
              {errors.license && <p className="text-red-500 text-sm">{errors.license}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Date d'assurance</label>
              <input
                type="date"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              {errors.insurance && <p className="text-red-500 text-sm">{errors.insurance}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Dernière maintenance</label>
              <input
                type="date"
                value={formData.lastMaintenance}
                onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Single Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo du véhicule</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'
              }`}
            >
              {!imagePreview ? (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
                  <p className="text-sm text-gray-600 mb-2">
                    Glissez et déposez une photo ici ou
                  </p>
                  <label className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 transition-colors">
                    Sélectionner une photo
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Aperçu du véhicule"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Enregistrement...
                </>
              ) : (
                'Enregistrer le véhicule'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateVehicleModal;
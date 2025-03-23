import React, { useState } from 'react';
import { X, Camera, Upload } from 'lucide-react';
import { Button } from '../common/Button';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverData: any;
}

export function EditProfileModal({ isOpen, onClose, driverData }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    firstname: driverData.profile.firstname,
    lastname: driverData.profile.lastname,
    gender: driverData.gender,
    birthdate: driverData.birthdate.split('T')[0],
    nationality: driverData.nationality,
    address: driverData.address,
    phone: driverData.profile.phone,
    licenseNumber: driverData.licenseNumber,
    licenseExpirationDate: driverData.licenseExpirationDate.split('T')[0],
    drivingExperience: driverData.drivingExperience,
    preferredLanguages: driverData.preferredLanguages,
    profileHighlight: driverData.profile.profileHighlight,
    facebook: driverData.profile.facebook,
    linkedIn: driverData.profile.linkedIn,
    whatsapp: driverData.profile.whatsapp,
    portfolio: driverData.profile.portfolio,
  });

  const [profileImage, setProfileImage] = useState(driverData.profile.imageProfile.url);
  const [bannerImage, setBannerImage] = useState(driverData.profile.imageBanner.url);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Modifier le profil</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image de couverture
              </label>
              <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                <label className="absolute bottom-4 right-4 p-2 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setBannerImage(url);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo de profil
              </label>
              <div className="relative inline-block">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full cursor-pointer hover:bg-emerald-600">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setProfileImage(url);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationalité
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de permis
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration du permis
                </label>
                <input
                  type="date"
                  value={formData.licenseExpirationDate}
                  onChange={(e) => setFormData({ ...formData, licenseExpirationDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langues parlées
              </label>
              <div className="flex flex-wrap gap-2">
                {['Français', 'Anglais', 'Arabe', 'Espagnol'].map((lang) => (
                  <label key={lang} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferredLanguages.includes(lang)}
                      onChange={(e) => {
                        const languages = e.target.checked
                          ? [...formData.preferredLanguages, lang]
                          : formData.preferredLanguages.filter((l:any) => l !== lang);
                        setFormData({ ...formData, preferredLanguages: languages });
                      }}
                      className="rounded text-emerald-600"
                    />
                    <span className="ml-2">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                À propos de moi
              </label>
              <textarea
                value={formData.profileHighlight}
                onChange={(e) => setFormData({ ...formData, profileHighlight: e.target.value })}
                className="w-full p-2 border rounded-lg"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="url"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 sticky bottom-0">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={() => {
              // Handle save
              onClose();
            }}>
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
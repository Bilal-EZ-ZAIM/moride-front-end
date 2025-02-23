import React, { useState } from 'react';
import { Phone, MapPin, Facebook, Linkedin, Globe } from 'lucide-react';
import { Button } from '../common/Button';
import { useForm, Controller } from 'react-hook-form';

interface ContactSectionProps {
  phone: string;
  address: string;
  social: {
    facebook: string;
    linkedin: string;
    whatsapp: string;
    portfolio: string;
  };
}

export function ContactSection({ phone, address, social }: ContactSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [updatedPhone, setUpdatedPhone] = useState(phone);
  const [updatedAddress, setUpdatedAddress] = useState(address);
  const [updatedSocial, setUpdatedSocial] = useState(social);

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      phone: updatedPhone,
      address: updatedAddress,
      social: updatedSocial,
    },
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenSocialModal = () => setIsSocialModalOpen(true);
  const handleCloseSocialModal = () => setIsSocialModalOpen(false);

  const handleSave = (data: any) => {
    setUpdatedPhone(data.phone);
    setUpdatedAddress(data.address);
    setIsModalOpen(false);
  };

  const handleSocialSave = (data: any) => {
    setUpdatedSocial(data.social);
    setIsSocialModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact</h2>

      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-emerald-100 p-2 rounded-full">
            <Phone className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Téléphone</div>
            <div className="font-semibold text-gray-800">{updatedPhone}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-emerald-100 p-2 rounded-full">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Adresse</div>
            <div className="font-semibold text-gray-800">{updatedAddress}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <a
          href={updatedSocial.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
        >
          <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
            <Facebook className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-gray-700 group-hover:text-gray-900">Facebook</span>
        </a>

        <a
          href={updatedSocial.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
        >
          <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
            <Linkedin className="w-5 h-5 text-blue-700" />
          </div>
          <span className="text-gray-700 group-hover:text-gray-900">LinkedIn</span>
        </a>

        <a
          href={updatedSocial.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
        >
          <div className="bg-emerald-100 p-2 rounded-full group-hover:bg-emerald-200 transition-colors">
            <Globe className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-gray-700 group-hover:text-gray-900">Portfolio</span>
        </a>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleOpenModal}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Mettre à jour téléphone et adresse
        </Button>
        <Button
          onClick={handleOpenSocialModal}
          variant="secondary"
          className="w-full"
        >
          Mettre à jour réseaux sociaux
        </Button>
      </div>

      {/* Modal for Phone and Address */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Mettre à jour les informations</h3>
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: 'Le téléphone est requis',
                    pattern: {
                      value: /^\+212\s?[67]\d{8}$/,
                      message: 'Format invalide. Exemple: +212 612345678'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+212 612345678"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <Controller
                  control={control}
                  name="address"
                  rules={{ required: 'L\'adresse est requise' }}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  Sauvegarder
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Social Media */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Mettre à jour les réseaux sociaux</h3>
            <form onSubmit={handleSubmit(handleSocialSave)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <Controller
                  control={control}
                  name="social.facebook"
                  rules={{
                    pattern: {
                      value: /^https?:\/\/(www\.)?facebook\.com/,
                      message: 'URL Facebook invalide'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="url"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="https://facebook.com/profile"
                    />
                  )}
                />
                {errors.social?.facebook && (
                  <p className="text-red-500 text-sm mt-1">{errors.social.facebook.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <Controller
                  control={control}
                  name="social.linkedin"
                  rules={{
                    pattern: {
                      value: /^https?:\/\/(www\.)?linkedin\.com/,
                      message: 'URL LinkedIn invalide'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="url"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="https://linkedin.com/in/profile"
                    />
                  )}
                />
                {errors.social?.linkedin && (
                  <p className="text-red-500 text-sm mt-1">{errors.social.linkedin.message as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <Controller
                  control={control}
                  name="social.portfolio"
                  rules={{
                    pattern: {
                      value: /^https?:\/\//,
                      message: 'URL invalide'
                    }
                  }}
                  render={({ field }) => (
                    <input
                      type="url"
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="https://example.com"
                    />
                  )}
                />
                {errors.social?.portfolio && (
                  <p className="text-red-500 text-sm mt-1">{errors.social.portfolio.message as string}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCloseSocialModal}
                >
                  Annuler
                </Button>
                <Button type="submit">
                  Sauvegarder
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
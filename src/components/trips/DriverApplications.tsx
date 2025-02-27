import React, { useState } from 'react';
import { Star, Clock, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';

export function DriverApplications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const [selectedOffer, setSelectedOffer] = useState(null);

  const applications = [
    {
      id: 1,
      driver: {
        name: "Mohammed Alami",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80",
        rating: 4.9,
        reviews: 245
      },
      price: 450,
      message: "Je serai disponible à 14h00 pour vous offrir un service rapide et professionnel.",
      proposedTime: "14:00",
      status: "pending"
    },
    {
      id: 2,
      driver: {
        name: "Karim Benjelloun",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
        rating: 4.8,
        reviews: 189
      },
      price: 420,
      message: "Je vous propose une prise en charge à 14h15, prêt à partir dès que vous êtes prêts.",
      proposedTime: "14:15",
      status: "pending"
    }
  ];

  // Function to open the modal
  const openModal = (offer:any) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setPriceInput('');
  };

  // Function to handle price input change
  const handlePriceChange = (event:any) => {
    setPriceInput(event.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Propositions des Chauffeurs</h2>
      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={app.driver.image}
                alt={app.driver.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{app.driver.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{app.driver.rating}</span>
                  </div>
                  <span>({app.driver.reviews} avis)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">{app.price} MAD</div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {app.proposedTime}
                </div>
              </div>
            </div>

            {/* Displaying the full message with the MessageCircle icon */}
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
              <MessageCircle className="w-4 h-4 text-gray-600" />
              <p>{app.message}</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Contacter
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => openModal(app)} // Open modal with selected offer
              >
                Accepter l'offre
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Entrez le prix</h3>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm text-gray-600 mb-2">
                Prix proposé
              </label>
              <input
                id="price"
                type="number"
                value={priceInput}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Entrez le prix"
              />
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={closeModal} // Close modal without saving
              >
                Annuler
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => {
                  alert(`Prix proposé: ${priceInput} MAD`); // Handle submitted price
                  closeModal();
                }}
              >
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

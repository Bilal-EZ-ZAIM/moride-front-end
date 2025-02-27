import React from "react";
import { Link } from "react-router-dom";
import { Star, Shield, MessageCircle, Globe, Briefcase } from "lucide-react";
import { Button } from "../common/Button";

interface DriverCardProps {
  driver: {
    _id: string;
    profile: {
      firstname: string;
      lastname: string;
      imageProfile: {
        url: string;
      };
    };
    rating: number;
    drivingExperience: number;
    preferredLanguages: string[];
  };
}

export function DriverCard({ driver }: DriverCardProps) {
  const experienceYears = driver.drivingExperience || 0;

  const experienceLevel =
    experienceYears >= 10
      ? {
          text: "Expert",
          color: "bg-emerald-100 text-emerald-700",
          icon: "⭐️⭐️⭐️",
        }
      : experienceYears >= 5
      ? {
          text: "Intermédiaire",
          color: "bg-yellow-100 text-yellow-700",
          icon: "⭐️⭐️",
        }
      : { text: "Débutant", color: "bg-gray-100 text-gray-700", icon: "⭐️" };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 flex-shrink-0">
          <div className="relative">
            <img
              src={driver.profile.imageProfile.url}
              alt={`${driver.profile.firstname} ${driver.profile.lastname}`}
              className="w-full h-48 md:h-40 rounded-lg object-cover shadow-sm"
            />
            <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md">
              <Shield className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {driver.profile.firstname} {driver.profile.lastname}
              </h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{driver.rating}</span>
                <span className="text-sm">
                  ({driver.drivingExperience} ans d'expérience)
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm sm:text-base sm:px-4 sm:py-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Contacter</span>
              </Button>
              <Link to={`/driver/${driver._id}`}>
                <Button
                  size="sm"
                  className="hover:bg-emerald-700 transition-colors text-sm sm:text-base sm:px-4 sm:py-2"
                >
                  <span className="hidden sm:inline">Voir profil</span>

                  <span className="sm:hidden">Profil</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Expérience</div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-800">
                  {driver.drivingExperience} ans
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${experienceLevel.color}`}
                >
                  {experienceLevel.text} {experienceLevel.icon}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <div className="text-sm text-gray-600">
              Langues: {driver.preferredLanguages.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { DriverCard } from "./DriverCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllDrivers } from "../../store/features/driver/driverSlice";

export function DriversList() {
  const { isLoading, drivers } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();


  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  // Experience options
  const experienceOptions = ["0-1", "1-3", "3-5", "5+"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllDrivers());
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!drivers) return;

    let results = [...drivers];

    if (searchTerm) {
      results = results.filter((driver) =>
        driver?.profile.firstname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by experience
    if (experienceFilter) {
      results = results.filter((driver) => {
        const experience = driver.drivingExperience;
        if (experienceFilter === "0-1") {
          return experience >= 0 && experience <= 1;
        }
        if (experienceFilter === "1-3") {
          return experience > 1 && experience <= 3;
        }
        if (experienceFilter === "3-5") {
          return experience > 3 && experience <= 5;
        }
        if (experienceFilter === "5+") {
          return experience > 5;
        }
        return true;
      });
    }

    setFilteredDrivers(results);
  }, [drivers, searchTerm, experienceFilter]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setExperienceFilter("");
  };

  // Handling loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Chargement des conducteurs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Rechercher et filtrer</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search input */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rechercher
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Nom, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Experience filter */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expérience (années)
            </label>
            <select
              id="experience"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
            >
              <option value="">Toutes les expériences</option>
              {experienceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option} {option.includes("+") ? "ans et plus" : "ans"}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          {filteredDrivers.length} conducteur
          {filteredDrivers.length !== 1 ? "s" : ""} trouvé
          {filteredDrivers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Driver list */}
      <div className="space-y-6">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver, index) => (
            <DriverCard key={index} driver={driver} />
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            Aucun conducteur ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}

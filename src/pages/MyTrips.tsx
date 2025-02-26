import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Eye,
  Pencil,
  Trash2,
  Search,
  Car,
  Shield,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  X,
  DollarSign,
  MessageSquare,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  SortAsc,
} from "lucide-react";
import { Button } from "../components/common/Button";
// Mock data for demonstration
const mockTrips = [
  {
    _id: "67bf4706922656c99a99694c",
    from: "Marrakech",
    to: "Youssoufia",
    date: "2025-03-09",
    time: "08:38",
    passengers: 3,
    tripType: "shared",
    notes: "Voyage confortable avec climatisation. Petits bagages uniquement.",
    userId: "67bf42203078d68a92341ae4",
    profileId: {
      _id: "67bf467f922656c99a99693d",
      firstname: "Mohammed",
      lastname: "Alami",
      imageProfile: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      },
    },
    priceFrom: "200",
    priceTo: "299",
    applicants: [
      { _id: "app1", status: "pending", name: "Sara Khalid" },
      { _id: "app2", status: "approved", name: "Ahmed Hassan" },
      { _id: "app3", status: "pending", name: "Fatima Zahra" },
      { _id: "app4", status: "pending", name: "Youssef Amrani" },
    ],
    createdAt: "2025-02-26T16:53:26.307Z",
    updatedAt: "2025-02-26T16:53:26.307Z",
    status: "active",
  },
  {
    _id: "67bf4706922656c99a996123",
    from: "Casablanca",
    to: "Rabat",
    date: "2025-03-15",
    time: "10:00",
    passengers: 2,
    tripType: "private",
    notes: "Trajet direct sans arrêts.",
    userId: "67bf42203078d68a92341ae4",
    profileId: {
      _id: "67bf467f922656c99a99693d",
      firstname: "Mohammed",
      lastname: "Alami",
      imageProfile: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      },
    },
    priceFrom: "150",
    priceTo: "200",
    applicants: [],
    createdAt: "2025-02-28T10:30:26.307Z",
    updatedAt: "2025-02-28T10:30:26.307Z",
    status: "completed",
  },
  {
    _id: "67bf4706922656c99a996124",
    from: "Agadir",
    to: "Essaouira",
    date: "2025-03-20",
    time: "14:30",
    passengers: 4,
    tripType: "shared",
    notes: "Voyage côtier avec vue sur l'océan. Arrêt possible à Taghazout.",
    userId: "67bf42203078d68a92341ae4",
    profileId: {
      _id: "67bf467f922656c99a99693d",
      firstname: "Mohammed",
      lastname: "Alami",
      imageProfile: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      },
    },
    priceFrom: "250",
    priceTo: "350",
    applicants: [
      { _id: "app5", status: "approved", name: "Karim Benali" },
      { _id: "app6", status: "pending", name: "Leila Tazi" },
    ],
    createdAt: "2025-03-01T09:15:26.307Z",
    updatedAt: "2025-03-01T09:15:26.307Z",
    status: "active",
  },
];

// Badge component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };
  
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function MyTrips() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [trips, setTrips] = useState(mockTrips);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 5;

  // Filter trips based on search term and status
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || trip.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "price") {
      const priceA = parseInt(a.priceFrom);
      const priceB = parseInt(b.priceFrom);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    } else if (sortBy === "passengers") {
      return sortOrder === "asc" 
        ? a.passengers - b.passengers 
        : b.passengers - a.passengers;
    }
    return 0;
  });

  // Pagination
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = sortedTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(sortedTrips.length / tripsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce trajet ?")) {
      setTrips(trips.filter((trip) => trip._id !== id));
    }
  };

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedTrip(null);
  };

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("desc");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success">
            <CheckCircle2 className="w-3 h-3" />
            Actif
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="info">
            <CheckCircle2 className="w-3 h-3" />
            Terminé
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="danger">
            <AlertCircle className="w-3 h-3" />
            Annulé
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with animated gradient border */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 opacity-80 blur-sm"></div>
        <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Trajets</h1>
            <p className="text-gray-600 max-w-2xl">
              Gérez vos trajets créés et suivez les demandes de réservation. Créez de nouveaux trajets et connectez-vous avec des voyageurs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="shadow-sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                Nouveau Trajet
              </Button>
              <Button variant="outline" className="shadow-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        {/* Search and filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par ville de départ ou d'arrivée..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-700 transition-all duration-200"
              >
                <Filter className="w-5 h-5" />
                Filtrer par statut
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-100">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setStatusFilter("all");
                        setIsFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${
                        statusFilter === "all"
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-700"
                      }`}
                    >
                      Tous les trajets
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("active");
                        setIsFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${
                        statusFilter === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-700"
                      }`}
                    >
                      Trajets actifs
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("completed");
                        setIsFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${
                        statusFilter === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-700"
                      }`}
                    >
                      Trajets terminés
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter("cancelled");
                        setIsFilterOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 ${
                        statusFilter === "cancelled"
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-gray-700"
                      }`}
                    >
                      Trajets annulés
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-700 transition-all duration-200"
                onClick={() => handleSortChange("date")}
              >
                <SortAsc className="w-5 h-5" />
                Trier par date
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    sortBy === "date" && sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 text-sm font-medium">Trajets actifs</p>
                <h3 className="text-2xl font-bold text-emerald-900 mt-1">
                  {trips.filter(t => t.status === "active").length}
                </h3>
              </div>
              <div className="bg-emerald-200 p-3 rounded-full">
                <Car className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Demandes reçues</p>
                <h3 className="text-2xl font-bold text-blue-900 mt-1">
                  {trips.reduce((acc, trip) => acc + trip.applicants.length, 0)}
                </h3>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">Revenu potentiel</p>
                <h3 className="text-2xl font-bold text-purple-900 mt-1">
                  {trips.reduce((acc, trip) => acc + (Number(trip.priceFrom) * trip.passengers), 0)} MAD
                </h3>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <Car className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Aucun trajet trouvé
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchTerm
                ? "Aucun trajet ne correspond à votre recherche. Essayez avec d'autres termes."
                : "Vous n'avez pas encore créé de trajets. Créez votre premier trajet pour commencer."}
            </p>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Créer un nouveau trajet
            </Button>
          </div>
        ) : (
          <>
            {/* Trip cards */}
            <div className="grid gap-6">
              {currentTrips.map((trip) => (
                <div
                  key={trip._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Car className="w-6 h-6 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-bold text-gray-900">
                              {trip.from} <ArrowRight className="inline w-4 h-4 mx-1" /> {trip.to}
                            </h3>
                            {getStatusBadge(trip.status)}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 flex-wrap">
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(trip.date)}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {trip.time}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {trip.passengers} passagers
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 bg-white"
                          onClick={() => handleViewDetails(trip)}
                        >
                          <Eye className="w-4 h-4" />
                          Détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-white"
                        >
                          <Pencil className="w-4 h-4" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50 bg-white"
                          onClick={() => handleDelete(trip._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                          Détails du trajet
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Type:</span>
                            <Badge variant={trip.tripType === "shared" ? "info" : "default"}>
                              {trip.tripType === "shared" ? "Trajet partagé" : "Trajet privé"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Départ:</span>
                            <span className="text-sm font-medium">{trip.from}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Destination:</span>
                            <span className="text-sm font-medium">{trip.to}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Passagers:</span>
                            <span className="text-sm font-medium">{trip.passengers}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
                          Tarification
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Prix par personne:</span>
                            <span className="font-semibold text-emerald-600">
                              {trip.priceFrom}-{trip.priceTo} MAD
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Revenu potentiel:</span>
                            <span className="font-semibold text-emerald-600">
                              {Number(trip.priceFrom) * trip.passengers}-
                              {Number(trip.priceTo) * trip.passengers} MAD
                            </span>
                          </div>
                          <div className="pt-2 border-t border-gray-200 mt-2">
                            <div className="text-xs text-gray-500">
                              Créé le {formatDate(trip.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-700 flex items-center">
                            <UserCheck className="w-4 h-4 mr-2 text-emerald-600" />
                            Demandes ({trip.applicants.length})
                          </h4>
                          {trip.applicants.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                              onClick={() => handleViewDetails(trip)}
                            >
                              Voir tout
                            </Button>
                          )}
                        </div>

                        {trip.applicants.length === 0 ? (
                          <div className="text-center py-4 bg-white rounded-lg border border-dashed border-gray-200">
                            <p className="text-sm text-gray-500">
                              Aucune demande pour ce trajet
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {trip.applicants.slice(0, 2).map((applicant) => (
                              <div
                                key={applicant._id}
                                className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100"
                              >
                                <span className="text-sm font-medium">
                                  {applicant.name}
                                </span>
                                {applicant.status === "pending" ? (
                                  <Badge variant="warning">
                                    En attente
                                  </Badge>
                                ) : (
                                  <Badge variant="success">
                                    Approuvé
                                  </Badge>
                                )}
                              </div>
                            ))}
                            {trip.applicants.length > 2 && (
                              <div className="text-center pt-2">
                                <span className="text-xs text-gray-500">
                                  +{trip.applicants.length - 2} autres demandes
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {trip.notes && (
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                              <MessageSquare className="w-3 h-3 mr-1 text-gray-500" />
                              Notes:
                            </h5>
                            <p className="text-sm text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                              {trip.notes.length > 80 ? `${trip.notes.substring(0, 80)}...` : trip.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 border-t border-gray-200 pt-4">
                <div className="text-sm text-gray-600">
                  Affichage de {indexOfFirstTrip + 1} à {Math.min(indexOfLastTrip, sortedTrips.length)} sur {sortedTrips.length} trajets
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-emerald-600" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Trip detail modal */}
      {isDetailModalOpen && selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-bold text-gray-900">Détails du trajet</h3>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedTrip.from} <ArrowRight className="inline w-5 h-5 mx-1" /> {selectedTrip.to}
                      </h2>
                      {getStatusBadge(selectedTrip.status)}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedTrip.date)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedTrip.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedTrip.passengers} passagers
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        {selectedTrip.tripType === "shared" ? "Trajet partagé" : "Trajet privé"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      <Pencil className="w-4 h-4" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        handleDelete(selectedTrip._id);
                        handleCloseModal();
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                    Informations du trajet
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Départ:</dt>
                        <dd className="text-sm text-gray-900">{selectedTrip.from}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Destination:</dt>
                        <dd className="text-sm text-gray-900">{selectedTrip.to}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Date:</dt>
                        <dd className="text-sm text-gray-900">{formatDate(selectedTrip.date)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Heure:</dt>
                        <dd className="text-sm text-gray-900">{selectedTrip.time}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Passagers:</dt>
                        <dd className="text-sm text-gray-900">{selectedTrip.passengers}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Type de trajet:</dt>
                        <dd className="text-sm text-gray-900">
                          {selectedTrip.tripType === "shared" ? "Trajet partagé" : "Trajet privé"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Statut:</dt>
                        <dd className="text-sm text-gray-900">{getStatusBadge(selectedTrip.status)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Créé le:</dt>
                        <dd className="text-sm text-gray-900">{formatDate(selectedTrip.createdAt)}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
                    Tarification et notes
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Prix par personne:</dt>
                        <dd className="text-sm font-semibold text-emerald-600">
                          {selectedTrip.priceFrom}-{selectedTrip.priceTo} MAD
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm font-medium text-gray-600">Revenu potentiel:</dt>
                        <dd className="text-sm font-semibold text-emerald-600">
                          {Number(selectedTrip.priceFrom) * selectedTrip.passengers}-
                          {Number(selectedTrip.priceTo) * selectedTrip.passengers} MAD
                        </dd>
                      </div>
                    </dl>
                  </div>
                  
                  {selectedTrip.notes && (
                    <div>
                      <h5 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                        Notes
                      </h5>
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-sm text-gray-700">{selectedTrip.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-emerald-600" />
                  Demandes de réservation ({selectedTrip.applicants.length})
                </h4>
                
                {selectedTrip.applicants.length === 0 ? (
                  <div className="bg-gray-50 rounded-xl p-8 border border-dashed border-gray-200 text-center">
                    <p className="text-gray-500">Aucune demande de réservation pour ce trajet</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 bg-gray-100">
                      <div className="text-sm font-medium text-gray-700">Voyageur</div>
                      <div className="text-sm font-medium text-gray-700">Statut</div>
                      <div className="text-sm font-medium text-gray-700">Actions</div>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                      {selectedTrip.applicants.map((applicant) => (
                        <div key={applicant._id} className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="text-sm font-medium">{applicant.name}</div>
                          <div>
                            {applicant.status === "pending" ? (
                              <Badge variant="warning">En attente</Badge>
                            ) : (
                              <Badge variant="success">Approuvé</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {applicant.status === "pending" ? (
                              <>
                                <Button size="sm" className="text-xs">
                                  Approuver
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs text-red-600 border-red-200 hover:bg-red-50">
                                  Refuser
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" size="sm" className="text-xs">
                                Contacter
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 flex justify-end">
              <Button variant="outline" onClick={handleCloseModal}>
                Fermer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
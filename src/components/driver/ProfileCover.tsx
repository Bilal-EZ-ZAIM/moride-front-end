import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  Edit,
  Shield,
  Clock,
  X,
  MapPin,
  Link2,
  Mail,
} from "lucide-react";

interface ProfileCoverProps {
  onEdit: () => void;
  imageUrl: string;
  profileUrl: string;
  name: string;
  status: string;
}

export function ProfileCover({
  onEdit,
  imageUrl,
  profileUrl,
  name,
  status,
}: ProfileCoverProps) {
  const [profileImage, setProfileImage] = useState(profileUrl);
  const [bannerImage, setBannerImage] = useState(imageUrl);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);

  const profileFileInput = useRef<HTMLInputElement>(null);
  const bannerFileInput = useRef<HTMLInputElement>(null);

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        setIsProfileUploaded(true);
        const newImage = URL.createObjectURL(file);
        setProfileImage(newImage);
      }
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        setIsBannerUploaded(true);
        const newImage = URL.createObjectURL(file);
        setBannerImage(newImage);
      }
    }
  };

  const resetProfileImage = () => {
    setProfileImage(profileUrl);
    setIsProfileUploaded(false);
  };

  const resetBannerImage = () => {
    setBannerImage(imageUrl);
    setIsBannerUploaded(false);
  };

  return (
    <div className="mx-auto relative h-[300px] md:h-[250px] sm:h-[200px] bg-gray-100 mb-10">
      {/* Banner Image */}
      <div
        className="absolute inset-0 transition-all duration-300"
        onMouseEnter={() => setIsHoveringBanner(true)}
        onMouseLeave={() => setIsHoveringBanner(false)}
      >
        <div className="relative h-full overflow-hidden ">
          <img
            src={bannerImage}
            alt="Cover"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHoveringBanner ? "scale-[1.02] blur-[1px]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div
            className={`absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-200 ${
              isHoveringBanner ? "opacity-100" : "opacity-0"
            }`}
          >
            {isBannerUploaded && (
              <button
                className="p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={resetBannerImage}
                title="Reset banner image"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              className="p-2 bg-gray-800/90 text-white rounded-full hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => bannerFileInput.current?.click()}
              title="Upload banner image"
            >
              {isBannerUploaded ? (
                <Upload className="w-5 h-5" />
              ) : (
                <Camera className="w-5 h-5" />
              )}
            </button>
          </div>
          <input
            ref={bannerFileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
          />
        </div>
      </div>

      {/* Edit Button */}
      <div className="container mx-auto pt-4 px-2 bg-red-300 z-50 flex justify-between">
        <button
          className="  px-4 py-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>

        <div className=" flex items-center gap-2">
        <a
          href="mailto:contact@example.com"
          className="px-3 py-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
        >
          <Mail className="w-4 h-4" />
          Contact
        </a>
        <a
          href="#"
          className="px-3 py-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
        >
          <Link2 className="w-4 h-4" />
          Share
        </a>
      </div>
      </div>

      {/* Quick Actions */}
      

      {/* Profile Section */}
      <div className=" absolute bottom-0 left-0 right-0">
        <div className="container  mx-auto px-4 pb-4">
          <div className="flex items-end gap-6">
            {/* Profile Image */}
            <div
              className="relative -mb-12"
              onMouseEnter={() => setIsHoveringProfile(true)}
              onMouseLeave={() => setIsHoveringProfile(false)}
            >
              <div className="relative group">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-32 h-32 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg" />
                </div>
                <div
                  className={`absolute inset-0 rounded-full bg-black/20 transition-opacity duration-200 ${
                    isHoveringProfile ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`absolute bottom-1 right-1 flex items-center gap-2 transition-opacity duration-200 ${
                    isHoveringProfile ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {isProfileUploaded && (
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      onClick={resetProfileImage}
                      title="Reset profile image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    onClick={() => profileFileInput.current?.click()}
                    title="Upload profile image"
                  >
                    {isProfileUploaded ? (
                      <Upload className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <input
                ref={profileFileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-2xl font-bold tracking-tight">
                  {name}
                </h1>
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm bg-black/30 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">{status}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    Casablanca, Morocco
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

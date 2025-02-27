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
  onEdit?: () => void;
  imageUrl: string;
  profileUrl: string;
  name: string;
  status: string;
  isOwner: boolean;
}

export function ProfileCover({
  onEdit,
  imageUrl,
  profileUrl,
  name,
  status,
  isOwner,
}: ProfileCoverProps) {
  const [profileImage, setProfileImage] = useState(profileUrl);
  const [bannerImage, setBannerImage] = useState(imageUrl);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

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
    <div className="mx-auto relative h-[280px] md:h-[220px] sm:h-[180px] xs:h-[150px] 2xs:h-[130px] bg-gray-100 mb-16 md:mb-14 sm:mb-12 xs:mb-10">
      {/* Banner Image */}
      <div
        className="absolute inset-0 transition-all duration-300"
        onMouseEnter={() => setIsHoveringBanner(true)}
        onMouseLeave={() => setIsHoveringBanner(false)}
      >
        <div className="relative h-full overflow-hidden">
          <img
            src={bannerImage}
            alt="Cover"
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHoveringBanner && isOwner ? "scale-[1.02] blur-[1px]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {isOwner && (
            <div
              className={`absolute bottom-3 right-3 xs:bottom-2 xs:right-2 flex items-center gap-1.5 transition-opacity duration-200 ${
                isHoveringBanner ? "opacity-100" : "opacity-0"
              }`}
            >
              {isBannerUploaded && (
                <button
                  className="p-1.5 xs:p-1 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={resetBannerImage}
                  title="Reset banner image"
                >
                  <X className="w-3.5 h-3.5 xs:w-3 xs:h-3" />
                </button>
              )}
              <button
                className="p-1.5 xs:p-1 bg-gray-800/90 text-white rounded-full hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => bannerFileInput.current?.click()}
                title="Upload banner image"
              >
                {isBannerUploaded ? (
                  <Upload className="w-3.5 h-3.5 xs:w-3 xs:h-3" />
                ) : (
                  <Camera className="w-3.5 h-3.5 xs:w-3 xs:h-3" />
                )}
              </button>
            </div>
          )}
          <input
            ref={bannerFileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
            disabled={!isOwner}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="container mx-auto pt-3 px-2 z-50 flex justify-between">
        {isOwner && (
          <div className="relative">
            <button
              className="px-3 py-1.5 md:px-2.5 md:py-1.5 sm:p-1.5 xs:p-1 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 text-sm font-medium backdrop-blur-sm"
              onClick={onEdit}
              onMouseEnter={() => setShowTooltip("edit")}
              onMouseLeave={() => setShowTooltip(null)}
              onTouchStart={() => {
                setShowTooltip("edit");
                setTimeout(() => setShowTooltip(null), 1500);
              }}
            >
              <Edit className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              <span className="sm:inline-block hidden text-xs md:text-xs">Edit Profile</span>
            </button>
            
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <a
              href="mailto:contact@example.com"
              className="px-3 py-1.5 md:px-2.5 md:py-1.5 sm:p-1.5 xs:p-1 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 text-sm font-medium backdrop-blur-sm"
              onMouseEnter={() => setShowTooltip("contact")}
              onMouseLeave={() => setShowTooltip(null)}
              onTouchStart={() => {
                setShowTooltip("contact");
                setTimeout(() => setShowTooltip(null), 1500);
              }}
            >
              <Mail className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              <span className="sm:inline-block hidden text-xs md:text-xs">Contact</span>
            </a>
            
          </div>

          <div className="relative">
            <a
              href="#"
              className="px-3 py-1.5 md:px-2.5 md:py-1.5 sm:p-1.5 xs:p-1 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 text-sm font-medium backdrop-blur-sm"
              onMouseEnter={() => setShowTooltip("share")}
              onMouseLeave={() => setShowTooltip(null)}
              onTouchStart={() => {
                setShowTooltip("share");
                setTimeout(() => setShowTooltip(null), 1500);
              }}
            >
              <Link2 className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
              <span className="sm:inline-block hidden text-xs md:text-xs">Share</span>
            </a>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 pb-3 xs:pb-2">
          <div className="flex items-end gap-4 sm:gap-3 xs:gap-2">
            {/* Profile Image */}
            <div
              className="relative -mb-12 md:-mb-10 sm:-mb-8 xs:-mb-6 2xs:-mb-5"
              onMouseEnter={() => setIsHoveringProfile(true)}
              onMouseLeave={() => setIsHoveringProfile(false)}
            >
              <div className="relative group">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 md:w-22 md:h-22 sm:w-18 sm:h-18 xs:w-14 xs:h-14 2xs:w-12 2xs:h-12 rounded-full border-4 sm:border-3 xs:border-2 border-white object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-6 md:h-6 sm:w-5 sm:h-5 xs:w-4 xs:h-4 2xs:w-3 2xs:h-3 bg-emerald-500 rounded-full border-4 sm:border-3 xs:border-2 2xs:border border-white shadow-lg" />
                </div>
                {isOwner && (
                  <div
                    className={`absolute inset-0 rounded-full bg-black/20 transition-opacity duration-200 ${
                      isHoveringProfile ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}

                {isOwner && (
                  <div
                    className={`absolute bottom-1 right-1 xs:bottom-0.5 xs:right-0.5 flex items-center gap-1 transition-opacity duration-200 ${
                      isHoveringProfile ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {isProfileUploaded && (
                      <button
                        className="p-1 sm:p-0.5 xs:p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        onClick={resetProfileImage}
                        title="Reset profile image"
                      >
                        <X className="w-3 h-3 sm:w-2.5 sm:h-2.5 xs:w-2 xs:h-2" />
                      </button>
                    )}
                    <button
                      className="p-1 sm:p-0.5 xs:p-0.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      onClick={() => profileFileInput.current?.click()}
                      title="Upload profile image"
                    >
                      {isProfileUploaded ? (
                        <Upload className="w-3 h-3 sm:w-2.5 sm:h-2.5 xs:w-2 xs:h-2" />
                      ) : (
                        <Camera className="w-3 h-3 sm:w-2.5 sm:h-2.5 xs:w-2 xs:h-2" />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <input
                ref={profileFileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
                disabled={!isOwner}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white pb-1">
              <div className="flex items-center gap-1.5 mb-1 xs:mb-0.5">
                <h1 className="text-xl md:text-lg sm:text-base xs:text-sm 2xs:text-xs font-bold tracking-tight">
                  {name}
                </h1>
                <div className="relative group">
                  <Shield className="w-4 h-4 md:w-3.5 md:h-3.5 sm:w-3 sm:h-3 xs:w-2.5 xs:h-2.5 text-emerald-400 cursor-pointer" />
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap z-10">
                    Verified Account
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-1.5 xs:gap-1">
                <div className="flex items-center gap-1 text-xs xs:text-[10px] 2xs:text-[8px] bg-black/30 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <Clock className="w-3 h-3 sm:w-2.5 sm:h-2.5 xs:w-2 xs:h-2 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">{status}</span>
                </div>
                <div className="flex items-center gap-1 text-xs xs:text-[10px] 2xs:text-[8px]">
                  <MapPin className="w-3 h-3 sm:w-2.5 sm:h-2.5 xs:w-2 xs:h-2 text-emerald-400" />
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

import React, { useState, useRef, useCallback } from "react";
import { Camera, Clock, MapPin, Shield, Upload, X } from "lucide-react";
import { useAppDispatch } from "../../hooks";
import Swal from "sweetalert2";
import { uploadImage } from "../../store/features/profile/profileSlice";

interface ProfileCoverProps {
  onEdit?: () => void;
  imageUrl: string;
  profileUrl: string;
  name: string;
  status: string;
  isOwner: boolean;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({
  onEdit,
  imageUrl,
  profileUrl,
  name,
  status,
  isOwner,
}) => {
  const [profileImage, setProfileImage] = useState(profileUrl);
  const [bannerImage, setBannerImage] = useState(imageUrl);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [isProfileUploaded, setIsProfileUploaded] = useState(false);
  const [isBannerUploaded, setIsBannerUploaded] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringBanner, setIsHoveringBanner] = useState(false);

  const dispatch = useAppDispatch();
  const profileFileInput = useRef<HTMLInputElement>(null);
  const bannerFileInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "profile") {
          setProfileImage(reader.result as string);
          setProfileImageFile(file);
          setIsProfileUploaded(true);
        } else {
          setBannerImage(reader.result as string);
          setBannerImageFile(file);
          setIsBannerUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = (type: "profile" | "banner") => {
    if (type === "profile") {
      setProfileImage(profileUrl);
      setProfileImageFile(null);
      setIsProfileUploaded(false);
    } else {
      setBannerImage(imageUrl);
      setBannerImageFile(null);
      setIsBannerUploaded(false);
    }
  };

  const uploadImageHandler = async (type: "profile" | "banner") => {
    const data = {
      stape: type === "profile" ? "profile" : "Banner",
      image: type === "profile" ? profileImageFile : bannerImageFile,
    };

    try {
      let timerInterval: any;
      Swal.fire({
        title: "Téléchargement en cours...",
        html: "Progression : <b>0%</b>",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const progress = Swal.getHtmlContainer()?.querySelector("b");
            if (progress) {
              const currentProgress = Math.floor(
                (Swal.getTimerLeft() || 0) / 100
              );
              progress.textContent = `${100 - currentProgress}%`;
            }
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });

      await dispatch(uploadImage(data)).unwrap();

      if (type === "profile") {
        setIsProfileUploaded(false);
      } else {
        setIsBannerUploaded(false);
      }

      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: `La ${
          type === "profile" ? "photo de profil" : "bannière"
        } a été téléchargée avec succès.`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: `Échec du téléchargement de la ${
          type === "profile" ? "photo de profil" : "bannière"
        }.`,
      });
    }
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
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {isOwner && (
            <div className="absolute bottom-3 right-3 xs:bottom-2 xs:right-2 flex items-center gap-1.5 transition-opacity duration-200 z-40">
              {isBannerUploaded && (
                <button
                  className="p-1.5 xs:p-1 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => resetImage("banner")}
                  title="Reset banner image"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                className="p-1.5 xs:p-1 bg-gray-800/90 text-white rounded-full hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => bannerFileInput.current?.click()}
                title="Upload banner image"
              >
                <Camera className="w-5 h-5" />
              </button>
              {isBannerUploaded && (
                <button
                  className="p-1.5 xs:p-1 bg-green-500/90 text-white rounded-full hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={() => uploadImageHandler("banner")}
                  title="Confirm banner upload"
                >
                  <Upload className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          <input
            ref={bannerFileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, "banner")}
            disabled={!isOwner}
          />
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
                        onClick={() => resetImage("profile")}
                        title="Reset profile image"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      className="p-1 sm:p-0.5 xs:p-0.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                      onClick={() => profileFileInput.current?.click()}
                      title="Upload profile image"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                    {isProfileUploaded && (
                      <button
                        className="p-1 sm:p-0.5 xs:p-0.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        onClick={() => uploadImageHandler("profile")}
                        title="Confirm profile upload"
                      >
                        <Upload className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <input
                ref={profileFileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, "profile")}
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
};

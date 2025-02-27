import React, { useState } from "react";
import { Camera, Edit, Upload } from "lucide-react";
import { Button } from "../common/Button";
import axios from "axios";
import { useAppDispatch } from "../../hooks";
import { uploadImage } from "../../store/features/profile/profileSlice";
import Swal from "sweetalert2";

interface UserCoverProps {
  data: any;
  onEdit: () => void;
}

export function UserCover({ data }: any) {
  const api: string = "http://localhost:3000/api/v1/profile/";
  const [bannerImage, setBannerImage] = useState<string | null>(
    data?.imageBanner?.url || null
  );
  const [profileImage, setProfileImage] = useState<string | null>(
    data?.imageProfile?.url || null
  );
  const [bannerImageUploaded, setBannerImageUploaded] = useState(false);
  const [profileImageUploaded, setProfileImageUploaded] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<any>();
  const [bannerImageFile, setBannerImageFile] = useState<any>();

  const dispatch = useAppDispatch();

  // Handle banner image change
  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setBannerImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
        setBannerImageUploaded(true); // Mark as uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProfileImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setProfileImageUploaded(true); // Mark as uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageProfile = async () => {
    const data: any = {
      stape: "profile",
      image: profileImageFile,
    };
    try {
      // Show loading progress
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
      setProfileImageUploaded(false);
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "La photo de profil a été téléchargée avec succès.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Échec du téléchargement de la photo de profil.",
      });
    }
  };

  const uploadImageBanner = async () => {
    const data: any = {
      stape: "Banner",
      image: bannerImageFile,
    };
    try {
      // Show loading progress
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

      setBannerImageUploaded(false);
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "La bannière a été téléchargée avec succès.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur!",
        text: "Échec du téléchargement de la bannière.",
      });
    }
  };

  return (
    <div className="relative h-[300px]">
      <div className="absolute inset-0">
        <img
          src={bannerImage || "default-banner-image-url"} // Use default banner image
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute top-4 right-4">
        <Button variant="secondary" className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Modifier le profil
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="container mx-auto px-4 pb-6">
          <div className="flex items-end gap-6">
            <div className="relative -mb-16">
              <img
                src={profileImage || "default-profile-image-url"} // Use default profile image
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <label className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600">
                {profileImageUploaded ? (
                  <Upload className="w-4 h-4" onClick={uploadImageProfile} />
                ) : (
                  <Camera className="w-4 h-4" />
                )}

                {profileImageUploaded ? null : (
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0"
                    onChange={handleProfileImageChange}
                  />
                )}
              </label>
            </div>

            <div className="flex-1 text-white pb-2">
              <h1 className="text-3xl font-bold mb-1">
                {data?.firstname} {data?.lastname}{" "}
              </h1>
              <p className="text-emerald-300">{data?.profileHighlight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Image Change Button with Conditional Icon */}
      <div className="absolute top-4  left-4 h-7 w-7 bg-emerald-500 rounded-full flex justify-center items-center">
        {bannerImageUploaded ? (
          <Upload className="w-4 h-4 text-white" onClick={uploadImageBanner} />
        ) : (
          <Camera className="w-4 h-4 text-white" />
        )}

        {bannerImageUploaded ? null : (
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0"
            onChange={handleBannerImageChange}
          />
        )}
      </div>
    </div>
  );
}

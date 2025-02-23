import React, { useEffect, useState } from "react";
import { ProfileCover } from "../components/driver/ProfileCover";
import { ProfileStats } from "../components/driver/ProfileStats";
import { ReviewsList } from "../components/driver/ReviewsList";
import { WorkSchedule } from "../components/driver/WorkSchedule";
import { PricingSettings } from "../components/driver/PricingSettings";
import { EditProfileModal } from "../components/driver/EditProfileModal";
import { ContactSection } from "../components/driver/ContactSection";
import { VehicleInfo } from "../components/driver/VehicleInfo";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProfile } from "../store/features/driver/driverSlice";

export function DriverProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isLoading, profileDriver } = useAppSelector((state) => state.driver);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile());
    };

    fetchData();

    // If there's a cleanup function, return it here
    return () => {
      console.log("Cleanup effect");
    };
  }, []); // Make sure to include dependencies

  const driverData = {
    _id: "67b9218c7bd867b7845154c2",
    userId: "67b872e4de0986e0a4c891b5",
    gender: "Homme",
    birthdate: "2007-05-19T00:00:00.000Z",
    nationality: "Accusamus pariatur",
    address: "Voluptatem Ut in do",
    licenseNumber: "842",
    licenseExpirationDate: "1979-11-28T00:00:00.000Z",
    drivingExperience: 41,
    status: "Disponible",
    rating: 0,
    preferredLanguages: ["Anglais", "Espagnol", "Arabe"],
    profile: {
      firstname: "bilal",
      lastname: "ezzaim",
      address: "Youssofia",
      phone: "+212648161077",
      profileHighlight: "Irure odit voluptate",
      facebook: "https://www.kugokex.me.uk",
      linkedIn: "https://www.vylotemes.net",
      whatsapp: "https://www.hymo.net",
      portfolio: "https://www.vylotemes.net",
      imageProfile: {
        url: "https://res.cloudinary.com/dsldmzxqt/image/upload/v1737556717/profile_tfo9f4.png",
      },
      imageBanner: {
        url: "https://res.cloudinary.com/dsldmzxqt/image/upload/v1737553353/Black_and_White_Gradient_Corporate_Business_Linkedin_Banner_Background_Photo_xilsqb.png",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {profileDriver && (
        <>
          <ProfileCover
            onEdit={() => setIsEditModalOpen(true)}
            imageUrl={profileDriver?.profile.imageBanner.url}
            profileUrl={profileDriver.profile.imageProfile.url}
            name={`${profileDriver.profile.firstname} ${profileDriver.profile.lastname}`}
            status={profileDriver.status}
          />

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ProfileStats
                  experience={profileDriver.drivingExperience}
                  languages={profileDriver.preferredLanguages}
                  rating={profileDriver.rating}
                />
                  <WorkSchedule />
                <VehicleInfo />
               
                <ReviewsList isDriver={true} />
              </div>

              <div className="space-y-8">
              
                <PricingSettings />
                <ContactSection
                  phone={profileDriver.profile.phone}
                  address={profileDriver.profile.address}
                  social={{
                    facebook: profileDriver.profile.facebook,
                    linkedin: profileDriver.profile.linkedIn,
                    whatsapp: profileDriver.profile.whatsapp,
                    portfolio: profileDriver.profile.portfolio,
                  }}
                />
              </div>
            </div>
          </div>

          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            driverData={profileDriver}
          />
        </>
      )}
    </div>
  );
}

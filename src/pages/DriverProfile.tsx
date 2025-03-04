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

  const { isLoading, profileDriver, counter } = useAppSelector(
    (state) => state.driver
  );
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfile());
    };

    fetchData();
  }, [dispatch, counter]);

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
            isOwner={true}
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
                <VehicleInfo isOwner={true} />

                <ReviewsList isDriver={true} />
              </div>

              <div className="space-y-8">
                <PricingSettings />
                <ContactSection
                  isOwner={true}
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

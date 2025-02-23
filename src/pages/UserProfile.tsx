import React, { useEffect, useState } from "react";
import { UserCover } from "../components/user/UserCover";
import { UserInfo } from "../components/user/UserInfo";
import { UserSocialLinks } from "../components/user/UserSocialLinks";
import { UserStats } from "../components/user/UserStats";
import { UserLocation } from "../components/user/UserLocation";
import { UserTrips } from "../components/user/UserTrips";
import { BecomeDriverModal } from "../components/user/BecomeDriverModal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProfile } from "../store/features/profile/profileSlice";

export function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  const { profile, counter } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(profile);
  useEffect(() => {
    dispatch(getProfile());
  }, [counter]);

  const data = {
    imageBanner: profile?.imageBanner,
    imageProfile: profile?.imageProfile,
    profileHighlight: profile?.profileHighlight,
    firstname: profile?.firstname,
    lastname: profile?.lastname,
  };

  const info = {
    email: user?.email,
    phone: profile?.phone,
    address: profile?.address,
  };

  const socialLink = {
    facebook: profile?.facebook,
    portfolio: profile?.portfolio,
    linkedIn: profile?.linkedIn,
    whatsapp: profile?.whatsapp,
  };

  return (
    profile && (
      <div className="min-h-screen bg-gray-50">
        <UserCover data={data} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UserInfo
                onBecomeDriver={() => setIsDriverModalOpen(true)}
                info={info}
              />
              <UserTrips />
              <UserLocation />
            </div>
            <div className="space-y-8">
              <UserSocialLinks socialLink={socialLink} />
            </div>
          </div>
        </div>

        <BecomeDriverModal
          isOpen={isDriverModalOpen}
          onClose={() => setIsDriverModalOpen(false)}
        />
      </div>
    )
  );
}

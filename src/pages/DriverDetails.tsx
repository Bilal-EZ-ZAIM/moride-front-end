import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ProfileCover } from "../components/driver/ProfileCover";
import { ReviewsList } from "../components/driver/ReviewsList";
import { ContactSection } from "../components/driver/ContactSection";
import { PricingSettings } from "../components/profile/PricingSettings";
import { ProfileStats } from "../components/driver/ProfileStats";
import WorkSchedule from "../components/driver/WorkSchedule";
import { useParams } from "react-router-dom";
import { VehicleInfoDriver } from "../components/driver/VehicleInfoDriver";
import WorkScheduleDetails from "../components/driver/WorkScheduleDetails";

export function DriverDetails() {
  const { isLoading, drivers } = useAppSelector((state) => state.driver);
  const dispatch = useAppDispatch();
  const [DriverDetails, setDriverDetails] = useState<any>();

  console.log(DriverDetails);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    // const fetchData = async () => {
    //   if (id) {
    //     await dispatch(getDriverById(id));
    //   }
    // };

    if (drivers && id) {
      setDriverDetails(drivers.find((item: any) => item?._id === id));
    }

    // fetchData();

    return () => {
      console.log("Cleanup effect");
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {DriverDetails && (
        <>
          <ProfileCover
            imageUrl={DriverDetails?.profile.imageBanner?.url}
            profileUrl={DriverDetails.profile.imageProfile?.url}
            name={`${DriverDetails.profile.firstname} ${DriverDetails.profile.lastname}`}
            status={DriverDetails.status}
            isOwner={false}
          />

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ProfileStats
                  experience={DriverDetails.drivingExperience}
                  languages={DriverDetails.preferredLanguages}
                  rating={DriverDetails.rating}
                />
                <WorkScheduleDetails driverId={DriverDetails.userId} />
                <VehicleInfoDriver
                  isOwner={false}
                  driverId={DriverDetails.userId}
                />
                <ReviewsList isDriver={false} />
              </div>

              <div className="space-y-8">
                <PricingSettings />
                <ContactSection
                  isOwner={false}
                  phone={DriverDetails.profile.phone}
                  address={DriverDetails.profile.address}
                  social={{
                    facebook: DriverDetails.profile.facebook,
                    linkedin: DriverDetails.profile.linkedIn,
                    whatsapp: DriverDetails.profile.whatsapp,
                    portfolio: DriverDetails.profile.portfolio,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

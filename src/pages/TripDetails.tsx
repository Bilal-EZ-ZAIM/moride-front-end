import { TripInfo } from "../components/trips/TripInfo";
import { DriverApplications } from "../components/trips/DriverApplications";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { fetchBookingById } from "../store/features/booking/bookingSlice";
import { Loader2 } from "lucide-react";

export function TripDetails() {
  const { id } = useParams();
  const { booking, loading } = useAppSelector((state) => state.booking);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  console.log(booking);

  useEffect(() => {
    dispatch(fetchBookingById(id));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-gray-600">Chargement..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <div className="space-y-8">
          <TripInfo booking={booking} />
          {user?._id === booking?.userId ? <DriverApplications /> : null}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getDriverWorkSchedule } from "../../store/features/working/workingSlice";

interface DaySchedule {
  start: string;
  end: string;
  active: boolean;
}

interface ScheduleState {
  [key: string]: DaySchedule;
}

const DayScheduleRow = ({
  day,
  hours,
}: {
  day: string;
  hours: DaySchedule;
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
    <div className="w-full sm:w-32 text-sm md:text-base text-gray-700 font-medium text-center sm:text-left">
      {day.charAt(0).toUpperCase() + day.slice(1)}
    </div>
    <input
      type="checkbox"
      checked={hours.active}
      className="rounded text-emerald-600"
    />
    <div className="flex w-full gap-2">
      <input
        type="time"
        value={hours.start}
        className="border rounded-lg p-2 text-sm md:text-base w-full"
        disabled
      />
      <span className="text-gray-500 self-center">-</span>
      <input
        type="time"
        value={hours.end}
        className="border rounded-lg p-2 text-sm md:text-base w-full"
        disabled
      />
    </div>
  </div>
);

export function WorkScheduleDetails({ driverId }: { driverId: string }) {
  const { isLoading, viewerWorkingDetails } = useAppSelector(
    (state) => state.working
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDriverWorkSchedule(driverId));
  }, [driverId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <p className="text-gray-600">Chargement des horaires...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3 sm:gap-0">
        <h2 className="text-xs md:text-xl font-bold text-gray-800">
          📅 Horaires de Travail
        </h2>
      </div>

      <div className="space-y-4">
        {viewerWorkingDetails &&
          Object.entries(viewerWorkingDetails as ScheduleState).map(
            ([day, hours]) => (
              <DayScheduleRow key={day} day={day} hours={hours} />
            )
          )}
      </div>
    </div>
  );
}

export default WorkScheduleDetails;

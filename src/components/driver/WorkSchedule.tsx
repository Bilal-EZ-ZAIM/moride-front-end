import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createWorkingHours,
  fetchDriverWorkingHours,
  updateWorkingHours,
} from "../../store/features/working/workingSlice";
import Swal from "sweetalert2";

interface DaySchedule {
  start: string;
  end: string;
  active: boolean;
}

interface ScheduleState {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export function WorkSchedule() {
  const { isLoading, isLoadingFetch, working, DriverWorkingState } =
    useAppSelector((state) => state.working);
  const [schedule, setSchedule] = useState<ScheduleState>(working);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (working) {
      setSchedule(working);
    }
  }, [working]);

  const formatData = () => {
    if (!DriverWorkingState) {
      dispatch(createWorkingHours({ weekSchedule: schedule }))
        .unwrap()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Enregistrement réussi !",
            text: "Les horaires de travail ont été ajoutés avec succès.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Erreur !",
            text: error || "L'ajout des horaires a échoué.",
          });
        });
    } else {
      console.log({ weekSchedule: schedule });
      dispatch(updateWorkingHours({ weekSchedule: schedule }))
        .unwrap()
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Mise à jour réussie !",
            text: "Les horaires de travail ont été mis à jour avec succès.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Erreur !",
            text: error || "La mise à jour des horaires a échoué.",
          });
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDriverWorkingHours());
    };

    fetchData();

    return () => {
      console.log("Cleanup effect");
    };
  }, []);

  if (isLoadingFetch) {
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
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
          onClick={formatData}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isLoading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="space-y-4">
        {Object.entries(schedule).map(([day, hours]) => (
          <div
            key={day}
            className="flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            <div className="w-full sm:w-32 text-sm md:text-base text-gray-700 font-medium text-center sm:text-left">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </div>

            <input
              type="checkbox"
              checked={hours.active}
              onChange={(e) =>
                setSchedule({
                  ...schedule,
                  [day]: { ...hours, active: e.target.checked },
                })
              }
              className="rounded text-emerald-600"
            />

            <div className="flex w-full gap-2">
              <input
                type="time"
                value={hours.start}
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    [day]: { ...hours, start: e.target.value },
                  })
                }
                className="border rounded-lg p-2 text-sm md:text-base w-full"
                disabled={!hours.active}
              />

              <span className="text-gray-500 self-center">-</span>

              <input
                type="time"
                value={hours.end}
                onChange={(e) =>
                  setSchedule({
                    ...schedule,
                    [day]: { ...hours, end: e.target.value },
                  })
                }
                className="border rounded-lg p-2 text-sm md:text-base w-full"
                disabled={!hours.active}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkSchedule;

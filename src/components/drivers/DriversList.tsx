import React, { useEffect } from "react";
import { DriverCard } from "./DriverCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllDrivers } from "../../store/features/driver/driverSlice";

export function DriversList() {
  const { isLoading, drivers} = useAppSelector((state) => state.driver);
  const { profile } = useAppSelector((state) => state.profile);
  console.log(drivers)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllDrivers());
      } catch (error) {
        console.error("Failed to fetch drivers:", error);
      }
    };

    fetchData();

    // Cleanup effect if needed
    return () => {
      console.log("Cleanup effect");
    };
  }, []);

  // Handling loading state and errors
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Chargement des conducteurs...</div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {drivers?.map((driver , index) => (
        <DriverCard key={index} driver={driver} />
      ))}
    </div>
  );
}

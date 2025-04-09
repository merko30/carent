"use client";

import { useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { useSession } from "next-auth/react";
import "react-day-picker/style.css";

import { Location, Vehicle } from "@/types";

import LocationSelect from "./LocationSelect";

const RentalSummary = ({ vehicle }: { vehicle: Vehicle }) => {
  const { data: session } = useSession();
  const [pickupLocation, setPickupLocation] = useState<Location>();
  const [range, setRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const price = useMemo(() => {
    if (!range.from || !range.to) return vehicle.price;
    const days = Math.ceil(
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
    );
    return vehicle.price * days;
  }, [range, vehicle.price]);

  // TODO: SHOW STATS FOR THE VEHICLE or price update component
  if (session && session.user.id === vehicle.ownerId) {
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold leading-snug">
        <span className="text-orange-400 font-semibold">{price} KM</span> ukupno
      </h2>
      <p className="text-gray-400 text-sm mb-4">{vehicle.price} KM po danu</p>
      <hr className="text-gray-300 my-5" />
      <h2 className="text-lg font-semibold mb-4">
        Odaberi lokaciju preuzimanja
      </h2>
      <LocationSelect
        location={pickupLocation}
        onSave={(location) => setPickupLocation(location as Location)}
      />
      <hr className="text-gray-300 my-5" />
      <h2 className="text-lg font-semibold mb-4">Odaberi datum preuzimanja</h2>

      <DayPicker
        mode="range"
        required={true}
        selected={range}
        onSelect={(date: DateRange) => setRange(date)}
        disabled={{
          before: new Date(),
        }}
      />
    </div>
  );
};

export default RentalSummary;

"use client";

import { useMemo, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";

import { Vehicle } from "@/types";

const RentalSummary = ({ vehicle }: { vehicle: Vehicle }) => {
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold leading-snug">
        <span className="text-orange-400 font-semibold">{price} KM</span> ukupno
      </h2>
      <p className="text-gray-400 text-sm mb-4">{vehicle.price} KM po danu</p>
      <hr className="text-gray-300 my-5" />
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

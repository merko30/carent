import { GasPump, Seat, PaintBrush } from "@phosphor-icons/react/dist/ssr";

import FeatureItem from "@/components/FeatureItem";

import { FUEL_TYPE_TRANSLATIONS } from "@/constants/features";

import { Vehicle } from "@/types";

const FEATURES = [
  {
    label: "Tip goriva",
    value: (vehicle: Vehicle) => FUEL_TYPE_TRANSLATIONS[vehicle.typeOfFuel],
    icon: GasPump,
  },
  {
    label: "Broj sjedišta",
    value: (vehicle: Vehicle) => vehicle.numberOfSeats,
    icon: Seat,
  },
  {
    label: "Boja",
    value: (vehicle: Vehicle) => vehicle.color,
    icon: PaintBrush,
  },
];

const Features = ({ vehicle }: { vehicle: Vehicle }) => (
  <div className="flex items-center gap-4 pb-4">
    {FEATURES.map(({ value, label, icon: Icon }) => (
      <FeatureItem key={label} label={label} value={value(vehicle) ?? "N/A"}>
        <Icon size={24} />
      </FeatureItem>
    ))}
  </div>
);

export default Features;

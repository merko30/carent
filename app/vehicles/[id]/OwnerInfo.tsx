import Image from "next/image";
import { Star } from "@phosphor-icons/react/dist/ssr";

import { Owner } from "@/types";

const OwnerInfo = ({ owner }: { owner: Owner }) => {
  const vehicleCount = owner._count?.vehicles ?? 1;
  const vehicleSinglePluralLabel = vehicleCount === 1 ? "vozilo" : "vozila";

  return (
    <>
      <div className="flex gap-3">
        <p className="text-lg uppercase transform rotate-90 -ml-8">VLASNIK</p>
        <Image
          src={owner.avatar ?? "https://placehold.co/64x64.png"}
          width="64"
          height="64"
          alt={owner.username}
          className="w-16 h-16 rounded-full"
        />
      </div>
      <div>
        <h1 className="text-lg font-medium">{owner.username}</h1>
        <div className="flex items-center gap-2">
          <span>
            {owner._count!.vehicles} {vehicleSinglePluralLabel}
          </span>
          <span className="text-gray-500">|</span>
          <span className="inline-flex items-center gap-1">
            <Star weight="fill" fill="gold" />
            {owner.rating ? owner.rating : "Nema ocjene"}
          </span>
        </div>
      </div>
    </>
  );
};

export default OwnerInfo;

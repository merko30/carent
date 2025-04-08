"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { Vehicle } from "@/types";

const EditLink = ({ vehicle }: { vehicle: Vehicle }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === vehicle.ownerId;

  if (!session || !isOwner) {
    return null;
  }

  return (
    <Link
      href={`/vehicles/${vehicle.id}/edit`}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
    >
      Uredi
    </Link>
  );
};

export default EditLink;

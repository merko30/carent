"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const EditLink = ({ ownerId }: { ownerId: string }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === ownerId;

  if (!session || !isOwner) {
    return null;
  }

  return (
    <Link
      href={`/vehicles/${ownerId}/edit`}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg"
    >
      Uredi
    </Link>
  );
};

export default EditLink;

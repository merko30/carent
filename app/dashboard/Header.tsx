import Image from "next/image";

import { User } from "@/types";

const Header = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
      <Image
        src={user.avatar ?? "/avatar.png"}
        alt={user.username}
        width={128}
        height={128}
      />
      <div>
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default Header;

import Container from "@/components/Container";

import Header from "./Header";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/auth";
import Sidebar from "./Sidebar";

const loadUser = async () => {
  const sessionCookie = (await cookies()).get("token");

  const payload = await decrypt(sessionCookie!.value);

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(payload.userId),
    },
    include: {
      vehicles: {
        take: 3,
      },
      reviews: {
        take: 3,
      },
      rentals: {
        take: 3,
      },
    },
  });

  return { user };
};

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await loadUser();

  if (!user) {
    return <h1>Nema korisnika</h1>;
  }
  return (
    <Container>
      <Header user={user} />
      <div className="flex gap-8">
        <Sidebar />
        <div className="w-2/3 lg:w-3/4">{children}</div>
      </div>
    </Container>
  );
}

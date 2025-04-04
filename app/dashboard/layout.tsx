import { getServerSession } from "next-auth";

import Container from "@/components/Container";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import Header from "./Header";
import Sidebar from "./Sidebar";

const loadUser = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
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

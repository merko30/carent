import Container from "@/components/Container";

// import Header from "./Header";
// import { prisma } from "@/lib/prisma";
import Sidebar from "./Sidebar";
import { getSession } from "next-auth/react";

const loadUser = async () => {
  const session = await getSession();
  console.log("Session:", session);

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: parseInt(payload.userId),
  //   },
  //   include: {
  //     vehicles: {
  //       take: 3,
  //     },
  //     reviews: {
  //       take: 3,
  //     },
  //     rentals: {
  //       take: 3,
  //     },
  //   },
  // });

  return { user: 1 };
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
      {/* <Header user={user} /> */}
      <div className="flex gap-8">
        <Sidebar />
        <div className="w-2/3 lg:w-3/4">{children}</div>
      </div>
    </Container>
  );
}

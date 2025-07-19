import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {prisma} from "./db"

export const getOrCreateUser = async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser || !kindeUser.id) return null;

  let user = await prisma.user.findUnique({
    where: { kindeId: kindeUser.id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        kindeId: kindeUser.id,
        username: kindeUser.given_name || kindeUser.email || "Anonymous",
      },
    });
  }

  return user;
};

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const isAdmin = async (): Promise<boolean> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email) return false;

  const raw = process.env.ADMIN_EMAILS || "";
  const admins = raw.split(",").map((e) => e.trim().toLowerCase());

  return admins.includes(user.email.toLowerCase());
};

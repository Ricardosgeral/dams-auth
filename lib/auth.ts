// just to simplify and get the user without always writting session?.user

import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

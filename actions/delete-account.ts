"use server"; //server action

import { z } from "zod";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { DeleteAccountSchema } from "@/schemas";
import { signOut } from "@/auth";

export const deleteAccount = async (
  values: z.infer<typeof DeleteAccountSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "unautorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unautorized" };
  }

  if (values.delete !== "DELETE") {
    return { success: "Write 'DELETE' to remove account!" };
  }

  await db.user.delete({ where: { id: dbUser.id } });

  await signOut({ redirectTo: "/", redirect: true });

  return { success: "Account deleted 😒" };
};

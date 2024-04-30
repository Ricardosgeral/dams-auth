import { auth, signOut } from "@/auth";
import { Session } from "inspector";

export default async function Settings() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}

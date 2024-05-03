import { auth, signOut } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";

export default async function SettingsPage() {
  const user = useCurrentUser();

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

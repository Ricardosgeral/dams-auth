"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };

  return (
    <div>
      {
        //JSON.stringify(user)
      }
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
}

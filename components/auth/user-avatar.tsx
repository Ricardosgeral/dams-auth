"use client";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { LuSettings } from "react-icons/lu";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

declare interface UserAvatarProps {
  isPhotoLeft?: boolean;
}

export function UserAvatar({ isPhotoLeft = false }: UserAvatarProps) {
  const user = useCurrentUser();

  return (
    <div
      className={
        isPhotoLeft
          ? "flex flex-row-reverse gap-x-2 px-2 justify-end"
          : "flex gap-x-3"
      }
    >
      <div className="flex items-center overflow-hidden">
        {user?.name && (
          <h1 className="truncate overflow-ellipsis text-sm text-slate-600">
            {user?.name.trim().split(/\s+/)[0]}
          </h1>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <Avatar className="hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500">
              <AvatarImage src={user?.image || undefined} />
              <AvatarFallback className="bg-yellow-500 text-white shadow-xl hover:bg-yellow-500/80">
                {!user?.name ? (
                  <FaUser />
                ) : (
                  <p className="text-xl font-bold">
                    {user?.name?.slice(0, 1).toUpperCase()}
                  </p>
                )}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[110px]" align="end">
          <DropdownMenuItem>
            <LuSettings className="h-4 w-4 mr-1" />
            <Link href="\settings">Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-1" />
            <LogoutButton>Logout</LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

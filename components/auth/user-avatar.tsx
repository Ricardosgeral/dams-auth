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
          ? "flex flex-row-reverse  items-center space-x-2"
          : "flex items-center gap-x-2"
      }
    >
      <div className="w-[120px] hidden sm:block overflow-hidden items-center">
        {user?.name && (
          <div
            className={
              isPhotoLeft
                ? "flex flex-row font-semibold items-baseline justify-start"
                : "flex flex-row font-semibold items-baseline justify-end"
            }
          >
            <p className="text-sm text-gray-700 text-left">
              &nbsp;&nbsp;Hi,&nbsp;
            </p>
            <h1 className="truncate overflow-ellipsis text-md text-sky-500">
              {user?.name.trim().split(/\s+/)[0]}
            </h1>
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <Avatar>
              <AvatarImage src={user?.image || undefined} />
              <AvatarFallback className="bg-sky-500 text-white">
                {!user?.name ? (
                  <FaUser />
                ) : (
                  <p className="text-xl font-bold">{user?.name?.slice(0, 1)}</p>
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

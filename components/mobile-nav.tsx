"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/app/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import { ExtendedUser } from "@/auth";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

interface MobileNavProps {
  user: ExtendedUser;
}

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[300px]">
      <Sheet>
        <SheetTrigger>
          <HamburgerMenuIcon
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image
              src="/logos/logo-rect-2lines.svg"
              width={50}
              height={50}
              alt="Barragista logo"
            />
          </Link>
          <div className="flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-2 pt-8 text-white ">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-3 items-center p-4 rounded-lg w-full max-w-60 text-black hover:opacity-50",
                          {
                            "bg-black text-white": isActive,
                          }
                        )}
                      >
                        <item.icon
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                          height={20}
                          width={20}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>

            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;

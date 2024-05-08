"use client";

import { sidebarLinks } from "@/app/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import { ExtendedUser } from "@/auth";

declare interface SiderbarProps {
  user: ExtendedUser;
}

export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex flex-col h-screen w-fit  justify-between border-r border-gray-200 bg-white pt-8 text-black p-4 max-md:hidden  xl:w-[300px]">
      <nav className="flex flex-col gap-4">
        <Link
          href="/home"
          className="mb-8 cursor-pointer flex items-center gap-2"
        >
          <Image
            src="/logos/logo-rect-2lines.svg"
            width={150}
            height={150}
            alt="Barragista logo"
            className="max-xl:w-[70px] "
          />
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-3 rounded-lg justify-center xl:justify-start hover:opacity-50",
                { "bg-black text-white": isActive }
              )}
            >
              <div className="relative size-6">
                {
                  <item.icon
                    className={cn({
                      "brightness-[3] invert-0": isActive,
                    })}
                    height={24}
                    width={24}
                  />
                }
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <Footer user={user} />
    </section>
  );
};

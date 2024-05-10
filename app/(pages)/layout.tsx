import Image from "next/image";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import MobileNav from "@/components/mobile-nav";
import Link from "next/link";

interface PagesLayoutProps {
  children: React.ReactNode;
}

export default async function PagesLayout({ children }: PagesLayoutProps) {
  const user = await currentUser(); // uses auth from lib for rendering in server components

  if (!user) redirect("/auth/login"); //middleware should avoid this, but...

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex flex-col size-full p-4">
        <div className="flex h-16 items-center justify-between p-2 md:hidden">
          <Link href="/home">
            <Image
              src="/logos/logo-rect-2lines.svg"
              width={55}
              height={55}
              alt="logo"
            />
          </Link>
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Image from "next/image";
import LogoApp from "@/components/logo-app";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-8 space-y-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <LogoApp width={600} negative />

      {/* <h1
        className={cn(
          "text-2xl font-semibold text-white drop-shadow-md",
          font.className
        )}
      >
        Dams in Portugal
      </h1> */}

      <div className="space-y-6 text-center ">
        <div>
          <LoginButton mode="redirect">
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
        <p className="text-white text-xs">Powered by ricardos</p>
      </div>
    </main>
  );
}

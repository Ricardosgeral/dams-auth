import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import LogoApp from "@/components/logo-app";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const currentYear = new Date().getFullYear();

export default function Home() {
  return (
    <div className="flex flex-col min-w-[350px] min-h-screen">
      <header className="w-full">
        <div className="flex justify-center ">
          <LogoApp />
        </div>
        <div className="flex justify-center space-x-4 py-3 shadow-xl bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-black to-slate-700 ">
          <LoginButton mode="modal" type="login" asChild>
            <Button variant="primary" size="lg" className="font-semibold">
              Login
            </Button>
          </LoginButton>
          <LoginButton mode="modal" type="register" asChild>
            <Button variant="outline" size="lg">
              Getting started
            </Button>
          </LoginButton>
        </div>
      </header>

      <div className="flex flex-col flex-grow w-full  items-center justify-evenly py-4 px-4 gap-4 lg:flex-row lg:px-8 lg: gap-x-8">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
          <Card className="flex  flex-row h-full justif rounded-2xl shadow-xl">
            <Image
              alt="dams"
              className="w-1/2 rounded-l-2xl object-cover"
              height="1625"
              src="/images/dams_vertical.jpg"
              width="1438"
            />
            <div className="flex flex-col justify-evenly itens-center gap-4 p-4">
              <div className="lg:space-y-4">
                <h3 className="text-xl md:text-3xl font-bold tracking-tighter">
                  Dams database
                </h3>
                <p className="text-sm sm:text-lg text-gray-500 text-pretty dark:text-gray-400 flex-1">
                  Discover main features and characteristics of dams
                </p>
              </div>
              <Link href={"/dams"}>
                <Button variant="default" size="sm" className="w-1/2">
                  Go
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
          <Card className="flex flex-row h-full justif rounded-2xl shadow-xl">
            <Image
              alt="dams"
              className="w-1/2 rounded-l-2xl object-cover"
              height="1625"
              src="/images/regulations.png"
              width="1438"
            />
            <div className="flex flex-col justify-evenly itens-center gap-4 p-4">
              <div className="lg:space-y-4">
                <h3 className="text-xl lg:text-3xl font-bold tracking-tighter">
                  Dams regulations
                </h3>
                <p className="text-sm sm:text-lg text-gray-500 text-pretty dark:text-gray-400 flex-1">
                  Find articles on regulations related to dam safety
                </p>
              </div>
              <Link href={"/regulations"}>
                <Button variant="default" size="sm" className="w-1/2">
                  Go
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
      <footer className="w-full px-4 py-2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-300 to-yellow-500 border-t">
        <div className="flex flex-col-reverse items-end justify-between gap-2  sm:flex-row">
          <div className="text-sm text-gray-900 dark:text-gray-200">
            © 2024-{currentYear} Ricardos Inc. All rights reserved.
          </div>
          <nav className="flex gap-4">
            <Link className="text-sm  font-medium hover:underline" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium  hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              <Button variant="default" size="sm" className="">
                Contact
              </Button>
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

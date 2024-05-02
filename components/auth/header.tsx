import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LogoApp from "@/components/logo-app";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {/* <h1 className={cn("text-3xl font-semibold", font.className)}></h1> */}
      <LogoApp width={300} />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
}

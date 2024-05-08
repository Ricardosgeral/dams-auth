import { NavBar } from "@/app/(protected)/_components/navbar";

interface ProtectLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectLayoutProps) {
  return (
    <div
      className="w-full min-h-screen flex flex-col py-3 gap-y-10 items-center justify-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      <NavBar></NavBar>
      <div className="flex-grow">{children}</div>
    </div>
  );
}

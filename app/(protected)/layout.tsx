import { NavBar } from "./_components/navbar";

interface ProtectLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectLayoutProps) {
  return (
    <div
      className="w-full h-screen flex flex-col gap-y-10 items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
      <NavBar></NavBar>
      {children}
    </div>
  );
}

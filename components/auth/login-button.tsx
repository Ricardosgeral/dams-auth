"use client";

import { useRouter } from "next/navigation";

//This is the name of the interface that
// defines the type of props accepted by the LoginButton component.
interface LoginButtonProps {
  children: React.ReactNode; //any type of content that can be rendered in react
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  //This hook allows you to programmatically change routes inside Client Component
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Todo: implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

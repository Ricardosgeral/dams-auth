import HeaderBox from "@/components/header-box";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Contacts() {
  const user = await currentUser(); // uses auth from lib for rendering in server components

  if (!user) redirect("/auth/login"); //middleware should avoid this but
  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div className="no-scrollbar flex w-full flex-1 flex-col gap-5 px-5 sm:px-8 py-5 lg:py-8 xl:max-h-screen xl:overflow-y-scroll">
        <header className="flex flex-col justify-between gap-8">
          <HeaderBox
            type="title"
            title="Contacts"
            subtext="Do you have a question or want to make a suggestion?"
          ></HeaderBox>
        </header>
        <div></div>
      </div>
    </section>
  );
}

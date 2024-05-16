import Image from "next/image";
import Link from "next/link";

interface LogAppProps {
  negative?: boolean;
  square?: boolean;
}

export default function LogoApp({
  negative = false,
  square = false,
}: LogAppProps) {
  return (
    <>
      {!square ? (
        <Image
          src={negative ? "/logos/logos_Page 1.svg" : "/logos/logos_Page 3.svg"}
          alt="Barragista Logo"
          width={0}
          height={0}
          className="w-3/4 min-w-[200px] py-1 sm:w-1/3 sm:py-2"
          priority
        />
      ) : (
        <Link href="/" className="cursor-pointer">
          <div className="flex flex-col items-center text-center text-xl font-bold font-[Poppins] text-shadow-xl text-yellow-500  hover:text-slate-800 hover:font-extrabold">
            <Image
              src="/logos/logos_Page 2.svg"
              width={70}
              height={70}
              alt="Barragista logo"
            />
            <h1>Barragista</h1>
          </div>
        </Link>
      )}
    </>
  );
}

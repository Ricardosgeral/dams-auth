import Image from "next/image";

interface LogAppProps {
  negative?: boolean;
}

export default function LogoApp({ negative }: LogAppProps) {
  return (
    <Image
      src={negative ? "/logos/logos_Page 1.svg" : "/logos/logos_Page 3.svg"}
      alt="Barragista Logo"
      width={0}
      height={0}
      className="w-3/4  min-w-[250px] py-1 sm:w-1/3 sm:py-2"
      priority
    />
  );
}

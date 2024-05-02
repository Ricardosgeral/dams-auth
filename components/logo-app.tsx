import Image from "next/image";

interface LogAppProps {
  width: number;
  negative?: boolean;
}

export default function LogoApp({ width, negative }: LogAppProps) {
  return (
    <Image
      src={
        negative
          ? "/logos/logo-no-background.svg"
          : "/logos/logo-black-_2lines.svg"
      }
      alt="Barragista Logo"
      width={width}
      height={0}
      style={{ width: "auto", height: "auto" }}
      priority
    />
  );
}

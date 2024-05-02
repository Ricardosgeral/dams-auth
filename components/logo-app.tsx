import Image from "next/image";

interface LogAppProps {
  width: number;
  height: number;
  negative?: boolean;
}

export default function LogoApp({ width, height, negative }: LogAppProps) {
  return (
    <Image
      src={
        negative
          ? "/logos/logo-no-background.svg"
          : "/logos/logo-black-_2lines.svg"
      }
      alt="Barragista Logo"
      width={width}
      height={height}
    />
  );
}

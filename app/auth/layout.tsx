export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative h-screen flex items-center justify-center overflow-hidden border-t">
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[800px] w-[600px] -translate-x-[30%] translate-y-[40%] rounded-full bg-[rgba(255,202,21,0.8)] opacity-50 blur-[180px]"></div>
        </div>

        <div className="relative z-10 ">{children}</div>
      </div>
    </>
  );
}

// bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-400 to-yellow-500

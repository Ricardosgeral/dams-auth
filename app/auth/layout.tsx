export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="h-screen flex items-center justify-center
    bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-400 to-yellow-500 border-t"
    >
      {children}
    </div>
  );
}

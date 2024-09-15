export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returned JSX
  return <div>Dashboard {children}</div>;
}

// Div for Home pages of different roles

export function HomePageLeft({ children }: { children: React.ReactNode }) {
  return <div className="w-full xl:w-2/3">{children}</div>;
}

export function HomePageRight({ children }: { children: React.ReactNode }) {
  return (
    <aside className="w-full xl:w-1/3 flex flex-col gap-8">{children}</aside>
  );
}

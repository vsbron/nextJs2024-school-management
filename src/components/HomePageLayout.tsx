import { HomePageSideProps } from "@/lib/types";

// Div for Home pages of different roles
export function HomePageLeft({ children }: HomePageSideProps) {
  return <div className="w-full xl:w-2/3 flex flex-col gap-4">{children}</div>;
}

export function HomePageRight({ children }: HomePageSideProps) {
  return (
    <aside className="w-full xl:w-1/3 flex flex-col gap-4">{children}</aside>
  );
}

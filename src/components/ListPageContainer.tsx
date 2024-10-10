import { ReactNode } from "react";

function ListPageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl flex-1 m-0 xs:m-4 xs:mt-0">
      {children}
    </div>
  );
}

export default ListPageContainer;

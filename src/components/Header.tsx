import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

async function Header() {
  // Getting the current user from the Clerk
  const user = await currentUser();

  // Returned JSX
  return (
    <header className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b-4 border-stone-50">
      {/* ICONS & USER */}
      <div className="flex items-center gap-6 justify-end w-full py-1">
        <div className="bg-white rounded-full w-5 h-5 cursor-pointer">
          <svg className="w-5 h-5 fill-gray-500">
            <use xlinkHref={`/setNavbar.svg#chat`}></use>
          </svg>
        </div>
        <div className="rounded-full w-5 h-5 cursor-pointer relative">
          <svg className="w-5 h-5 fill-gray-500">
            <use xlinkHref={`/setNavbar.svg#announcement`}></use>
          </svg>
          <div className="absolute -top-3 -right-3 w-4 h-4 flex items-center justify-center bg-schoolPurpleDark text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-sm leading-3 font-medium">
            {user?.fullName}
          </span>
          <span className="text-[10px] text-gray-500">
            {user?.publicMetadata.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </header>
  );
}

export default Header;

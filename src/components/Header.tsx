import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function Header() {
  // Getting the current user from the Clerk
  const user = await currentUser();

  // Returned JSX
  return (
    <header className="flex items-center justify-between p-4">
      {/* ICONS & USER */}
      <div className="flex items-center gap-6 justify-end w-full py-1">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5 fill-gray-500">
            <use xlinkHref={`/setNavbar.svg#chat`}></use>
          </svg>
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/nav/announcement.png"
            alt="Announcement"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
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

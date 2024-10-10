import { currentUser } from "@clerk/nextjs/server";
import ActiveLink from "./ActiveLink";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "home",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "teacher",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "student",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "parent",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "subject",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "class",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "lesson",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "exam",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "assignment",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "result",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "attendance",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "calendar",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "announcement",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "profile",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "logout",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

async function Menu() {
  // Getting the current user from the Clerk and the role from it
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  // Returned JSX
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-semibold mt-4 px-2">
            {i.title}
          </span>
          {i.items.map((menuItem) => {
            if (menuItem.visible.includes(role)) {
              return (
                <ActiveLink href={menuItem.href} key={menuItem.label}>
                  <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-1.5 md:px-2 cursor-pointer">
                    <svg className="w-5 h-5 fill-gray-500">
                      <use xlinkHref={`/setNavbar.svg#${menuItem.icon}`}></use>
                    </svg>
                    <span className="hidden lg:block">{menuItem.label}</span>
                  </div>
                </ActiveLink>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}

export default Menu;

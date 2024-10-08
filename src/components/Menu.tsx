import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import ActiveLink from "./ActiveLink";

export const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/nav/nav/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/nav/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/nav/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/nav/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/nav/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/nav/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/nav/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/announcement.png",
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
        icon: "/nav/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/nav/logout.png",
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
          <span className="hidden lg:block text-gray-400 font-light mt-4 px-2">
            {i.title}
          </span>
          {i.items.map((menuItem) => {
            if (menuItem.visible.includes(role)) {
              return (
                <ActiveLink href={menuItem.href} key={menuItem.label}>
                  <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-1.5 md:px-2 rounded-md hover:bg-schoolSkyLight cursor-pointer">
                    <Image
                      src={menuItem.icon}
                      alt={menuItem.label}
                      width={20}
                      height={20}
                    />
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

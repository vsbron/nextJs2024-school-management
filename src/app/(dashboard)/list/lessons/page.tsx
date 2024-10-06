import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { formatDateTime } from "@/lib/utils";

// Type for the lesson list with data from different tables
type LessonList = Lesson & {
  teacher: Teacher;
  class: Class;
  subject: Subject;
};

async function LessonList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Getting the user's role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  // Defining columns for table
  const columns = [
    {
      header: "Subject",
      accessor: "subject",
      className: "px-4",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by teacher id
        case "teacherId":
          query.teacherId = value;
          break;
        // Filtering by class id
        case "classId":
          query.classId = parseInt(value);
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { subject: { name: { contains: value, mode: "insensitive" } } },
            { teacher: { name: { contains: value, mode: "insensitive" } } },
          ];
        default:
          break;
      }
    }
  }

  // ROLE CONDITIONS - switch version
  switch (role) {
    case "teacher":
      query.teacherId = currentUserId!;
      break;
    default:
      break;
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        subject: true,
        class: true,
        teacher: true,
      },
      orderBy: { startTime: "desc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">
          {item.subject.name} ({item.class.name})
        </h3>
      </td>
      <td className="hidden md:table-cell">{formatDateTime(item.startTime)}</td>
      <td className="hidden md:table-cell">{formatDateTime(item.endTime)}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name[0]}. {item.teacher.surname}
      </td>
      {(role === "admin" || role === "teacher") && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="lesson" type="update" data={item} />
            <FormContainer table="lesson" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-xl flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All lessons</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="lesson" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table<LessonList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default LessonList;

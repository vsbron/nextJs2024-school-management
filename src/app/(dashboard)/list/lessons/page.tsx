import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableButtons from "@/components/TableButtons";
import TableHeader from "@/components/TableHeader";
import TableHeading from "@/components/TableHeading";
import TableSearch from "@/components/TableSearch";

// Type for the lesson list with data from different tables
type LessonList = Lesson & {
  teacher: Teacher;
  class: Class;
  subject: Subject;
};

async function LessonList({ searchParams }: SearchParamsProp) {
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
        <TableHeading>All lessons</TableHeading>
        <TableHeader>
          <TableSearch />
          <TableButtons role={role} table="lesson" />
        </TableHeader>
      </div>
      {/* LIST */}
      <Table<LessonList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination
        page={p}
        count={count}
        data={data}
        queryParams={queryParams}
      />
    </div>
  );
}

export default LessonList;

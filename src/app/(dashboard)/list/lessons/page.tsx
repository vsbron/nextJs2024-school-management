import { auth } from "@clerk/nextjs/server";

import { colHidden, mainCol } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import ListPageContainer from "@/components/ListPageContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";

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
    { header: "Subject", accessor: "subject", className: mainCol },
    { header: "Start Time", accessor: "startTime", className: colHidden },
    { header: "End Time", accessor: "endTime", className: colHidden },
    { header: "Teacher", accessor: "teacher", className: colHidden },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // QUERY FILTERING
  const query: Prisma.LessonWhereInput = {};

  // ROLE CONDITIONS
  switch (role) {
    case "teacher":
      query.teacherId = currentUserId!;
      break;
    case "parent":
      query.class = { students: { some: { parentId: currentUserId! } } };
      break;
    default:
      break;
  }

  // URL PARAMS CONDITIONS
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
          query.teacherId = undefined;
          query.classId = parseInt(value);
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { subject: { name: { contains: value, mode: "insensitive" } } },
            { teacher: { surname: { contains: value, mode: "insensitive" } } },
          ];
        default:
          break;
      }
    }
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
      orderBy: { subject: { name: "asc" } },
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
      <td className="xs:flex flex-col items-start py-2 xs:p-4">
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
    <ListPageContainer>
      {/* TOP */}
      <TableHeader title="All Lessons" role={role} table="lesson" />
      {/* LIST */}
      <Table<LessonList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination
        page={p}
        count={count}
        data={data}
        queryParams={queryParams}
      />
    </ListPageContainer>
  );
}

export default LessonList;

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Attendance, Class, Prisma, Student, Subject } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableButtons from "@/components/TableButtons";
import TableHeader from "@/components/TableHeader";
import TableHeading from "@/components/TableHeading";
import TableSearch from "@/components/TableSearch";

// Type for the assignment list with data from different tables
type AttendanceList = Attendance & {
  student: Student;
  lesson: { subject: Subject; class: Class };
};

async function AttendanceList({ searchParams }: SearchParamsProp) {
  // Getting the user ID and the role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    {
      header: "Student",
      accessor: "studentId",
      className: "px-4",
    },
    {
      header: "Lesson",
      accessor: "lesson",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Present",
      accessor: "present",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.AttendanceWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by student id
        case "studentId":
          query.studentId = value;
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { student: { name: { contains: value, mode: "insensitive" } } },
            {
              lesson: {
                subject: { name: { contains: value, mode: "insensitive" } },
              },
            },
          ];
        default:
          break;
      }
    }
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: true,
        lesson: { select: { subject: true, class: true } },
      },
      orderBy: { date: "desc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.attendance.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: AttendanceList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">
          {item.student.name} {item.student.surname}
        </h3>
      </td>
      <td className="hidden md:table-cell">
        {item.lesson.subject.name} ({item.lesson.class.name})
      </td>
      <td className="hidden md:table-cell">{formatDate(item.date)}</td>
      <td className="hidden md:table-cell">{item.present ? "Yes" : "No"}</td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="attendance" type="update" data={item} />
            <FormContainer table="attendance" type="delete" id={item.id} />
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
        <TableHeading>All Attendances</TableHeading>
        <TableHeader>
          <TableSearch />
          <TableButtons role={role} table="attendance" />
        </TableHeader>
      </div>
      {/* LIST */}
      <Table<AttendanceList>
        columns={columns}
        renderRow={renderRow}
        data={data}
      />
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

export default AttendanceList;

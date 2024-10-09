import Image from "next/image";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Attendance, Class, Prisma, Student, Subject } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";

// Type for the assignment list with data from different tables
type AttendanceList = Attendance & {
  student: Student;
  lesson: { subject: Subject; class: Class };
};

async function AttendanceList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
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
        <h2 className="hidden md:block text-lg font-semibold">
          All Attendances
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolOrange">
              <Image src="/sort.svg" width={14} height={14} alt="" />
            </button>
            {role === "admin" && (
              <FormContainer table="attendance" type="create" />
            )}
          </div>
        </div>
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

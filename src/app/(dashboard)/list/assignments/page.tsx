import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { formatDate } from "@/lib/utils";

// Type for the assignment list with data from different tables
type AssignmentList = Assignment & {
  lesson: { subject: Subject; class: Class; teacher: Teacher };
};

async function AssignmentList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // Getting the user ID and the role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  // Defining columns for table
  const columns = [
    {
      header: "Title",
      accessor: "title",
      className: "px-4",
    },
    {
      header: "Subject",
      accessor: "subject",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Date",
      accessor: "startDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Due date",
      accessor: "dueDate",
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
  const query: Prisma.AssignmentWhereInput = {};
  query.lesson = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by teacher id
        case "teacherId":
          query.lesson.teacherId = value;
          break;
        // Filtering by class id
        case "classId":
          query.lesson.classId = parseInt(value);
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { title: { contains: value, mode: "insensitive" } },
            {
              lesson: {
                subject: { name: { contains: value, mode: "insensitive" } },
              },
            },
            {
              lesson: {
                teacher: { name: { contains: value, mode: "insensitive" } },
              },
            },
          ];
        default:
          break;
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = { students: { some: { id: currentUserId! } } };
      break;
    case "parent":
      query.lesson.class = { students: { some: { parentId: currentUserId! } } };
      break;
    default:
      break;
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: { select: { subject: true, teacher: true, class: true } },
      },
      orderBy: { dueDate: "asc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: AssignmentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.title}</h3>
      </td>

      <td className="hidden md:table-cell">
        {item.lesson.subject.name} ({item.lesson.class.name})
      </td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name[0]}. {item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">{formatDate(item.startDate)}</td>
      <td className="hidden md:table-cell">{formatDate(item.dueDate)}</td>
      {(role === "admin" || role === "teacher") && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="assignment" type="update" data={item} />
            <FormContainer table="assignment" type="delete" id={item.id} />
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
          All Assignments
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolOrange">
              <Image src="/sort.svg" width={14} height={14} alt="" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table<AssignmentList>
        columns={columns}
        renderRow={renderRow}
        data={data}
      />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default AssignmentList;

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import {
  Announcement,
  Class,
  Event,
  Lesson,
  Prisma,
  Student,
  Teacher,
} from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableButtons from "@/components/TableButtons";
import TableHeader from "@/components/TableHeader";
import TableHeading from "@/components/TableHeading";
import TableSearch from "@/components/TableSearch";

// Type for the class list with data from different tables
type ClassList = Class & {
  lessons: Lesson[];
  students: Student[];
  events: Event[];
  announcements: Announcement[];
  supervisor: Teacher | null;
};

async function ClassList({ searchParams }: SearchParamsProp) {
  // Getting the user's role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    {
      header: "Class",
      accessor: "class",
      className: "px-4",
    },
    {
      header: "Capacity",
      accessor: "capacity",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
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

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.ClassWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by class id
        case "teacherId":
          query.supervisorId = value;
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { name: { contains: value, mode: "insensitive" } },
            { supervisor: { name: { contains: value, mode: "insensitive" } } },
          ];
        default:
          break;
      }
    }
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        lessons: true,
        students: true,
        events: true,
        announcements: true,
        supervisor: true,
      },
      orderBy: { name: "asc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td>{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisor?.name[0]}. {item.supervisor?.surname}
      </td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="class" type="update" data={item} />
            <FormContainer table="class" type="delete" id={item.id} />
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
        <TableHeading>All classes</TableHeading>
        <TableHeader>
          <TableSearch />
          <TableButtons role={role} table="class" />
        </TableHeader>
      </div>
      {/* LIST */}
      <Table<ClassList> columns={columns} renderRow={renderRow} data={data} />
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

export default ClassList;

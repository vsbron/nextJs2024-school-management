import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableButtons from "@/components/TableButtons";
import TableHeader from "@/components/TableHeader";
import TableHeading from "@/components/TableHeading";
import TableSearch from "@/components/TableSearch";

// Type for the teacher list with data from different tables
type TeacherList = Teacher & { subjects: Subject[]; classes: Class[] };

async function TeacherList({ searchParams }: SearchParamsProp) {
  // Getting the user's role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "px-4",
    },
    {
      header: "Teacher Id",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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
  const query: Prisma.TeacherWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by class id
        case "classId":
          query.lessons = { some: { classId: parseInt(value) } };
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { name: { contains: value, mode: "insensitive" } },
            { surname: { contains: value, mode: "insensitive" } },
          ];
        default:
          break;
      }
    }
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: { subjects: true, classes: true },
      orderBy: { name: "asc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.svg"}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          width={40}
          height={40}
          alt={item.name}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {item.name} {item.surname}
          </h3>
          <p className="text-sm text-gray-500 hidden md:table-cell">
            {item.email}
          </p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="rounded-full w-7 h-7 flex items-center justify-center bg-schoolSky">
              <Image src="/view.svg" width={16} height={16} alt="" />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  // Returned JSX
  return (
    <div className="bg-white py-4 xs:p-4 xs:rounded-xl flex-1 xs:m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <TableHeading>All teachers</TableHeading>
        <TableHeader>
          <TableSearch />
          <TableButtons role={role} table="teacher" />
        </TableHeader>
      </div>
      {/* LIST */}
      <Table<TeacherList> columns={columns} renderRow={renderRow} data={data} />
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

export default TeacherList;

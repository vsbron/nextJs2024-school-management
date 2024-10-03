import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Class, Prisma, Student } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

// Type for the student list with data from different tables
type StudentList = Student & { class: Class };

async function StudentList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
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
      header: "Student Id",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
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
  const query: Prisma.StudentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by teacher id
        case "teacherId":
          query.class = { lessons: { some: { teacherId: value } } };
          break;
        // Filtering by search input
        case "search":
          query.name = { contains: value, mode: "insensitive" };
        default:
          break;
      }
    }
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      include: { class: true },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.student.count({ where: query }),
  ]);

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          width={40}
          height={40}
          alt={item.name}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name[0]}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="rounded-full w-7 h-7 flex items-center justify-center bg-schoolSky">
              <Image src="/view.png" width={16} height={16} alt="" />
            </button>
          </Link>
          {role === "admin" && (
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  // Returned JSX
  return (
    <div className="bg-white p-4 rounded-xl flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h2 className="hidden md:block text-lg font-semibold">All students</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>
            {role === "admin" && (
              <FormContainer table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table<StudentList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default StudentList;

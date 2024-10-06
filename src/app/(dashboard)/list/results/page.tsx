import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Exam, Prisma, Result, Student } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";

// Type for the result list with data from different tables
type ResultsList = Result & { exam: Exam; student: Student };

async function ResultsList({
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
      header: "Exam",
      accessor: "exam",
      className: "px-4",
    },
    {
      header: "Student",
      accessor: "student",
      className: "hidden md:table-cell",
    },
    {
      header: "Score",
      accessor: "score",
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
  const query: Prisma.ResultWhereInput = {};
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
          // prettier-ignore
          query.OR = [
            { exam: { title: { contains: value, mode: "insensitive" } } },
            { OR: [
              { student: { name: { contains: value, mode: "insensitive" } } },
              { student: {surname: { contains: value, mode: "insensitive" } } },
            ] },
          ];
          break;
        default:
          break;
      }
    }
  }
  // ROLE CONDITIONS
  switch (role) {
    // case "teacher":
    //   query.exam = { lesson: { teacherId: currentUserId! } };
    //   break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;
    default:
      break;
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: { exam: true, student: true },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: ResultsList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 a:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.exam.title}</h3>
      </td>
      <td className="hidden md:table-cell">
        {item.student.name[0]}. {item.student.surname}
      </td>
      <td className="hidden md:table-cell">{item.score}</td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="result" type="update" data={item} />
            <FormContainer table="result" type="delete" id={item.id} />
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
        <h2 className="hidden md:block text-lg font-semibold">All Results</h2>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/filter.png" width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-schoolYellow">
              <Image src="/sort.png" width={14} height={14} alt="" />
            </button>
            {role === "admin" && <FormContainer table="result" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table<ResultsList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ResultsList;

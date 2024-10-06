import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import {
  Result,
  Prisma,
  Exam,
  Lesson,
  Subject,
  Teacher,
  Class,
  Student,
} from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { formatDate } from "@/lib/utils";

// Type for the result list with data from different tables
type ResultList = Result & {
  exam: Exam & {
    lesson: Lesson & { class: Class; subject: Subject; teacher: Teacher };
  };
  student: Student;
};

async function ResultList({
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
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Student",
      accessor: "student",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
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
        // Filtering by teacher id
        case "teacherId":
          break;
        // Filtering by class id
        case "classId":
          break;
        // Filtering by search input
        case "search":
        default:
          break;
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      break;
    case "student":
      break;
    case "parent":
      break;
    default:
      break;
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        exam: {
          select: {
            title: true,
            startTime: true,
            lesson: {
              select: {
                teacher: { select: { name: true, surname: true } },
                subject: { select: { name: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        student: { select: { name: true, surname: true } },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.exam.title}</h3>
      </td>
      <td className="hidden md:table-cell">{item.exam.lesson.subject.name}</td>
      <td className="hidden md:table-cell">{item.exam.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {formatDate(item.exam.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {item.student.name[0]}. {item.student.surname}
      </td>
      <td className="hidden md:table-cell">
        {item.exam.lesson.teacher.name[0]}. {item.exam.lesson.teacher.surname}
      </td>
      {(role === "admin" || role === "teacher") && (
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
      <Table<ResultList> columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ResultList;

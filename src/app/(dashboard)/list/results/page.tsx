import Image from "next/image";

import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { auth } from "@clerk/nextjs/server";

// Type for the results list with data from different tables
type ResultsList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

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
      header: "Title",
      accessor: "title",
      className: "px-4",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
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
            { student: { name: { contains: value, mode: "insensitive" } } },
              { exam: { lesson: { teacher: { OR: [
                { name: { contains: value, mode: "insensitive" } },
                { surname: { contains: value, mode: "insensitive" } },
              ] } } } },
          ];
          break;
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
      query.exam = { lesson: { teacherId: currentUserId! } };
      break;
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
  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: true,
        exam: {
          include: { lesson: { select: { class: true, teacher: true } } },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  // Creating special data object that combines all possible data exam
  const data = dataRes
    .map((item) => {
      const assessment = item.exam;
      if (!assessment) return null; // Guard clause
      const isExam = "startTime" in assessment;
      return {
        id: item.id,
        title: assessment.title,
        studentName: item.student.name,
        studentSurname: item.student.surname,
        teacherName: assessment.lesson.teacher.name,
        teacherSurname: assessment.lesson.teacher.surname,
        score: item.score,
        className: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : "",
      };
    })
    .filter((item): item is ResultsList => item !== null); // Type guard to filter out nulls

  // Creating the function that renders a data row in the table
  const renderRow = (item: ResultsList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 a:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.title}</h3>
      </td>
      <td>{item.studentName + " " + item.studentSurname}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      {(role === "admin" || role === "teacher") && (
        <td>
          <div className="flex items-center gap-2">
            <FormModal table="result" type="update" data={item} />
            <FormModal table="result" type="delete" id={item.id} />
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
            {role === "admin" && <FormModal table="result" type="create" />}
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

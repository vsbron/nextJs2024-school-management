import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { colHidden, colHiddenEarly, mainCol } from "@/lib/constants";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import ListPageContainer from "@/components/ListPageContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";

// Type for the teacher list with data from different tables
type TeacherList = Teacher & { subjects: Subject[]; classes: Class[] };

async function TeacherList({ searchParams }: SearchParamsProp) {
  // Getting the user's role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    { header: "Info", accessor: "info", className: mainCol },
    { header: "Teacher Id", accessor: "teacherId", className: colHidden },
    { header: "Subjects", accessor: "subjects", className: colHidden },
    { header: "Classes", accessor: "classes", className: colHidden },
    { header: "Phone", accessor: "phone", className: colHiddenEarly },
    { header: "Address", accessor: "address", className: colHiddenEarly },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // QUERY FILTERING
  const query: Prisma.TeacherWhereInput = {};

  // URL PARAMS CONDITIONS
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
          break;
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
      <td className="flex items-center gap-4 py-1 sm:p-4">
        <Image
          src={item.img || "/noAvatar.svg"}
          className="md:hidden xl:block w-8 h-8 xs:w-10 xs:h-10 rounded-full object-cover"
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
    <ListPageContainer>
      {/* TOP */}
      <TableHeader title="All Teachers" role={role} table="teacher" />
      {/* LIST */}
      <Table<TeacherList> columns={columns} renderRow={renderRow} data={data} />
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

export default TeacherList;

import { auth } from "@clerk/nextjs/server";

import { colHidden, mainCol } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { Prisma, Subject, Teacher } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import ListPageContainer from "@/components/ListPageContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";

// Type for the subject list with data from different tables
type SubjectList = Subject & { teachers: Teacher[] };

async function SubjectList({ searchParams }: SearchParamsProp) {
  // Getting the user's role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    { header: "Subject Names", accessor: "subject", className: mainCol },
    { header: "Teachers", accessor: "teachers", className: colHidden },
    { header: "Actions", accessor: "action" },
  ];

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // ROLE CONDITIONS
  const query: Prisma.SubjectWhereInput = {};

  // URL PARAMS CONDITIONS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by teacher id
        case "teacherId":
          query.teachers = { some: { id: value } };
          break;
        // Filtering by search input
        case "search":
          query.OR = [
            { name: { contains: value, mode: "insensitive" } },
            {
              teachers: {
                some: { surname: { contains: value, mode: "insensitive" } },
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
    prisma.subject.findMany({
      where: query,
      include: { teachers: true, lessons: true },
      orderBy: { name: "asc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="xs:flex flex-col items-start py-2 xs:p-4">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">
        {item.teachers
          .map(
            (teacherItem) => teacherItem.name[0] + ". " + teacherItem.surname
          )
          .join(", ")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="subject" type="update" data={item} />
          <FormContainer table="subject" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  // Returned JSX
  return (
    <ListPageContainer>
      {/* TOP */}
      <TableHeader title="All Subjects" role={role} table="subject" />
      {/* LIST */}
      <Table<SubjectList> columns={columns} renderRow={renderRow} data={data} />
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

export default SubjectList;

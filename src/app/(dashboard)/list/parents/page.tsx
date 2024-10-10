import { auth } from "@clerk/nextjs/server";

import { colHidden, colHiddenEarly, mainCol } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { Parent, Prisma, Student } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import ListPageContainer from "@/components/ListPageContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";

// Type for the student list with data from different tables
type ParentList = Parent & { students: Student[] };

async function ParentList({ searchParams }: SearchParamsProp) {
  // Getting the user's role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Defining columns for table
  const columns = [
    { header: "Info", accessor: "info", className: mainCol },
    { header: "Students", accessor: "students", className: colHidden },
    { header: "Email", accessor: "email", className: colHiddenEarly },
    { header: "Phone", accessor: "phone", className: colHiddenEarly },
    { header: "Address", accessor: "address", className: colHiddenEarly },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];
  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.ParentWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by parent id
        case "parentId":
          query.students = { some: { parentId: value } };
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
    prisma.parent.findMany({
      where: query,
      include: { students: true },
      orderBy: { name: "asc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="xs:flex flex-col items-start py-2 xs:p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">
            {item.name} {item.surname}
          </h3>
          <p className="text-sm text-gray-500 hidden md:table-cell">
            {item.email}
          </p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((studentItem) => studentItem.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.email}</td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="parent" type="update" data={item} />
            <FormContainer table="parent" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  // Returned JSX
  return (
    <ListPageContainer>
      {/* TOP */}
      <TableHeader title="All Parents" role={role} table="parent" />
      {/* LIST */}
      <Table<ParentList> columns={columns} renderRow={renderRow} data={data} />
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

export default ParentList;

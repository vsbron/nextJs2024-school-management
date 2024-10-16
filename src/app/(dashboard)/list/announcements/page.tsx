import { auth } from "@clerk/nextjs/server";

import { colHidden, mainCol } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { SearchParamsProp } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Announcement, Class, Prisma } from "@prisma/client";

import FormContainer from "@/components/FormContainer";
import ListPageContainer from "@/components/ListPageContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableHeader from "@/components/TableHeader";

// Type for the announcement list with data from different tables
type AnnouncementList = Announcement & { class: Class | null };

async function AnnouncementList({ searchParams }: SearchParamsProp) {
  // Getting the user ID and the role
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  // Defining columns for table
  const columns = [
    { header: "Title", accessor: "title", className: mainCol },
    { header: "Class", accessor: "class", className: colHidden },
    { header: "Date", accessor: "date" },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  // Destructuring the searchParams and setting our current page
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  // QUERY FILTERING
  const query: Prisma.AnnouncementWhereInput = {};

  // ROLE CONDITIONS
  switch (role) {
    case "teacher":
      query.OR = [
        { classId: null },
        { class: { lessons: { some: { teacherId: currentUserId! } } } },
      ];
      break;
    case "student":
      query.OR = [
        { classId: null },
        { class: { students: { some: { id: currentUserId! } } } },
      ];
      break;
    case "parent":
      query.OR = [
        { classId: null },
        { class: { students: { some: { parentId: currentUserId! } } } },
      ];
      break;
    default:
      break;
  }

  // URL PARAMS CONDITIONS
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      // Guard clause
      if (!value) return;

      // Switch statement to cover all available search params
      switch (key) {
        // Filtering by class id
        case "classId":
          query.OR = [{ class: { id: parseInt(value) } }, { class: null }];
          break;
        // Filtering by search input
        case "search":
          query.title = { contains: value, mode: "insensitive" };
        default:
          break;
      }
    }
  }

  // Fetching the data from the database and setting the pagination constants
  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: { class: true },
      orderBy: { date: "desc" },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);

  // Creating the function that renders a data row in the table
  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schoolPurpleLight"
    >
      <td className="xs:flex flex-col items-start py-2 xs:p-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-500 hidden md:table-cell">{item.description}</p>
      </td>
      <td className="hidden md:table-cell">{item.class?.name || "-"}</td>
      <td>{formatDate(item.date)}</td>
      {role === "admin" && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="announcement" type="update" data={item} />
            <FormContainer table="announcement" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  // Returned JSX
  return (
    <ListPageContainer>
      {/* TOP */}
      <TableHeader title="All Announcements" role={role} table="announcement" />

      {/* LIST */}
      <Table<AnnouncementList>
        columns={columns}
        renderRow={renderRow}
        data={data}
      />
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

export default AnnouncementList;

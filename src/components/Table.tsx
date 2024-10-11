import { TableProps } from "@/lib/types";

function Table<T>({ columns, renderRow, data }: TableProps<T>) {
  // Guard clause in case there's no data
  if (data.length === 0)
    return (
      <div className="my-8 font-semibold">
        Sorry, there&apos;s no data to display. Please try again!
      </div>
    );

  // Returned JSX
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
}

export default Table;

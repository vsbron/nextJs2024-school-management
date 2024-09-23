"use client";
import { useRouter } from "next/navigation";
import { ITEMS_PER_PAGE } from "@/lib/settings";

function Pagination({ page, count }: { page: number; count: number }) {
  // Getting the router
  const router = useRouter();

  // Calculating whether we have next or previous pages
  const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count;

  // Handle page change
  const handlePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  // Returned JSX
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePage(page + -1)}
        disabled={!hasPrev}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / ITEMS_PER_PAGE) }).map(
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={index}
                className={`px-2 rounded-sm ${
                  pageIndex === page ? "bg-schoolSky" : ""
                }`}
                onClick={() => handlePage(pageIndex)}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePage(page + 1)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

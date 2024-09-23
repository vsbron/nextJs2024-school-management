"use client";

import { ITEMS_PER_PAGE } from "@/lib/settings";

function Pagination({ page, count }: { page: number; count: number }) {
  // Handle Next page
  const handleNext = () => {};
  // Handle Prev page
  const handlePrev = () => {};
  // Handle Change page
  const handlePage = () => {};

  // Returned JSX
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrev}
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
                onClick={handlePage}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

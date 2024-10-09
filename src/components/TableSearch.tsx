"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

function TableSearch() {
  // Getting the router object
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    // Preventing default behavior
    e.preventDefault();

    // Getting the search field value
    const value = (e.currentTarget[0] as HTMLInputElement).value;

    // Setting the search params with the new search value
    const params = new URLSearchParams(window.location.search);
    value !== "" ? params.set("search", value) : params.delete("search");
    router.push(`${window.location.pathname}?${params}`);
  };

  // Returned JSX
  return (
    <form
      onSubmit={handleSearch}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src="/search.svg" alt="Search" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
}

export default TableSearch;

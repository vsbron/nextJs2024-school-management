import Image from "next/image";

function UserCard({ type }: { type: string }) {
  // Returned JSX
  return (
    <div className="rounded-2xl odd:bg-schoolPurple even:bg-schoolYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" width={20} height={20} alt="More" />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
}

export default UserCard;

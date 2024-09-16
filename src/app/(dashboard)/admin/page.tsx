import UserCard from "@/components/UserCard";

function AdminPage() {
  // Returned JSX
  return <div className="flex flex-col md:flex-row gap-4 p-4">

    {/* LEFT */}
    <div className="w-full lg:w-2/3">
      {/* USER CARDS */}
      <div className="flex gap-4 justify-between">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>
    </div>

    {/* RIGHT */}
    <div className="w-full lg:w-1/3">Right</div>
  </div>;
}

export default AdminPage;

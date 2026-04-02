import { UserPlus } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-gray-500">
            Manage system users and their roles
          </p>
        </div>
        <button className="bg-[#1C6FA2] text-white !px-2 !py-1 rounded-lg flex items-center gap-2 cursor-pointer text-sm">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      
    </>
  );
}

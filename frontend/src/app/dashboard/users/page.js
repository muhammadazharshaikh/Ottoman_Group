"use client";
import { Eye, Pencil, UserPlus } from "lucide-react";
import {useState, useEffect, use} from "react";
import axios from "@/lib/axiosInstance";
import GetDateTime from "@/components/GetDateTime";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/all");
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          console.error("API error:", error.response.data);
        }
      }
    };

    fetchUsers();
  }, []);


  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-gray-500">
            Manage system users and their roles
          </p>
        </div>
        <Link href="/dashboard/users/create">
        <button className="bg-[#1C6FA2] text-white !px-2 !py-1 rounded-lg flex items-center gap-2 cursor-pointer text-sm">
          <UserPlus size={20} />
          Add User
        </button>
        </Link>
      </div>
      {/* ///////////////////////////////////////// table //////////////////////////////////////// */}
          <div className="overflow-x-auto !mt-10 !mb-4">
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm text-gray-500">
              <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-600">
                <tr>
                  <th className="!py-4 border-b">user id</th>
                  <th className="border-b">name</th>
                  <th className="border-b">email</th>
                  <th className="border-b">phone</th>
                  <th className="border-b">role</th>
                  <th className="border-b">status</th>
                  <th className="border-b">Last Login</th>
                  <th className="border-b">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {users?.map((user)=>(
                  <tr className="hover:bg-gray-50 transition-colors" key={user.userId}>
                  <td className="px-6 py-4">USR-0000{user.userId}</td>
                  <td className="px-6 py-4">
                    <span className="capitalize px-2 py-1 text-green-700 rounded-md text-xs font-bold">
                      {user.fullName}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 font-mono">{user.phoneNumber}</td>
                  <td className="px-6 py-4">---</td>
                  <td className="px-6 py-4">
                    <span className="text-red-500 font-semibold underline decoration-2">
                      {user.status ? "active" : "inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4"><GetDateTime ISOString={user.lastLogin} /> </td>
                  <td className="!py-3">
                    <button className="text-indigo-600 hover:text-indigo-900 font-bold flex gap-4">
                      <Link href={`/dashboard/users/${user.userId}`} title="view">
                        <Eye size={16} />
                      </Link>
                      <Link href={`/dashboard/users/${user.userId}/edit`} title="edit">
                        <Pencil size={16} />
                      </Link>
                    </button>
                  </td>
                </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-2xl text-center !py-4">
                      Loading ...
                    </td>
                  </tr>
                ) }
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-xs text-gray-400">
            Showing 1 to 10 of 50 entries
          </div>
    </>
  );
}

"use client";
import { Eye, Pencil, Trash2, User, UserPlus } from "lucide-react";
import { useState, useEffect, use, useMemo } from "react";
import axios from "@/lib/axiosInstance";
import GetDateTime from "@/components/GetDateTime";
import Link from "next/link";
import DataTable from "@/components/DataTable";

export default function Home() {
  const [users, setUsers] = useState([]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/users/delete/${id}`);
      alert("Deleted Successfully");
      window.location.reload();
    } catch (err) {
      console.log("Error Occurred while deleting user ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/all",{
          headers:{
            'Authorization': `jwt ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          console.error("API error:", error.response.data);
        }
      }
    };

    fetchUsers();
  }, []);

  // Columns definition (Memoized for performance)
  const columns = [
    {
      header: "User ID",
      accessorKey: "userId",
      cell: (info) => `USR-0000${info.getValue()}`,
    },
    {
      header: "Name",
      accessorKey: "fullName",
      cell: (info) => (
        <span className="capitalize text-green-700 rounded-md text-sm font-bold">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => (
        <span
          className={`font-semibold underline decoration-2 ${info.getValue() ? "text-green-500" : "text-red-500"}`}
        >
          {info.getValue() ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin",
      cell: (info) => (
        <span
          className={`font-semibold decoration-2`}
        >
          {<GetDateTime ISOString = {info.getValue()} />}
        </span>
      ),
    },
    {
      header: "Actions",
      id: "actions", // ID zaroori hai agar accessorKey nahi hai
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Link
            href={`/dashboard/users/${row.original.userId}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/dashboard/users/${row.original.userId}/edit`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Pencil size={16} />
          </Link>
          <button
            className="text-red-600 cursor-pointer hover:text-indigo-900"
            onClick={(e) => {
              handleDelete(e, row.original.userId);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

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
      <DataTable data={users} columns={columns} />
    </>
  );
}

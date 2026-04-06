"use client";
import { Eye, Pencil, Trash2, User, UserPlus } from "lucide-react";
import { useState, useEffect, use, useMemo } from "react";
import axios from "@/lib/axiosInstance";
import GetDateTime from "@/components/GetDateTime";
import Link from "next/link";
import DataTable from "@/components/DataTable";
import {toast} from "react-toastify";

export default function Home() {
  const [projects, setProjects] = useState([]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(`/projects/delete/${id}`,{
        headers:{
          'Authorization':`jwt ${token}`,
          'Content-Type':'application/json'
        }
      });
      toast.success("Deleted Successfully");
      window.location.reload();
    } catch (err) {
      toast.warn(err?.response?.data?.detail);
      console.log("Error Occurred while deleting user ", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects/all",{
          headers:{
            'Authorization': `jwt ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProjects(response.data);
      } catch (error) {
        if (error.response) {
          console.error("API error:", error.response.data);
        }
      }
    };

    fetchProjects();
  }, []);

  // Columns definition (Memoized for performance)
  const columns = [
    {
      header: "Project ID",
      accessorKey: "id",
      cell: (info) => `PRJ-0000${info.getValue()}`,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (info) => (
        <span className="capitalize text-green-700 rounded-md text-sm font-bold">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Total Flats",
      accessorKey: "totalFlats",
    },
    {
      header: "Total Floors",
      accessorKey: "totalFloors",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created By",
      accessorKey: "creator.fullName",
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
      header: "Actions",
      id: "actions", // ID zaroori hai agar accessorKey nahi hai
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Link
            href={`/dashboard/projects/${row.original.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Eye size={16} />
          </Link>
          <Link
            href={`/dashboard/projects/${row.original.id}/edit`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Pencil size={16} />
          </Link>
          <button
            className="text-red-600 cursor-pointer hover:text-indigo-900"
            onClick={(e) => {
              handleDelete(e, row.original.id);
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
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-gray-500">
            Manage all apartment projects
          </p>
        </div>
        <Link href="/dashboard/projects/create">
          <button className="bg-[#1C6FA2] text-white !px-2 !py-1 rounded-lg flex items-center gap-2 cursor-pointer text-sm">
            <UserPlus size={20} />
            Add Project
          </button>
        </Link>
      </div>
      {/* ///////////////////////////////////////// table //////////////////////////////////////// */}
      <DataTable data={projects} columns={columns} />
    </>
  );
}

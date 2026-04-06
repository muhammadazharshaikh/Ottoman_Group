"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CircleUserRound, Mail, Phone, UserCheck } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axiosInstance";
import GetDateTime from "@/components/GetDateTime";

export default function page() {
  const { project_id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Fetch project data based on project_id
    const token = localStorage.getItem('token');
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/project/${project_id}`,{
          headers:{
            'Authorization': `jwt ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setProject(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error fetching project:", error);
        }
      }
    };

    fetchProject();
  }, [project_id]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="!my-5">
          <div className="flex gap-4 items-center">
            <CircleUserRound size={50} />
            <div className="">
              <h1 className="text-2xl font-semibold capitalize">
                {project?.name}
              </h1>
              <p>User ID: PRJ-0000{project_id}</p>
            </div>
          </div>
        </div>
        <div className="p-[20px]">
          <div className="flex md:justify-end">
            <Link href="/dashboard/projects">
              <button className="bg-gray-200 rounded-lg !p-2 cursor-pointer flex gap-2">
                <ArrowLeft />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      {project && (
        <div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 !mt-5">
            <div>
              <p className="flex gap-2 items-center">
                <Mail size={16} />
                <strong> Status:</strong> {project?.status == true ? "Active" : "Inactive"}
              </p>
              <p className="flex gap-2 items-center">
                {" "}
                <Phone size={16} /> <strong>Location:</strong>{" "}
                {project?.location}
              </p>
            </div>
            <div>
              <p className="flex gap-2 items-center">
                <Mail size={16} />
                <strong> Total Floors:</strong> {project?.totalFloors}
              </p>
              <p className="flex gap-2 items-center">
                {" "}
                <Phone size={16} /> <strong>Total Flats:</strong>{" "}
                {project?.totalFlats}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 !mt-5">
            <div>
              <p className="flex gap-2 items-center">
                <UserCheck size={16} />
                <strong> Description:</strong> {project?.description}
              </p>
              <p className="flex gap-2 items-center">
                <UserCheck size={16} />
                <strong> Created by:</strong> {project?.creator?.fullName}
              </p>
            </div>
          </div>
        </div>
      )}
      {
        !project && (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl !mt-30 font-semibold">Loading...</h1>
          </div>
        )
      }
    </>
  );
}

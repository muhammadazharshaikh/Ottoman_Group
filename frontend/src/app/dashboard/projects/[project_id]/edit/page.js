"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextArea";

export default function page() {
  const { project_id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [totalFlats, setTotalFlats] = useState("");
  const [description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`/projects/project/${project_id}`,{
          headers:{
            'Authorization':`jwt ${token}`,
            'Content-Type':'application/json'
          }
        });
        const data = res.data;
        setName(data?.name);
        setLocation(data?.location);
        setTotalFloors(data?.totalFloors);
        setTotalFlats(data?.totalFlats);
        setDescription(data?.description);
      } catch (err) {
        if (err) {
          toast.warn(err?.response?.data?.detail);
        }
      }
    };
    getUserDetails();
  }, [project_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!name || !location || !totalFloors || !totalFlats || !description) {
      toast.warn("Please fill in all fields.");
      return;
    }
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const res = await axios.put(`/projects/update/${project_id}`, {
        name,
        location,
        totalFloors,
        totalFlats,
        description
      },{
        headers:{
          'Authorization':`jwt ${token}`,
          'Content-Type':'application/json'
        }
      });
      toast.success("Project Updated Successfully");
      window.location.reload();
    } catch (err) {
      setLoading(false);
      toast.warn(err?.response?.data?.detail);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="p-[20px]">
          <div>
            <h1 className="text-2xl font-semibold">Edit Project</h1>
            <p className="text-sm text-gray-500">
              Update project information
            </p>
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

      {/* /////////////////// Form //////////////////// */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <FormInput
            label={"Project Name"}
            value={name}
            setValue={setName}
            placeholder="Enter project name"
            required
          />

          <FormInput
            label={"Location"}
            value={location}
            setValue={setLocation}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <FormInput
            label={"Total Floors"}
            value={totalFloors}
            setValue={setTotalFloors}
            placeholder="Total Floors"
            type="number"
            required
          />
          <FormInput
            label={"Total Flats"}
            value={totalFlats}
            setValue={setTotalFlats}
            placeholder="Total Flats"
            type="number"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <FormTextArea
            label={"Description"}
            value={description}
            setValue={setDescription}
            placeholder="Enter Description"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#1C6FA2] !px-4 !py-2 text-white font-semibold rounded-lg !mr-6 cursor-pointer"
          >
            {Loading == true ? "Saving ..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

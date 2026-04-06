"use client";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextArea";

export default function page() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [totalFlats, setTotalFlats] = useState("");
  const [description, setDescription] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    // Validate form data
    if (
      !name ||
      !location ||
      !totalFloors ||
      !totalFlats ||
      !description
    ) {
      toast.warn("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/projects/create", {
        name,
        location,
        totalFloors,
        totalFlats,
        description,
      },{
        headers: {
          'Authorization': `jwt ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

      setName("");
      setLocation("");
      setTotalFloors("");
      setTotalFlats("");
      setDescription("");
      toast.success("Project Created Successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.warn(err?.response?.data?.detail);
      console.log(
        "Error Occurred while adding project",
        err?.response?.data?.detail,
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="p-[20px] !mx-6">
          <div>
            <h1 className="text-2xl font-semibold">Add Project</h1>
            <p className="text-sm text-gray-500">
              Add and manage apartment projects
            </p>
          </div>
        </div>
        <div className="p-[20px]">
          <div className="flex md:justify-end">
            <Link href="/dashboard/users">
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
            placeholder="e.g. Ottoman-Group"
            required
          />

          <FormInput
            label={"Location"}
            value={location}
            setValue={setLocation}
            placeholder="e.g. Hyderabad"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <FormInput
            label={"Total Floors"}
            value={totalFloors}
            setValue={setTotalFloors}
            placeholder="e.g. 10"
            type="number"
            required
          />

          <FormInput
            label={"Total Flats/Units"}
            value={totalFlats}
            setValue={setTotalFlats}
            placeholder="e.g. 120"
            type="number"
            required
          />
        </div>

        <div>
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
            {Loading == true ? "Creating Project ..." : "Create Project"}
          </button>
        </div>
      </form>
    </>
  );
}

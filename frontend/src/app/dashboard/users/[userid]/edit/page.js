"use client";
import { useState, useEffect } from "react";
import {useParams} from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";

export default function page() {
  const { userid } = useParams();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(()=>{
    const getUserDetails = async () =>{
        try{
            const res = await axios.get(`/users/user/${userid}`);
            const data = res.data;
            setFullName(data.fullName);
            setPhoneNumber(data.phoneNumber);
        }catch(err){
            if(err){
                console.log(err);
            }
        }
    }
    getUserDetails();
  },[userid])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!fullName || !phoneNumber || !role) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try{
      const res = await axios.put(`/users/update/${userid}`,{
      fullName,
      phoneNumber
    });
    alert("User Updated Successfully");
    window.location.reload();

    } catch (err){
      setLoading(false);
      console.log("Error Occurred while Updating User", err);
    }
  };


  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="p-[20px]">
          <div>
            <h1 className="text-2xl font-semibold">Edit User</h1>
            <p className="text-sm text-gray-500">
              Add a new system user and assign a role.
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
        <div>
          <label htmlFor="email" className="!px-6 font-semibold">
            Full Name *
          </label>
          <div className="relative !mx-6 !my-2">
            <input
              type="text"
              name="email"
              id="email"
              className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>
         <div>
          <label htmlFor="email" className="!px-6 font-semibold">
            Phone Number *
          </label>
          <div className="relative !mx-6 !my-2">
            <input
              type="text"
              name="email"
              id="email"
              className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
              placeholder="+92 318 3047011"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
        <div>
          <label htmlFor="email" className="!px-6 font-semibold">
            Select a role
          </label>
          <select
            id="countries"
            className="rounded-lg focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700 block w-full !p-3 !mt-2  text-sm rounded-base !w-90 md:!mx-6 !mx-3"
            value={role}
            onChange={(e) => setRole(e.target.value)}

          >
            <option selected>Select role</option>
            <option value="system admin">System Admin</option>
            <option value="accounts officer">Accounts Officer</option>
            <option value="booking officer">Booking Officer</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-[#1C6FA2] !px-4 !py-2 text-white font-semibold rounded-lg !mr-6 cursor-pointer">
          {
            Loading == true ? ("Saving ...") : ("Save Changes")
          }
        </button>
      </div>
      </form>
    </>
  );
}

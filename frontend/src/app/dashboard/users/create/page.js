"use client";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";
import {toast} from "react-toastify";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";

export default function page() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      toast.warn("Please fill in all fields.");
      return;
    }
    if (password != confirmPassword) {
      toast.warn("Password and Confirm Password are not matched!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/users/create", {
        username,
        email,
        password,
        fullName,
        phoneNumber,
      });

      setUsername("");
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      toast.success("User Created Successfully!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.warn(err?.response?.data?.detail);
      console.log("Error Occurred while adding user", err?.response?.data?.detail);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="p-[20px] !mx-6">
          <div>
            <h1 className="text-2xl font-semibold">Create User</h1>
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
            <FormInput 
              label={"Full Name"}
              value={fullName}
              setValue={setFullName}
              placeholder="e.g. John Doe"
              required  
            />

            <FormInput 
              label={"Email Address"}
              value={email}
              setValue={setEmail}
              placeholder="Enter Email Address"
              required  
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <FormInput 
              label={"Username"}
              value={username}
              setValue={setUsername}
              placeholder="Enter Username"
              required  
            />
          
          <FormInput 
              label={"Phone Number"}
              value={phoneNumber}
              setValue={setPhoneNumber}
              placeholder="+92318 3047 011"
              required  
            />
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
              <option defaultValue={role}>Select role</option>
              <option value="system admin">System Admin</option>
              <option value="accounts officer">Accounts Officer</option>
              <option value="booking officer">Booking Officer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <PasswordInput
            label="Password"
            value={password}
            setValue={setPassword}
            placeholder="Enter Password"
            required
          />
          
          <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder="Enter Confirm Password"
          required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#1C6FA2] !px-4 !py-2 text-white font-semibold rounded-lg !mr-6 cursor-pointer"
          >
            {Loading == true ? "Creating User ..." : "Create User"}
          </button>
        </div>
      </form>
    </>
  );
}

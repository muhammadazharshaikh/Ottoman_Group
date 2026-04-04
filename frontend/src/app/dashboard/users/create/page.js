"use client";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";

export default function page() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [Loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

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
      alert("Please fill in all fields.");
      return;
    }
    if (password != confirmPassword) {
      alert("Password and Confirm Password are not matched!");
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
      alert("User Created Successfully!");
      setLoading(false);
    } catch (err) {
      setUsername("");
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setLoading(false);
      console.log("Error Occurred while adding user", err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="p-[20px]">
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
              Email Address *
            </label>
            <div className="relative !mx-6 !my-2">
              <input
                type="text"
                name="email"
                id="email"
                className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 !my-4">
          <div>
            <label htmlFor="email" className="!px-6 font-semibold">
              Username *
            </label>
            <div className="relative !mx-6 !my-2">
              <input
                type="text"
                name="username"
                id="username"
                className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
                placeholder="@jhondoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
          <div>
            <label htmlFor="email" className="!px-6 font-semibold">
              Password *
            </label>
            <div className="relative !mx-6 !my-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="flex items-center absolute inset-y-0 right-6 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-500" />
                ) : (
                  <Eye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="!px-6 font-semibold">
              Password *
            </label>
            <div className="relative !mx-6 !my-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="!p-3 rounded-lg mx-3 w-full focus:bg-[#E8F0FE] border border-gray-300 outline-none focus:border-2 focus:border-blue-700"
                placeholder="Enter your confirm password"
                required
              />
              <button
                type="button"
                className="flex items-center absolute inset-y-0 right-6 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-gray-500" />
                ) : (
                  <Eye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
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

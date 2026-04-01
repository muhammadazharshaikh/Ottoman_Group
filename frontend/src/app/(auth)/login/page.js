"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`Email: ${email}\nPassword: ${password}`);
      setEmail("");
      setPassword("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white rounded-lg p-10 mx-w-md lg:w-[500px] overflow-auto"
          style={{ margin: "auto" }}
        >
          <Image
            src={"/images/ottoman.png"}
            className="!m-auto !py-5"
            width={100}
            height={100}
            alt="logo"
          />
          <h1 className="text-center text-2xl font-semibold">
            Sign in to Ottoman Group
          </h1>
          <p className="text-center text-sm !py-2 text-gray-600">
            Manage your projects and clients from one place.
          </p>

          <label htmlFor="email" className="!px-6 font-semibold">
            Email *
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
          <div className="flex justify-end !mx-6 !py-2 text-sm text-blue-700 font-semibold">
            <a href="">Forgot password?</a>
          </div>
          <div className="!px-6 !pt-2 !pb-10">
            <button
              type="submit"
              className="bg-[#195F8C] !px-2 !py-3 text-white font-semibold rounded-lg w-full cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

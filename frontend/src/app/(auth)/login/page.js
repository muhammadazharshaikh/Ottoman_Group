"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import FormInput from "@/components/FormInput";
import PasswordInput from "@/components/PasswordInput";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8000/users/login", {
          email,
          password,
        });

        // Save token
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        window.location.href = "/dashboard";
      } catch (err) {
        if (err.response) {
          toast.warn(err.response?.data?.detail);
        }
      } finally {
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } else {
      toast.warn("Please fill in all fields.");
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

          <FormInput
            label={"Email"}
            value={email}
            setValue={setEmail}
            placeholder="Enter Email"
            required
          />

          <PasswordInput
            label="Password"
            value={password}
            setValue={setPassword}
            required
          />

          <div className="flex justify-end !mx-6 !py-2 text-sm text-blue-700 font-semibold">
            <a href="">Forgot password?</a>
          </div>
          <div className="!px-6 !pt-2 !pb-10">
            <button
              type="submit"
              className="bg-[#195F8C] !px-2 !py-3 text-white font-semibold rounded-lg w-full cursor-pointer"
            >
              {
                Loading==true ? ("Signing...") : ("Sign in") 
              }
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

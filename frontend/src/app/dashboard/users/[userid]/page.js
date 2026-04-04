"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CircleUserRound, Mail, Phone, UserCheck } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axiosInstance";
import GetDateTime from "@/components/GetDateTime";

export default function page() {
  const { userid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data based on userid
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/user/${userid}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userid]);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="!my-5">
          <div className="flex gap-4 items-center">
            <CircleUserRound size={50} />
            <div className="">
              <h1 className="text-2xl font-semibold capitalize">
                {user?.fullName}
              </h1>
              <p>User ID: USR-0000{userid}</p>
            </div>
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
      <hr />
      {user && (
        <div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 !mt-5">
            <div>
              <h2 className="text-xl font-semibold !mt-3 !mb-2">CONTACT</h2>
              <p className="flex gap-2 items-center">
                <Mail size={16} />
                <strong> Email:</strong> {user?.email}
              </p>
              <p className="flex gap-2 items-center">
                {" "}
                <Phone size={16} /> <strong>Phone Number:</strong>{" "}
                {user?.phoneNumber}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold !mt-3 !mb-2">
                ROLE & STATUS
              </h2>
              <p className="flex gap-2 items-center">
                <Mail size={16} />
                <strong> Role:</strong> Booking Officer
              </p>
              <p className="flex gap-2 items-center">
                {" "}
                <Phone size={16} /> <strong>Status:</strong>{" "}
                {user?.status == true ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 !mt-5">
            <div>
              <h2 className="text-xl font-semibold !mt-3 !mb-2">META</h2>
              <p className="flex gap-2 items-center">
                <Mail size={16} />
                <strong> Created At:</strong> 
              </p>
              <p className="flex gap-2 items-center">
                {" "}
                <Phone size={16} /> <strong>Last Login:</strong><GetDateTime ISOString={user?.lastLogin} />
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold !mt-3 !mb-2">
                USERNAME
              </h2>
              <p className="flex gap-2 items-center">
                <UserCheck size={16} />
                <strong> Username:</strong> {user?.username}
              </p>
            </div>
          </div>
        </div>
      )}
      {
        !user && (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl !mt-30 font-semibold">Loading...</h1>
          </div>
        )
      }
    </>
  );
}

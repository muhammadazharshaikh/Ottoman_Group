"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../app/globals.css";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setVerified(true);
    }
  }, [router]);

  if (!verified) {
    return (
      <div className="flex justify-center items-center h-screen bg-lime-50">
        <div className="text-4xl text-taupe-950">
          <span className="">Loading...</span>
        </div>
      </div>
    );
  }
  return children;
}

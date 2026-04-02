"use client";
import {useEffect} from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/login";
  }, []);


  return (
    <>
    <div>
      <h1 className="bg-blue-500 text-white">Hello</h1>
    </div>
    </>
  );
}

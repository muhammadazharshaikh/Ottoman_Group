"use client"
import React, { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import TopNavbar from "@/components/TopNavbar";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // state for mbile menu
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <>
        <TopNavbar />
          <div className="flex">
            <div className={`${isSidebarOpen ? "w-[20%]" : "w-[0%]"} `}>
              <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            </div>
            <div className={`${isSidebarOpen ? "w-[80%]" : "w-[100%]"}`} style={{padding: '10px 20px'}}>
              {children}
            </div>
          </div>
        </>
      </body>
    </html>
  );
}

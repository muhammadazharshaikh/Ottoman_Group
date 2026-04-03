"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightLeft,
  ChartBar,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FolderKanban,
  House,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  Users,
  UsersRound,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const [isClientReportsOpen, setIsClientReportsOpen] = React.useState(false);
  const [isVendorReportsOpen, setIsVendorReportsOpen] = React.useState(false);

  const pathname = usePathname();
  // Helper function to check if the link is active
  console.log("Current Pathname:", pathname); // Debugging line to check the current pathname
  const isActiveLink = (path) => pathname === path;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {/* ////////////// Hamburger Menu /////////////////// */}
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="lg:hidden fixed top-4 left-2 text-white cursor-pointer bg-blue-500 z-30 rounded-lg"
        style={{ padding: "8px" }}
      >
        <Menu />
      </button>
      {/* //////////////////// Side bar /////////////////////// */}
      <div
        className={`navbar-bg h-screen ${isOpen ? "lg:w-[20%] w-[70%]" : "w-[0%]"} fixed top-0 text-white border-r-1 border-white z-30 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />{" "}
          </button>
        </div>
        <div className="mylogo lg:!ml-[40px] lg:w-[150px] h-[100px] justify-center items-center flex">
          <Image
            src={"/images/ottoman.png"}
            width={100}
            height={100}
            alt="logo-image"
          />
        </div>
        <hr />

        <div className="sidebar-menu-list overflow-y-auto custom-scroll">
          <ul className="">
            <span className="sidebar-headings">GENERAL</span>
            <li className={isActiveLink("/dashboard") ? "active-link" : ""}>
              <Link href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </li>
            <li
              className={isActiveLink("/dashboard/users") ? "active-link" : ""}
            >
              <Link href="/dashboard/users">
                <Users />
                Users
              </Link>
            </li>
            <li>
              <Link href="">
                <ArrowRightLeft />
                Logs
              </Link>
            </li>
            <span className="sidebar-headings">APARTMENT BOOKINGS</span>
            <li>
              <Link href="">
                <FolderKanban />
                Projects
              </Link>
            </li>
            <li>
              <Link href="">
                <House />
                Flats / Units
              </Link>
            </li>
            <li>
              <Link href="">
                <UsersRound />
                Clients
              </Link>
            </li>
            <li>
              <Link href="">
                <ListChecks />
                Bookings
              </Link>
            </li>
            <li>
              <Link href="">
                <CreditCard />
                Client Payments
              </Link>
            </li>
            <li onClick={() => setIsClientReportsOpen(!isClientReportsOpen)}>
              <Link href="">
                <ChartBar />
                Client Reports
                {isClientReportsOpen ? <ChevronDown /> : <ChevronRight />}
              </Link>
            </li>
            {isClientReportsOpen && (
              <ul
                className="mt-2"
                style={{ marginLeft: "40px", borderLeft: "1px solid white" }}
              >
                <li className="leading-none">
                  <Link className="" href="">
                    Sales Summary
                  </Link>
                </li>
                <li className="leading-none">
                  <Link href="">Flats Availability</Link>
                </li>
                <li className="leading-none">
                  <Link href="">Client Dues</Link>
                </li>
                <li className="leading-none">
                  <Link href="">Payment Collection</Link>
                </li>
                <li className="leading-none">
                  <Link href="">Client Ledger</Link>
                </li>
              </ul>
            )}
            <span className="sidebar-headings">VENDOR / CONTRACTOR</span>
            <li>
              <Link href="">
                <Users />
                Vendors
              </Link>
            </li>
            <li>
              <Link href="">
                <FolderKanban />
                Vendor Projects
              </Link>
            </li>
            <li>
              <Link href="">
                <CreditCard />
                Vendor Payments
              </Link>
            </li>
            <li onClick={() => setIsVendorReportsOpen(!isVendorReportsOpen)}>
              <Link href="">
                <ChartBar />
                Vendor Reports
                {isVendorReportsOpen ? <ChevronDown /> : <ChevronRight />}
              </Link>
            </li>
            {isVendorReportsOpen && (
              <ul
                className="mt-2"
                style={{ marginLeft: "40px", borderLeft: "1px solid white" }}
              >
                <li className="leading-none">
                  <Link className="" href="">
                    Vender Ledger
                  </Link>
                </li>
                <li className="leading-none">
                  <Link className="" href="">
                    Project Expense Book
                  </Link>
                </li>
              </ul>
            )}
            <span className="sidebar-headings">SETTINGS</span>
            <li>
              <Link href="">
                <Settings />
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <button onClick={handleLogout} className={`flex justify-center gap-4 logout-button !mx-[10px] !my-[10px] ${isOpen ? "!p-[12px]" : ""}`}>
          <LogOut/> Logout
        </button>
      </div>
    </>
  );
}

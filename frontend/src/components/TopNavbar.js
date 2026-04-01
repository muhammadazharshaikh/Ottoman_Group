import React from 'react'
import "../app/globals.css"
import {Bell, User} from "lucide-react"

export default function TopNavbar() {
  return (
    <div className='navbar-bg h-16 flex justify-end text-white fixed top-0 left-0 right-0 z-10'>
      <div className='flex gap-4' style={{paddingRight:'32px'}}>
        <div className="icon flex gap-3 items-center">
          <Bell/>
        </div>
        <div className="user-menu flex gap-4 items-center">
            <div className="username-icon">
              <User/>
            </div>
            <div className="">
              <h2 className='username font-bold text-[16px]'>System Administrator</h2>
              <p className='text-sm text-gray-300'>System Admin</p>
            </div>
        </div>
      </div>
    </div>
  )
}

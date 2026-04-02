import {useState, useEffect, use} from "react"
import "../app/globals.css"
import {Bell, User} from "lucide-react"

export default function TopNavbar() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  },[])
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
            <div className="uppercase">
              <h2 className='username font-bold text-[16px]'>{user?.fullName}</h2>
              <p className='text-sm text-gray-300'>{user?.username}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import axios from "axios";
import { useSession } from "next-auth/react"


const DashboardPage = () => {

    const {data: session, status} = useSession();

    console.log(session, status)

    const signout = async ()  => {
        const res = await axios('api/auth/signout')
        console.log(res)
    }
  return (
    <div>

      <button
        onClick={signout}
        className="w-56 bg-red-500 text-sm text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
      >
        Cierra sesión
      </button>

    </div>
  )
}

export default DashboardPage
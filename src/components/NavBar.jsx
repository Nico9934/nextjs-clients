import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const signOutClick = async () => {
    const resNextAuth = await signOut();
    console.log(resNextAuth);
  };
  return (
    <div className="p-4 flex justify-between items-center">
      <div>
        <p>CRM Clients App</p>
      </div>
      <Link href={"/about"}>Acerca de mi</Link>
      <button
        onClick={signOutClick}
        className="px-2  bg-red-500 text-sm text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-blue"
      >
        Cierra sesión
      </button>
    </div>
  );
};

export default NavBar;

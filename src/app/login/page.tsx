"use client";

import axios from "axios";
import { signIn,  } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("")
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const router = useRouter()

  const onHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      const resNextAuth = await signIn("credentials", {
        email: user.email, 
        password: user.password,
        redirect: false,
      });
      
      if (resNextAuth?.ok) router.push("/dashboard");
      if(resNextAuth?.error) return setError(resNextAuth?.error)

      setError("");
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>

        {error && (
          <div className="text-center text-sm px-5 py-1 text-gray-100 bg-red-400 rounded-sm font-medium mb-3">
            {error}
          </div>
        )}
        <form onSubmit={onHandleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium mb-3">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-xs font-medium mb-3 ">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              defaultValue={user.password}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="flex m-auto items-center mb-4 gap-3 ">
            {/* <a href="#" className="text-blue-400 text-xs hover:underline">
              ¿Olvidaste tu contraseña?
            </a> */}

            <Link
              href="/register"
              className="text-blue-400 text-xs m-auto hover:underline text-end"
            >
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-sm text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

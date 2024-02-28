"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", user);
      console.log(res.data);
      setUser({
        password: "",
        email: "",
        fullname: "",
      });
      setError("");
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Registro</h2>

        {error && (
          <div className="text-center text-sm px-5 py-1 text-gray-100 bg-red-400 rounded-sm font-medium mb-3">
            {error.message}
          </div>
        )}
        <form onSubmit={onHandleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-xs font-medium mb-3"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={user.fullname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium mb-3">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xs font-medium mb-3"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              value={user.password}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="flex items-center mb-4 gap-3">
            <p className="text-xs text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-sm text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

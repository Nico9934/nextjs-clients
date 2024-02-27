"use client";

import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>

        <form>
          <div className="mb-4">
            <label for="username" className="block text-xs font-medium mb-3">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={user.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded text-xs text-gray-800"
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="mb-4">
            <label for="password" className="block text-xs font-medium mb-3 ">
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
            <a href="#" className="text-blue-400 text-xs hover:underline">
              ¿Olvidaste tu contraseña?
            </a>

            <Link
              href="/register"
              className="text-blue-400 text-xs hover:underline text-end"
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

"use client";

import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeroDescription from "../../components/HeroDescription";
import Spinner from "@/components/Spinner";

const RegisterPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateData = () => {
    const emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const stringRegex = /^[a-zA-Z ]+$/;
    const numberRegex = /^[0-9]+$/;

    if (Object.values(user).includes("")) {
      setError("Todos los campos son obligatorios");
      return false;
    } else if (!stringRegex.test(user.name)) {
      setError("Debes ingresar un nombre válido");
      return false;
    } else if (!emailRegex.test(user.email)) {
      setError("Debes ingresar un mail correcto");
      return false;
    } else {
      return true;
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const validado = validateData();
    try {
      if (validado) {
        const res = await axios.post("/api/auth/register", user);
        setLoading(true);

        setUser({
          password: "",
          email: "",
          fullname: "",
        });

        const resNextAuth = await signIn("credentials", {
          email: res.data.userSaved.email,
          password: user.password,
          redirect: false,
        });
        if (resNextAuth.ok) router.push("/dashboard");
        setLoading(false);

        setError("");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className="py-5 min-h-screen m-auto flex flex-col sm:flex-row justify-center gap-10 w-11/12 sm:w-9/12 items-center">
      <HeroDescription />
      <div className="bg-gray-800 text-white py-8 px-4 sm:p-8 rounded shadow-md w-full sm:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Registro</h2>

        {error && (
          <div className="text-center text-sm px-5 py-1 text-gray-100 bg-red-400 rounded-sm font-medium mb-3">
            {error.message || error}
          </div>
        )}
        {loading ? (
          <Spinner></Spinner>
        ) : (
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
                className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
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
                className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
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
                className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <div className="flex items-center mb-4 gap-3">
              <p className="text-xs m-auto text-gray-600">
                ¿Ya tienes cuenta?
                <Link href="/login" className="text-gray-100 hover:underline">
                  {"  "}Inicia sesión
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-700 text-sm text-white py-2 rounded hover:bg-violet-600 focus:outline-none focus:shadow-outline-blue"
            >
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;

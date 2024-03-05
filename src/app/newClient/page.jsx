"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddClientForm = () => {
  const { data: session, status } = useSession();
  const userSession = session?.user;
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    user: userSession?._id,
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "loading" || userSession?._id === undefined) {
      router.push("/dashboard");
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      if (client.user && status === "authenticated") {
        const res = await axios.post("api/clients", client);
        if (res.status === 200) {
          router.push("/dashboard");
          setClient({
            name: "",
            email: "",
            phone: "",
            address: "",
            user: client.user,
          });
        }
        setError("");
      } else {
        console.log("cargando...");
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center w-11/12 m-auto justify-center flex-col">
      <Link
        href={"/dashboard"}
        className="text-gray-100 w-full mb-5  mt-5 text-start flex items-center gap-3 justify-start"
      >
        <svg className="w-4 h-4 fill-gray-100" viewBox="0 0 512 512">
          <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
        </svg>
        Volver
      </Link>
      <div className="bg-gray-800 text-white py-8 px-4 mb-5 sm:p-8 rounded shadow-md w-full sm:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Agregar Nuevo Cliente</h2>

        {error && (
          <div className="text-center text-sm px-5 py-1 text-gray-100 bg-red-400 rounded-sm font-medium mb-3">
            {error.message}
          </div>
        )}
        <form onSubmit={handleSaveClient}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-xs font-medium mb-3">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={client.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
              placeholder="Ingresa el nombre del cliente"
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
              value={client.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
              placeholder="Ingresa el email del cliente"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-xs font-medium mb-3">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={client.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
              placeholder="Ingresa el teléfono del cliente"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="address" className="block text-xs font-medium mb-3">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={client.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border-2 rounded text-xs text-gray-800 focus:border-violet-700 focus:outline-none transition-all duration-400"
              placeholder="Ingresa la dirección del cliente"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-sm text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue transition-all"
          >
            Guardar Cliente
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;

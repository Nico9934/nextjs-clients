"use client";
import { connectDb } from "@/libs/mongodb";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import ClientData from "../../components/ClientData";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [clients, setClients] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (session.user && user._id && status === "authenticated") {
          const res = await axios("/api/clients", {
            headers: {
              userId: user._id,
            },
          });
          setClients(res.data);
        } else {
          console.error("User or user._id is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [session, refresh]);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="p-8 rounded shadow-md w-9/12">
          <div className="flex justify-between items-center font-semibold mb-8 ">
            <h2 className="text-xl">Clientes</h2>
            <Link
              href="/newClient"
              className="text-gray-100  bg-green-800 p-2 rounded-sm text-md hover:cursor-pointer hover:bg-green-600 transition-all"
            >
              Nuevo cliente
            </Link>
          </div>
          <table className="w-full mb-4 border-b-2">
            <thead>
              <tr>
                <th className="text-start">Nombre</th>
                <th className="text-start">Email</th>
                <th className="text-start">Teléfono</th>
                <th className="text-start">Dirección</th>
                <th className="text-start">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                return (
                  <ClientData
                    key={client._id}
                    client={client}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

"use client";
import { connectDb } from "@/libs/mongodb";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import ClientData from "../../components/ClientData";
import Spinner from "../../components/Spinner";

const DashboardPage = () => {
  const { data: session, status } = useSession();

  const user = session?.user;

  const [clients, setClients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(true);

      if (!session || !session.user) {
        return setLoading(true);
      }
    }

    const getData = async () => {
      if (user === undefined) setLoading(true);
      try {
        if (session.user && status === "authenticated") {
          const res = await axios("/api/clients", {
            headers: {
              userId: user._id,
            },
          });
          setClients(res.data);
          setLoading(false);
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
      <div className="min-h-screen flex justify-center bg-gray-950 text-white">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="p-8 rounded shadow-md w-9/12">
            <div className="flex justify-between items-center font-semibold mb-8 ">
              <h2 className="text-xl">Clientes</h2>
              <Link
                href="/newClient"
                className="text-gray-100 h-12 w-12 items-center flex justify-center bg-green-400 rounded-full p-2 text-md hover:cursor-pointer hover:bg-green-600 transition-all"
              >
                <svg className="w-6 h-6 fill-gray-100" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
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
                      loading={loading}
                      setLoading={setLoading}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

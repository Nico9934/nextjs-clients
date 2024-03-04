"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ClientData = ({ client }, refresh, setRefresh) => {
  const router = useRouter();

  const handleEliminarCliente = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`/api/clients/${id}`);
      console.log(res.status);
      if (res.status === 200) {
        console.log(refresh);
        setRefresh(!refresh);
        console.log(refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className=" text-sm text-start border-b-2 py-2 border-blue-900">
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{client.address}</td>
      <td className="flex p-2 justify-center">
        <button className="text-blue-400 mr-2">Editar</button>

        <button
          className="text-red-500 cursor-pointer"
          onClick={() => handleEliminarCliente(client._id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ClientData;

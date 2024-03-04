"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ClientData = ({ client, refresh, setRefresh, loading, setLoading }) => {
  const router = useRouter();

  const handleRemoveClient = async (id) => {
    try {
      const res = await axios.delete(`/api/clients/${id}`);

      if (res.status === 200) {
        setRefresh(!refresh);
        setLoading(false);
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
        <Link className="text-blue-400 mr-2" href={`/edit/${client._id}`}>
          Editar
        </Link>

        <button
          className="text-red-500 cursor-pointer"
          onClick={() => handleRemoveClient(client._id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ClientData;

import { connectDb } from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export const GET = ({ params }) => {
  const { id } = params;
  console.log(id);
  return NextResponse.json({ message: "Obteniendo un solo cliente" });
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  connectDb();

  const res = await request.json();
  const { name, email, phone, address } = res;

  try {
    const updateClient = await Client.findOneAndUpdate(
      { _id: id }, // Utiliza _id como campo de consulta
      {
        $set: {
          name: name || res.name,
          email: email || res.email,
          phone: phone || res.phone,
          address: address || res.address,
        },
      },
      { new: true }
    );

    if (!updateClient) return NextResponse.json("El cliente no existe");
    return NextResponse.json({ message: "Cliente actualizado con exito" });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (request, { params }) => {
  connectDb();
  const { id } = params;

  try {
    const clientFound = await Client.findById(id);
    if (!clientFound) return NextResponse.json("El cliente no existe");
    const removedClient = await clientFound.deleteOne();
    return NextResponse.json({ message: "Cliente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

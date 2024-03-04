import { connectDb } from "@/libs/mongodb";
import Client from "@/models/client";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  connectDb();
  const { id } = params;
  try {
    const clientFound = await Client.findById(id);
    if (!clientFound) return NextResponse.json("El cliente no existe");
    return NextResponse.json(clientFound);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Obteniendo un solo cliente" });
};

// export const PUT = async (request, { params }) => {
//   const { id } = params;
//   connectDb();
//   const { name, email, phone, address } = await request.json();

//   try {
//     const updateClient = await Client.updateOne({
//       where: { id: Number(params.id) },
//       data: {
//         name: name || request.body.name,
//         email: email || request.body.email,
//         phone: phone || request.body.phone,
//         address: address || request.body.address,
//       },
//     });
//     console.log(updateClient);

//     return NextResponse.json({ message: "Cliente actualizado con exito" });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const PUT = async (request, { params }) => {
  const { id } = params;
  await connectDb();

  try {
    const { name, email, phone, address } = await request.json();

    console.log(name, email, phone, address);

    const updateClient = await Client.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name || request.body.name,
          email: email || request.body.email,
          phone: phone || request.body.phone,
          address: address || request.body.address,
        },
      },
      { new: true }
    );

    if (!updateClient) {
      return NextResponse.json({ message: "El cliente no existe" });
    }
    return NextResponse.json({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return NextResponse.error("Error en el servidor", 500);
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

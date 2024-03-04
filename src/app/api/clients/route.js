import { connectDb } from "@/libs/mongodb";
import Client from "@/models/client";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  connectDb();
  const userId = req.headers.get("userId");
  const userFound = await User.findById(userId);
  if (!userFound) return NextResponse.json({ message: "El usuario no existe" });
  try {
    if (!userId) return NextResponse.json("El usuuario no existe");
    const findClients = await Client.find({ user: userId });
    return NextResponse.json(findClients);
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const POST = async (req) => {
  connectDb();
  const { name, email, phone, address, user } = await req.json();

  if (!name || name.length < 6)
    return NextResponse.json(
      { message: "El nombre debe tener al menos 6 caracteres" },
      { status: 400 }
    );
  if (!email || email.length < 6)
    return NextResponse.json(
      { message: "El email es necesario" },
      { status: 400 }
    );
  if (!phone || phone.length < 6)
    return NextResponse.json(
      { message: "El telefono es necesario" },
      { status: 400 }
    );
  if (!address || address.length < 6)
    return NextResponse.json(
      { message: "La direccion es necesaria" },
      { status: 400 }
    );

  try {
    const clientFound = await Client.findOne({ email });
    if (clientFound)
      return NextResponse.json(
        { message: "El cliente ya existe" },
        { status: 400 }
      );
    const newClient = new Client({ name, email, phone, address, user });
    const savedClient = await newClient.save(newClient);
    return NextResponse.json({ message: "Cliente creado con exito" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.error(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
};

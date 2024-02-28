import { connectDb } from "@/libs/mongodb";
import User from "@/models/user";
import { hash } from "bcryptjs";
const { NextResponse } = require("next/server");

export const POST = async (req) => {
  connectDb();
  const { fullname, email, password } = await req.json();

  if (!fullname || fullname.length < 0) {
    return NextResponse.json(
      { message: "El nombre de usuario debe contener al menos 6 caracteres" },
      { status: 400 }
    );
  }
  if (!email || email.length < 6) {
    return NextResponse.json(
      { message: "El email es necesario" },
      { status: 400 }
    );
  }
  if (!password || password.length < 6) {
    return NextResponse.json(
      { message: "El password debe contener al menos 6 caracteres" },
      { status: 400 }
    );
  }

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 12);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    const userSaved = await newUser.save();
    return NextResponse.json({ message: "User created" }, { status: 201 });
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

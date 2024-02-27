import User from "@/models/user";
import { hash } from "bcryptjs";
const { NextResponse } = require("next/server");

export const POST = async (req) => {
  const { fullname, email, password } = await req.json();

  const userFound = await User.findOne({ email });

  if (!password || password.length < 6) {
    return NextResponse.json(
      { message: "The password must have at least 6 characters" },
      { status: 400 }
    );
  }
  if (userFound) {
    return NextResponse.json(
      { message: "The user already exist" },
      { status: 400 }
    );
  }
  try {
    const hashedPassword = await hash(password, 12);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    const userSaved = await newUser.save();
    return NextResponse.json({ message: "User created" }, { status: 200 });
  } catch (error) {
    return NextResponse.error(error.message);
  }
};

import connect from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//function to send email to user for verification or reset password
//for now this is limited in test phase but when we host it we can use it for real
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, password } = reqBody;

    //Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ status: 400, message: "User does not exist" });
    }

    //Check if password is correct
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ status: 400, message: "Invalid credentials" });
    }

    //Create jwt token
    const token_data = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(token_data, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //Send response
    const response = NextResponse.json({
      message: "User logged in successfully",
      succcess: true,
    });

    //Set the token in the cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

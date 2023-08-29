import connect from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/Mailer";

//function to send email to user for verification or reset password
//for now this is limited in test phase but when we host it we can use it for real
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    //Check the user is exist or not in the database
    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return NextResponse.json({ status: 400, message: "User already exists" });
    }

    //encrypt password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Create new user in the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const isSaved = await newUser.save();

    //Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: isSaved._id });

    //Send response
    return NextResponse.json({
      data: isSaved,
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

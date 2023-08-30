import connect from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

//connect to mongoDB Atlas database using mongoose
connect();

export async function PUT(req: NextRequest) {
  try {
    //get token and new password from the request body
    const reqBody = await req.json();
    const { token, newPass } = reqBody;

    //update user expired token and time in the database
    const user = await User.findOne({
      forgorPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" });
    }

    //hashing the new password and updating the user in the database
    user.password = await bcryptjs.hash(newPass,10);
    user.isAdmin = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    //return response
    NextResponse.json({
      Message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message });
  }
}

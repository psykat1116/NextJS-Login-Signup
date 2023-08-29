import connect from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

//function to send email to user for verification or reset password
//for now this is limited in test phase but when we host it we can use it for real
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    //Find user in the database and check if token is valid
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" });
    }

    //Update user in the database
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    //Send response
    return NextResponse.json({
        Message: "Email verified successfully",
        success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

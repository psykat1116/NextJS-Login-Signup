import connect from "@/db/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function PUT(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token, newPass } = reqBody;

    const user = await User.findOne({
      forgorPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" });
    }

    user.password = await bcryptjs.hash(newPass,10);
    user.isAdmin = true;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    NextResponse.json({
      Message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    NextResponse.json({ error: error.message });
  }
}

import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbconfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/Mailer";

connect();

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { userEmail } = reqBody;
  const userData = await User.findOne({ email: userEmail });
  if (!userData) {
    return NextResponse.json({ error: "User not found" });
  }
  await sendEmail({ userEmail, emailType: "RESET", userId: userData._id });

  return NextResponse.json({
    Message: "Password reset link sent to your email",
    success: true,
  });
}

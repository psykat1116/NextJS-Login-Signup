import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/dbconfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/Mailer";

//connect to mongoDB Atlas database using mongoose
connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;

    //check if user exists or not in the database and get its id
    const userData = await User.findOne({ email });
    if (!userData) {
      return NextResponse.json({ error: "User not found" });
    }

    //send email to user for reset password
    await sendEmail({ email, emailType: "RESET", userId: userData._id });
    return NextResponse.json({
      Message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

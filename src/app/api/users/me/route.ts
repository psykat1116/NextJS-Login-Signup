import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/db/dbconfig";

//function to send email to user for verification or reset password
//for now this is limited in test phase but when we host it we can use it for real
connect();

export async function GET(req: NextRequest) {
  try {
    //Get the user data from the token
    const _id = await getDataFromToken(req);
    const userData: any = await User.findById({ _id }).select("-password");

    //Send response
    return NextResponse.json({
      message: "User Found",
      data: userData,
    });
  } catch (error: any) {
    console.log("There is a problem");
    throw new Error(error.message);
  }
}

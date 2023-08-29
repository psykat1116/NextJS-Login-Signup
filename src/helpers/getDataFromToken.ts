import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

// To verify the validity of the token and get the user id from it
export async function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const data: any = Jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error: any) {
    NextResponse.json({ error });
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  try {
    //Send response
    const response = NextResponse.json({
      Message: "Logout Successfully",
      success: true,
    });

    //Reset the token in the cookie
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

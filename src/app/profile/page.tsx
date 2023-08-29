"use client";
import React, { useState } from "react";
import style from "../page.module.css";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const [data, setData] = useState("");
  const router = useRouter();
  async function handleLogout() {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
  };

  return (
    <div className={style.main}>
      <div className={style.profilepage}>
        <h2>Your Profile</h2>
        <hr />
        <p>
          {data === "" ? "" : "Click in the link below to view your profile"}
        </p>
        <h2>
          {data === "" ? "" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details</button>
      </div>
    </div>
  );
};

export default page;

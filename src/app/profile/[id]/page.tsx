"use client";
import React from "react";
import style from "../../page.module.css";
import axios from "axios";

const userProfile = async ({ params }: any) => {
  const res = await axios.get("/api/users/me");
  const { username, email } = res.data.data;

  return (
    <div className={style.main}>
      <div className={style.userinfo}>
        <h2>Username: {username}</h2>
        <h2>email: {email}</h2>
        <h2>id: {params.id}</h2>
      </div>
    </div>
  );
};

export default userProfile;

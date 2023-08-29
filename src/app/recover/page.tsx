"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "../page.module.css";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const recoverPass = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/recoverpass", { email });
      console.log(response.data);
      router.push("/resetpass");
    } catch (error: any) {
      console.log("Submit Failed", error.message);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.form}>
        <h1>Recover Password</h1>
        <form>
          <div className={style.email}>
            <label htmlFor="#email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button onClick={recoverPass}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default page;

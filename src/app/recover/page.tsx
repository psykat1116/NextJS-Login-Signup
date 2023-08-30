"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../page.module.css";

const page = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  //call the api to reset password accoring to that showing the HTML content
  const recoverPass = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/recoverpass", { email });
      setLoading(false);
      setSuccess(true);
    } catch (error: any) {
      console.log("Submit Failed", error.message);
    }
  };

  return (
    <div className={style.main}>
      {loading && <h2>Loading...</h2>}
      {!success && !loading && (
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
      )}
      {success && (
        <h2>Password Reset Link Has Been Successfully Sent To Your Email</h2>
      )}
    </div>
  );
};

export default page;

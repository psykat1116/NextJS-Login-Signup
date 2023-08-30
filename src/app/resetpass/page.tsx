"use client";
import axios from "axios";
import Link from "next/link";
import style from "../page.module.css";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userpassword, setUserpassword] = useState({
    npassword: "",
    confirmnpassword: "",
  });
  const { npassword } = userpassword;

  //call the api to reset password accoring to that showing the HTML content
  const recoverPassword = async () => {
    try {
      const response = await axios.put("/api/users/resetpass", {
        token,
        npassword,
      });
      setSuccess(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  //get token from url
  useEffect(() => {
    const url = window.location.search;
    const urltoken = url.split("=")[1];
    setToken(urltoken || "");
  }, []);

  return (
    <div className={style.main}>
      {!success && (
        <div className={style.form}>
          <h1>Reset Password</h1>
          <form>
            <div className={style.npassword}>
              <label htmlFor="#npassword">New Password</label>
              <input
                type="password"
                id="npassword"
                name="npassword"
                placeholder="New Password"
                onChange={(e) => {
                  setUserpassword({
                    ...userpassword,
                    npassword: e.target.value,
                  });
                }}
                autoFocus
              />
            </div>
            <div className={style.confirmnpassword}>
              <label htmlFor="#confirmnpassword">Retype Password</label>
              <input
                type="password"
                id="confirmnpassword"
                name="confirmnpassword"
                placeholder="Retype Password"
                onChange={(e) => {
                  setUserpassword({
                    ...userpassword,
                    confirmnpassword: e.target.value,
                  });
                }}
              />
            </div>
          </form>
          <button onClick={recoverPassword}>Update Password</button>
        </div>
      )}
      {success && (
        <div className={style.form}>
          <form>
            <h1>Password Changed Successfully</h1>
            <button>
              <Link href="/login">Login</Link>
            </button>
          </form>
        </div>
      )}
      {error && (
        <div className={style.form}>
          <h1>OOPS! Some Error Occured</h1>
        </div>
      )}
    </div>
  );
}

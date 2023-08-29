"use client";
import axios from "axios";
import Link from "next/link";
import style from "../page.module.css";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/verifyemail", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const url = window.location.search;
    const urltoken = url.split("=")[1];
    setToken(urltoken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className={style.main}>
      <div className={style.container}>
        <h1>Verify Email</h1>
        <h2>{token ? token : "no token"}</h2>
        {verified && (
          <div>
            <h3>Email Verified</h3>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h3>Error</h3>
          </div>
        )}
      </div>
    </div>
  );
}

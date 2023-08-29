"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "../page.module.css";
import { toast } from "react-hot-toast";

const singuppage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttondisable, setButtondisable] = useState(false);
  const [loading,setLoading] = useState(false);

  const onSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed",error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>5 && user.username.length>2){
      setButtondisable(false);
    }else{
      setButtondisable(true);
    }
  }, [user])
  

  return (
    <div className={style.main}>
      <div className={style.form}>
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <form>
          <div className={style.username}>
            <label htmlFor="#username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className={style.email}>
            <label htmlFor="#email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={style.password}>
            <label htmlFor="#password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </form>
        <p>
          Already Signup? <Link href="/login">Login</Link> Here
        </p>
        <button onClick={onSignup} disabled={buttondisable}>Sign Up</button>
      </div>
    </div>
  );
};

export default singuppage;

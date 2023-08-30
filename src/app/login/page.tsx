"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "../page.module.css";
import { toast } from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    username: "",
  });
  const [buttondisable, setButtondisable] = useState(false);
  const [loading,setLoading] = useState(false);

  //login the user by calling the api
  const onLoginup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  //handle the change in the input field
  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  //check the length of the password and username
  useEffect(() => {
    if (
      user.password.length > 5 &&
      user.username.length > 2
    ) {
      setButtondisable(false);
    } else {
      setButtondisable(true);
    }
  }, [user]);

  return (
    <div className={style.main}>
      <div className={style.form}>
        <h1>{loading ? "Processing" : "Login"}</h1>
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
          Don't Sign Up Yet? <Link href="/signup">Sign up</Link> Here
        </p>
        <p>
          Forgot Your Password? <Link href='/recover'>Click</Link> Here
        </p>
        <button onClick={onLoginup} disabled={buttondisable}>Login</button>
      </div>
    </div>
  );
};

export default page;

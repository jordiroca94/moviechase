"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginType } from "@/types/user";
import { BiHide, BiShow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loader from "./ui/Loader";
import Link from "next/link";

const LoginForm = () => {
  const refForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL
    ? process.env.NEXT_PUBLIC_MOVIECHASE_API_URL
    : process.env.PUBLIC_HOST;

  const loginSchema = z.object({
    email: z.string().email({ message: "An email is required" }),
    password: z.string().min(1, { message: "Insert your password" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserLoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: UserLoginType) => {
    setLoading(true);
    const { email, password } = values;
    try {
      const res = await fetch(`${movieChaseApiUrl}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        return router.replace("/profile");
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  return (
    <div className="bg-transparent text-black flex justify-center items-start mt-header">
      <div className="sm:bg-primary sm:border-secondary sm:border text-white p-6 sm:rounded-md sm:mt-16 w-full sm:max-w-[600px] flex flex-col gap-4">
        <form
          ref={refForm}
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col gap-3"
        >
          <h3 className="text-2xl font-semibold">Login</h3>
          <label htmlFor="email" className="font-medium mb-2">
            Email
          </label>
          <input
            className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
            id="email"
            type="email"
            placeholder="Email"
            autoFocus
            {...register("email")}
          />
          {errors.email?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="font-medium mb-2">
            Password
          </label>
          <div className="flex gap-2 items-center w-full">
            <input
              className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black w-full"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              {...register("password")}
            />
            <BiShow
              onClick={() => setShowPassword(true)}
              className={`size-8 ${showPassword && "hidden"}`}
            />
            <BiHide
              onClick={() => setShowPassword(false)}
              className={`size-8 ${!showPassword && "hidden"}`}
            />
          </div>
          {errors.password?.message && (
            <p aria-describedby="password" className="text-red pt-1">
              {errors.password?.message}
            </p>
          )}
          {error && <p className="text-red pt-1">Wrong email or password</p>}
          <button
            type="submit"
            className="bg-secondary rounded-lg p-2 hover:bg-primary border border-white mt-4 "
          >
            {loading ? <Loader /> : "Login"}
          </button>
          <div className="text-sm mt-3 text-right">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="hover:underline hover:text-secondary"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;

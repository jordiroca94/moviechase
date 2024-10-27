"use client";

import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginType } from "@/types/user";
import { BiHide, BiShow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loader from "./ui/Loader";

type Props = {
  setLoginModal: (e: boolean) => void;
  setRegisterModal: (e: boolean) => void;
};

const LoginForm = ({ setLoginModal, setRegisterModal }: Props) => {
  const loginModalRef = useRef<HTMLDivElement | null>(null);
  const refForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      loginModalRef.current &&
      !loginModalRef.current.contains(event.target as Node)
    ) {
      setLoginModal(false);
    }
  };

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
      const res = await fetch("http://localhost:8081/api/v1/login", {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-transparent absolute text-black h-screen w-full z-50 flex justify-center items-start">
      <div
        ref={loginModalRef}
        className="bg-primary sm:border-secondary md:border text-white p-6 md:rounded-md sm:mt-12 w-full sm:w-2/5 flex flex-col gap-4 relative min-w-96"
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setLoginModal(false)}
        >
          <RxCross1 />
        </button>
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
            <button
              className="hover:underline hover:text-secondary"
              onClick={() => {
                setLoginModal(false);
                setRegisterModal(true);
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;

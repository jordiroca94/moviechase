"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserType } from "@/types/user";
import { BiHide, BiShow } from "react-icons/bi";
import Loader from "./ui/Loader";
import Link from "next/link";
import { registerUser } from "@/mutations/mutations";

const RegisterForm = () => {
  const refRegisterForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const registerSchema = z.object({
    first_name: z.string().min(1, { message: "Insert your name" }),
    last_name: z.string().min(1, { message: "Insert your surname" }),
    email: z.string().email({ message: "An email is required" }),
    password: z.string().min(1, { message: "Insert your password" }),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterUserType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: RegisterUserType) => {
    setLoading(true);
    const { first_name, last_name, email, password } = values;
    try {
      const res = await registerUser(first_name, last_name, email, password);
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error registering user", error);
      throw error;
    }
  };

  return (
    <div className="bg-transparent text-black flex justify-start mt-header sm:mt-0 sm:justify-center items-center sm:h-screen">
      <div className="sm:bg-primary sm:border-secondary sm:border text-white p-6 sm:rounded-md sm:mt-16 w-full sm:max-w-[600px] flex flex-col gap-4">
        <form
          ref={refRegisterForm}
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <h3 className="text-2xl font-semibold">Create an account</h3>
          <div className="flex flex-col sm:flex-row w-full gap-6">
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="first_name" className="font-medium mb-2">
                Name
              </label>
              <input
                className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
                id="first_name"
                type="text"
                placeholder="Name"
                autoFocus
                {...register("first_name")}
              />
              {errors.first_name?.message && (
                <p aria-describedby="email" className="text-red pt-1">
                  {errors.first_name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2">
              <label htmlFor="last_name" className="font-medium mb-2">
                Surname
              </label>
              <input
                className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
                id="last_name"
                type="text"
                placeholder="Surname"
                {...register("last_name")}
              />
              {errors.last_name?.message && (
                <p aria-describedby="email" className="text-red pt-1">
                  {errors.last_name?.message}
                </p>
              )}
            </div>
          </div>
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
          {error && <p className="text-red pt-1">User already exists</p>}
          <button
            type="submit"
            className="bg-secondary rounded-lg p-2 hover:bg-primary border border-white mt-4 "
          >
            {loading ? <Loader /> : "Submit"}
          </button>
          {success && <p className="pt-1">User registered successfully</p>}
          <div className="text-sm mt-3 text-right">
            Already have an account?{" "}
            <Link
              href="/login"
              className="hover:underline hover:text-secondary"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;

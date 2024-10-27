"use client";

import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/types/user";
import { BiHide, BiShow } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Loader from "./ui/Loader";

type Props = {
  setLoginModal: (e: boolean) => void;
  setRegisterModal: (e: boolean) => void;
};

const RegisterForm = ({ setLoginModal, setRegisterModal }: Props) => {
  const registerModalRef = useRef<HTMLDivElement | null>(null);
  const refRegisterForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      registerModalRef.current &&
      !registerModalRef.current.contains(event.target as Node)
    ) {
      setRegisterModal(false);
    }
  };

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
  } = useForm<UserType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (values: UserType) => {
    setLoading(true);
    const { first_name, last_name, email, password } = values;
    try {
      const res = await fetch("http://localhost:8081/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        location.reload();
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
        ref={registerModalRef}
        className="bg-primary sm:border-secondary md:border text-white p-6 md:rounded-md sm:mt-12 w-full sm:w-2/5 flex flex-col gap-4 relative min-w-96"
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setRegisterModal(false)}
        >
          <RxCross1 />
        </button>
        <form
          ref={refRegisterForm}
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-3"
        >
          <h3 className="text-2xl font-semibold">Create an account</h3>
          <label htmlFor="first_name" className="font-medium mb-2">
            Name
          </label>
          <input
            className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
            id="first_name"
            type="first_name"
            placeholder="Name"
            {...register("first_name")}
          />
          {errors.first_name?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.first_name?.message}
            </p>
          )}
          <label htmlFor="last_name" className="font-medium mb-2">
            Surname
          </label>
          <input
            className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
            id="last_name"
            type="last_name"
            placeholder="Surname"
            {...register("last_name")}
          />
          {errors.last_name?.message && (
            <p aria-describedby="email" className="text-red pt-1">
              {errors.last_name?.message}
            </p>
          )}
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
          <div className="text-sm mt-3 text-right">
            Already have an account?{" "}
            <button
              className="hover:underline hover:text-secondary"
              onClick={() => {
                setRegisterModal(false);
                setLoginModal(true);
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterForm;

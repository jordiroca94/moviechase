"use client";

import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import Grid from "../ui/Grid";
import Loader from "../ui/Loader";
import { useForm } from "react-hook-form";
import { EditUserType, UserType } from "@/types/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

const EditProfile = () => {
  const editProfileForm = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;

  const registerSchema = z.object({
    first_name: z.string().min(1, { message: "Insert your name" }),
    last_name: z.string().min(1, { message: "Insert your surname" }),
    email: z.string().email({ message: "An email is required" }),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditUserType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!token) {
      redirect("/");
    } else {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      setProfileInfo(parsedUser);
      if (parsedUser) {
        reset({
          first_name: parsedUser.firstName || "",
          last_name: parsedUser.lastName || "",
          email: parsedUser.email || "",
        });
      }
    }
  }, []);

  const handleEditProfile = async (values: EditUserType) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    const { first_name, last_name, email } = values;
    try {
      const res = await fetch(
        `${movieChaseApiUrl}/api/v1/update/user/${profileInfo?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ first_name, last_name, email }),
        }
      );

      if (res.ok) {
        setLoading(false);
        setSuccess(true);
        // TODO: Update the user in local storage
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating user profile in:", error);
    }
  };

  return (
    <Container>
      <Grid>
        <form
          className="mt-10 col-span-4 sm:col-start-3 lg:col-start-5"
          ref={editProfileForm}
          onSubmit={handleSubmit(handleEditProfile)}
        >
          <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>
          <div className="flex flex-col gap-4">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
              required
              {...register("first_name")}
            />
            {errors.first_name?.message && (
              <p aria-describedby="first_name" className="text-red pt-1">
                {errors.first_name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
              required
              {...register("last_name")}
            />
            {errors.last_name?.message && (
              <p aria-describedby="last_name" className="text-red pt-1">
                {errors.last_name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border border-secondary focus:ring-1 focus:ring-secondary py-2 px-6 rounded-md text-black"
              required
              {...register("email")}
            />
            {errors.email?.message && (
              <p aria-describedby="email" className="text-red pt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          {error && (
            <p className="text-red pt-2">
              User with this email already existst
            </p>
          )}
          {success && <p className=" pt-2">Profile updated successfully</p>}

          <button
            type="submit"
            className="bg-secondary rounded-lg py-2 px-6 hover:bg-primary border border-white mt-8 "
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>
      </Grid>
    </Container>
  );
};

export default EditProfile;

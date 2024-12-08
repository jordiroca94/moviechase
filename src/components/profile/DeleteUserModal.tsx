"use client";
import { UserType } from "@/types/user";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Loader from "../ui/Loader";
import { useDeleteModal } from "@/context/DeleteUserModalContext";

type Props = {};

const DeleteUserModal = ({}: Props) => {
  const deleteUserModal = useRef<HTMLDivElement | null>(null);
  const [profileInfo, setProfileInfo] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteValue, setDeleteValue] = useState<string>("");
  const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;
  const { isModalOpen, closeModal } = useDeleteModal();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setProfileInfo(JSON.parse(user!));
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`${movieChaseApiUrl}/api/v1/user/delete/${profileInfo?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      deleteUserModal.current &&
      !deleteUserModal.current.contains(event.target as Node)
    ) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isModalOpen) return null;

  return (
    <div
      ref={deleteUserModal}
      className="bg-white h-fit absolute text-black p-4 sm:p-6 w-full sm:w-[500px] z-50 inset-0 m-auto flex flex-col rounded-lg"
    >
      <div className="flex justify-between w-full items-start">
        <h5 className="text-2xl pb-6">Delete account</h5>
        <button onClick={() => closeModal()}>
          <RxCross2 className="size-5" />
        </button>
      </div>
      <p className="mb-6">
        This action is irreversible. To confirm type{" "}
        <span className="text-red">{profileInfo?.email}</span> in the box below
      </p>

      <input
        value={deleteValue}
        onChange={(e) => setDeleteValue(e.target.value)}
        className={`border py-2 px-6 rounded-md ${
          deleteValue === profileInfo?.email ? "border-black" : " border-red"
        }`}
        type="text"
      />
      <button
        onClick={handleDelete}
        type="button"
        disabled={deleteValue === profileInfo?.email ? false : true}
        className={` text-white cursor-pointer px-6 py-2 rounded-md mt-10  w-full lg:w-auto ${
          deleteValue === profileInfo?.email ? "bg-red" : "bg-mediumGray/50"
        }`}
      >
        {loading ? <Loader /> : <div>Delete account</div>}
      </button>
    </div>
  );
};

export default DeleteUserModal;

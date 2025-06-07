import { FavouritesType } from "@/types/common";

const MOVIECHASE_API_KEY = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;

//USER

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email, password }),
  });
  return res;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/user/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

// LISTS

export const removeFromListMutation = async (
  userId: string,
  id: string,
  type: FavouritesType,
  list: string
) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/${list}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: Number(userId),
      id: Number(id),
      type,
    }),
  });
  return res;
};

export const addToListMutation = async (
  userId: string,
  id: string,
  type: FavouritesType,
  list: string
) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/${list}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: Number(userId),
      id: Number(id),
      type,
    }),
  });
  return res;
};

export const recommendMutation = async (movieName: string) => {
  const res = await fetch(`${MOVIECHASE_API_KEY}/api/v1/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie_name: movieName,
    }),
  });
  return res;
};

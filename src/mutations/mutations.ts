const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  const res = await fetch(`${movieChaseApiUrl}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email, password }),
  });
  return res;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${movieChaseApiUrl}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return res;
};

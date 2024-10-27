export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserLoginType = Pick<UserType, "email" | "password">;

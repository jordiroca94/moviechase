export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type RegisterUserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type DecodedTokenType = {
  expiresAt: number;
  firstName: string;
  lastName: string;
  userEmail: string;
  userID: string;
};

export type UserLoginType = Pick<RegisterUserType, "email" | "password">;

export type EditUserType = Pick<
  RegisterUserType,
  "first_name" | "last_name" | "email"
>;

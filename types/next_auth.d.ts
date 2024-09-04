import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
  }
}

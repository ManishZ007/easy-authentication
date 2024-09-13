import {
  createUser,
  getUserByEmail,
  loginUser,
} from "@/lib/actions/user.action";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    CredentialProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
      },

      async authorize(credentials: any): Promise<any> {
        const isUserExist = await loginUser(credentials.identifier);

        if (!isUserExist.success) {
          throw new Error("No user found width credential");
        }

        return isUserExist.user;
      },
    }),
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        const isLoggedIn = await loginUser(user?.email as string);

        if (!isLoggedIn.success) {
          const userObject = {
            username: user?.name?.split(" ").join(""),
            firstName: user?.name?.split(" ")[0],
            lastName: user?.name?.split(" ")[1],
            email: user?.email,
            id: user.id as string,
          } as CreateUserProps;

          const newUser = await createUser(userObject);

          if (!newUser.success) {
            return false;
          }
        }
      }

      if (account?.provider === "github") {
        const isLoggedIn = await loginUser(user?.email as string);

        if (!isLoggedIn.success) {
          const userObject = {
            username: user?.name?.split(" ").join(""),
            firstName: user?.name?.split(" ")[0],
            lastName: user?.name?.split(" ")[1],
            email: user?.email,
            id: user.id as string,
          } as CreateUserProps;

          const newUser = await createUser(userObject);

          if (!newUser.success) {
            return false;
          }
        }
      }

      return true;
    },

    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (user) {
        const findByEmail = await getUserByEmail(user.email as string);

        token._id = findByEmail.user[0]._id;
        token.username = findByEmail.user[0].username;
        token.email = findByEmail.user[0].email;
        token.firstName = findByEmail.user[0].firstName;
        token.lastName = findByEmail.user[0].lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

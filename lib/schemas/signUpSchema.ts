import z from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no more then 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must be not contain special character");

export const signUpSchema = z.object({
  firstName: z.string({ message: "required" }),
  lastName: z.string({ message: "required" }),
  username: usernameValidation,
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "password must be atleast 6 charaters",
  }),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

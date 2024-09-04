import z from "zod";
import { usernameValidation } from "./signUpSchema";

export const updateSchema = z.object({
  username: usernameValidation,
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export type TUpdateSchema = z.infer<typeof updateSchema>;

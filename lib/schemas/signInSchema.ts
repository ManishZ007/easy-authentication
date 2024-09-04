import z from "zod";

export const signInSchema = z.object({
  identifier: z.string(),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

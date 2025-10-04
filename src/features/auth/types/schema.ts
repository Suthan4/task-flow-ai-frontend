import { z } from "zod";
export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name required" }),
    email: z.string().min(1,{message:"Email is required"}).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email structure"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;


export const siginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email structure"),
    password:z.string().min(6,"Password must be atelast 6 characters")
});

export type SigninFormData=z.infer<typeof siginSchema>

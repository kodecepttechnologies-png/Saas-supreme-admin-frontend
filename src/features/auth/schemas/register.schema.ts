import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters")
      .max(100, "First name cannot exceed 100 characters"),

    lastName: z
      .string()
      .trim()
      .max(100, "Last name cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),

    email: z
      .string()
      .trim()
      .email("Enter a valid email address"),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number cannot exceed 30 characters")
      .optional()
      .or(z.literal("")),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
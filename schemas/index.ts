import { UserRole } from "@prisma/client";
//for validation on client side

import { z } from "zod";

export const DeleteAccountSchema = z.object({
  delete: z.string(),
});

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.string().min(6).max(30).optional(),
    newPassword: z.string().min(6).max(30).optional(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        // to check if user set new password if inserted password
        return false;
      }
      return true;
    },
    {
      message: "New Password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Minimum 6 caracters required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }).min(3),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }).min(3),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }).min(3),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Minimum 6 caracters required" }),
});

//for validation on client side

import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().email({message: "Valid email is required"}).min(3),
    password: z.string().min(1,{message: "Password is required"})
}) 

export const RegisterSchema = z.object({
    name: z.string({message: "Name is required"}).min(1, {message: "Name is required"}),
    email: z.string().email({message: "Valid email is required"}).min(3),
    password: z.string({message: "Password is required"}).min(6, {message:"Minimum 6 caracters required"})
}) 
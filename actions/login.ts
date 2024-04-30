//server action -> pass something from the client to the server. 
//Replacement for API routes. 
"use server"

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from "@/schemas"
import { AuthError } from 'next-auth';
import { signIn } from "@/auth"
import * as z from "zod"
import { getUserByEmail } from '@/data/data';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/data/mail';


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values)

    if (!validateFields.success) {
        return {error:"Invalid fields!"}
    }

    const { email, password } = validateFields.data
 
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error:"Invalid credentials!"}
    }

    if (!existingUser.emailVerified) {
        
        const verificationToken = await generateVerificationToken(existingUser.email)
        //resend verification token email
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

    return{success:"Sent again! Check your email!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return {error:"something went wrong!"}
            }
        }
        throw error
    }
}
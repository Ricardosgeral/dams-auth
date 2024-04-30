import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db";


export const generateVerificationToken = async (email: string) =>
{
    const token = uuidv4()
    const expires = new Date(new Date().getTime()+3600*1000) //expires the token in 1h

    const existingToken = await getVerificationTokenByEmail(email)

//delete the token if exists
    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })

    }

//generate a new verificationtoken

    const verificationToken = await db.verificationToken.create({
        data: { email, token, expires }
    })
    return verificationToken
    }
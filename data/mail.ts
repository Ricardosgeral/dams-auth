import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string)=>{
    const confirmationLink =
        `${process.env.DOMAIN}/auth/new-verification?token=${token}`
    
    await resend.emails.send({
    from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verify your account here',
        html: `<p>Please Click <a href="${confirmationLink}">here </a> to complete registration</p>`,
  });
}
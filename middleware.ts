import authConfig from "./auth.config"
import NextAuth, { NextAuthConfig } from "next-auth" 
import {
    publicRoutes, 
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT
} from "@/routes"

const {auth} = NextAuth(authConfig)

// here is where i define what to do with routes that pass trhough the middleware.
export default auth((req): any => {
    //console.log(req)
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
  
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return null
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }
    
    
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect( new URL("/auth/login", nextUrl))
    }
    return null
})
 
// Optionally, don't invoke Middleware on some paths (Ex. api routes)
export const config = { //all routes that verify the regex pass through the middleware
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)",
  ], 
}
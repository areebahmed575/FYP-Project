// "use server";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

// export const handleGoogleLogin = async () => {
//     await signIn("google")
// }

import { connectToDb } from "./connectToDB"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { User } from "./models"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    })],

    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log(user, "===>> user")
            // console.log(account, "===>> account")
            // console.log(profile, "===>> profile")
            if (account.provider === "google") {
                connectToDb()
                try {
                    const userInDB = await User.findOne({ email: profile.email });
                    if (!userInDB) {
                        const newUser = new User({
                            username: profile.name,
                            email: profile.email,
                            image: profile.picture,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId
                        })
                        await newUser.save();
                    }
                } catch (error) {
                    console.log(error, "===>>>  error")
                    return false
                }
                return true;
            }
        }
    }
})
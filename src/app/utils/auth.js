import { connectToDb } from "./connectToDB"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { User } from "./models"
import bcrypt from "bcryptjs";

const loginHandler = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            throw new Error("User not found")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Worng Credential")
        }
        return user

    } catch (error) {
        throw new Error("Failed to login")
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialProvider({
        async authorize(credentials) {
            try {
                const user = await loginHandler(credentials)
                return user
            } catch (error) {
                return null
            }
        }
    })
    ],

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
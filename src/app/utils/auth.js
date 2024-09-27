import { connectToDb } from "./connectToDB"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "./models"
import bcrypt from "bcryptjs";

const loginHandler = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            return { success: false, status: 404, message: "User Not Found" }
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
            return { success: false, status: 401, message: "Wrong Credentials" }
        }
        return user

    } catch (error) {
        return { success: false, status: 500, message: error.message }
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const user = await loginHandler(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            },
        }),
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
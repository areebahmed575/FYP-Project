"use server"
import { NextResponse } from "next/server";
// import { signIn } from "./auth";
import { connectToDb } from "./connectToDB"
import { User } from "./models"
import bcrypt from "bcryptjs";


export const register = async (formData) => {
    const { username, email, password } = Object.fromEntries(formData);
    // console.log(formData)
    try {
        connectToDb()

        const user = await User.findOne({ email });
        if (user) {
            return "user already exists"
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return { message: "user saved" }
    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

export const login = async (prevState, formData) => {
    const { email, password } = Object.fromEntries(formData);
    console.log(formData)

    try {
        await signIn("credentials", { email, password });
    } catch (err) {
        console.log(err);

        if (err.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        throw err;
    }
};
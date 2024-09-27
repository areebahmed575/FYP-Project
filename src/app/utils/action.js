"use server"
// import { NextResponse } from "next/server";
// import { signIn } from "./auth";
import { connectToDb } from "./connectToDB"
import { User } from "./models"
import bcrypt from "bcryptjs";
import { signIn } from "./auth";


export const register = async (previousState, formData) => {
    const { username, email, password } = Object.fromEntries(formData);
    console.log(formData)
    try {
        connectToDb()

        const user = await User.findOne({ username });
        if (user) {
            return {
                success: false,
                status: 400,
                message: "user already exists"
            }
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return { success: true, status: 200, message: "user saved" }
    } catch (error) {
        console.log(error);
        return { success: false, status: 500, message: error.message }
    }
}

export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData);
    console.log(formData)

    try {
        await signIn("credentials", { username, password });
        return true
    } catch (err) {
        console.log(err);

        if (err.message.includes("CredentialsSignin")) {
            return { success: false, status: 401, error: "Invalid username or password" };
        }
        throw err;
    }
};
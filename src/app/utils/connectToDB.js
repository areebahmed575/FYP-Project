import mongoose from "mongoose"

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URL);
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        image: {
            type: String,
        },
        provider: {
            type: String,
        },
        providerAccountId: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    }, { timestamps: true });

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distanceFromCityCenter: {
        type: String,
        // required: true,
    },
    photos: {
        type: [String],
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],
    },
    chipestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Hotel = mongoose.models?.Hotel || mongoose.model("Hotel", HotelSchema);
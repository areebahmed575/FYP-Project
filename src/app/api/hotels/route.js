import { NextResponse } from "next/server";
import { Hotel } from "../../utils/models"
import { connectToDb } from "../../utils/connectToDB";

//CREATE HOTELS
export const POST = async (req) => {
    connectToDb();
    const body = await req.json(); //CONVERT REQ INTO JSON
    // console.log(body, "===>>> body")

    const newHotel = new Hotel(body);
    try {
        const saveHotel = await newHotel.save();
        return new NextResponse(JSON.stringify(
            {
                status: "Success",
                saveHotel,
            },
            {
                status: 200
            }
        ))
    } catch (error) {
        return new NextResponse(JSON.stringify(
            {
                status: "Failed",
                message: "Something went wrong",
                data: error
            },
            {
                status: 500
            }
        ))
    }
}

//GET ALL HOTELS
export const GET = async (req) => {
    connectToDb();

    const { searchParams } = new URL(req.url)
    // console.log("====>>> search params", searchParams, "====>>> search params")
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const limit = searchParams.get("limit");
    try {
        const allHotels = await Hotel.find({ chipestPrice: { $gt: min || 100, $lt: max || 99999 } }).limit(limit)
        return new NextResponse(JSON.stringify(
            {
                status: "Success",
                allHotels,
            },
            {
                status: 200
            }
        ))
    } catch (error) {
        return new NextResponse(JSON.stringify(
            {
                status: "Failed",
                message: "Something went wrong",
                data: error
            },
            {
                status: 500
            }
        ))
    }
}
import { NextResponse } from "next/server";
import { connectToDb } from "../../../utils/connectToDB";
import { Hotel } from "../../../utils/models"

//UPDATE SINGLE HOTEL
export const PUT = async (req, { params }) => {

    const { hotelId } = params;
    console.log(hotelId)
    const body = await req.json();
    // console.log(body)
    connectToDb();

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $set: body }, { new: true })
        return new NextResponse(JSON.stringify(
            {
                status: "Success",
                updatedHotel,
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

//DELETE SINGLE HOTEL
export const DELETE = async (req, { params }) => {
    const { hotelId } = params;
    // console.log(hotelId)
    connectToDb();

    try {
        const hotelToDelete = await Hotel.findById(hotelId)
        if (!hotelToDelete) {
            return new NextResponse(JSON.stringify(
                {
                    status: "Failed",
                    // allHotels,
                    message: "Hotel Not Found"
                },
                {
                    status: 404
                }
            ))
        } else {
            await hotelToDelete.deleteOne()
            return new NextResponse(JSON.stringify(
                {
                    status: "Success",
                    message: "Hotel Deleted Successfully"
                },
                {
                    status: 200
                }
            ))
        }
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
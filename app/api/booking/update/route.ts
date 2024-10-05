import { userAuth } from "@/app/middleware/userauth";
import { Booked } from "@/schema/bookedSchema";

export const POST = async(req:Request)=>{
const {checkedIn,checkedOut,bookingId} = await req.json();
  console.log(bookingId)

if(!bookingId){
    return Response.json({
        status:false,
        message:"Fill Booking  Id Properly."
    })
}

const user = await userAuth();
if(!user){
    return Response.json({
        status:false,
        message:"user is not logged in."
    })
}
const isAdmin = user.isAdmin;
if(!isAdmin){
    return Response.json({
        status:false,
        message:"You are not an admin."
    })
}

const booking = await Booked.findById(bookingId);

if(!booking){
    return Response.json({
        status:false,
        message:"Booking not found."
    })
}
booking.checkedIn = checkedIn
booking.checkedOut = checkedOut

const updateBooking = await Booked.findOneAndUpdate({_id:bookingId},booking,{new:true})


return Response.json({
  updateBooking
})
}
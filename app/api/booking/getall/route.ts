import { userAuth } from "@/app/middleware/userauth"
import { Booked } from "@/schema/bookedSchema";

export const GET = async()=>{
  
    const user = await userAuth();
    if(!user){
        
        return Response.json({
          status:false,
          message:"User not found."
        })
    }

    const isAdmin = user.isAdmin;
    if(!isAdmin){
        return Response.json({
            status:false,
            message:"You are not an admin."
          })
    }

    const bookings = (await Booked.find()).reverse()
   return Response.json({
           bookings
    })
}
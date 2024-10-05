import { userAuth } from "@/app/middleware/userauth"
import { Booked } from "@/schema/bookedSchema";

export const GET = async(req:Request)=>{
   
    const user =  await userAuth();
    if(!user){
        return Response.json({
           status:false,
           message:"You are not logged in"
        })
    }
    
    const bookings = await Booked.find({userId:user.id})
  return  Response.json({
       bookings
    })


}
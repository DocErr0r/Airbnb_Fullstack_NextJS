import { errorHandler } from "@/app/middleware/errorhandler";
import { userAuth } from "@/app/middleware/userauth";
import { connectMongoDB } from "@/database/connection"
import { Hotel } from "@/schema/hotelSchema";

export const DELETE = async(req: Request,
    { params }: { params: { id: string } })=>{
await connectMongoDB();
const {id } = params;
if(!id){
    return errorHandler("Plese Enter Id ",403,false);
}
let hotel;
try{

    const user = await userAuth();
    if(!user){
        return errorHandler("Please Login",403,false);
    }
    if(!user.isAdmin){
        return errorHandler("You are not Admin",403,false);
    }
 hotel = await Hotel.findByIdAndDelete(id);

}catch{
    errorHandler("Id have Some Issue.",403,false);
}

if(!hotel){
    return errorHandler("Hotel Not Found",403,false);
}

return Response.json({
    hotel,
    message:"Hotel Deleted Successfully."
});

}
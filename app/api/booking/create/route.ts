import { connectMongoDB } from "@/database/connection";
import {Booked} from '../../../../schema/bookedSchema'
import { userAuth } from "@/app/middleware/userauth";
import { Hotel } from "@/schema/hotelSchema";
import { errorHandler } from "@/app/middleware/errorhandler";
export const POST = async(req: Request)=>{
    await connectMongoDB();
    const data = await req.json();
    const user = await userAuth()
    // console.log(user)
    console.log(data.days)
    if(!user){
        return errorHandler("User not found.",403,false)

    }
    data.userId = user.id
    data.bookingName = user.username
    const hotel = await Hotel.findById(data?.hotelId)
    if(!hotel){
        return Response.json({
            status: false,
            message: "Hotel not found"
        })
    }


    data.checkedIn = false
    data.checkedOut= false

    

    function getDatesBetween(startDate:string, endDate:string) {
        // Parse the start and end dates
        let start = new Date(startDate);
        let end = new Date(endDate);
        
        // Create an array to hold the dates
        let dates = [];
        
        // Iterate from the start date to the end date
        while (start <= end) {
            // Format the date as YYYY-MM-DD and add to the array
            let year = start.getFullYear();
            let month = ('0' + (start.getMonth() + 1)).slice(-2); // Months are zero-based
            let day = ('0' + start.getDate()).slice(-2);
            dates.push(`${year}-${month}-${day}`);
            
            // Move to the next day
            start.setDate(start.getDate() + 1);
        }
        
        return dates;
    }
    
    // Example usage:
    let startDate = data?.checkInDate;
    let endDate = data?.checkOutDate;
    let datesBetween = getDatesBetween(startDate, endDate);
    // console.log(datesBetween);
    for(let i =0;i<datesBetween.length;i++){
        const date = new Date(datesBetween[i])
         console.log(date)
        hotel.unavaiableDates.push(date)
    }
    
   
    await hotel.save()
    data.noofreview = hotel.numofreview,
    data.hotelImg = hotel.image[0].url
    data.hostName = hotel.hostName
    data.rating = hotel.overallrating
    data.location = hotel.location
    data.hotelTitle = hotel.title

    const booking = await Booked.create(data)

   
   return  Response.json(booking)
}
import { errorHandler } from "@/app/middleware/errorhandler";
import { userAuth } from "@/app/middleware/userauth";
import { Hotel } from "@/schema/hotelSchema";

export const POST = async(req:Request,{params}:{params:{
    id:string
}})=>{

    const {id } = params;
    console.log(id);
const {cleanliness,
accuracy,
checkin,
communication,
location,
value, 
comment} = await req.json();

if( !cleanliness || !accuracy || !checkin || !communication || !location ||!value || !comment){
    return errorHandler("Please Fill All Fields",403,false);
}

let hotel;
try{
 hotel = await Hotel.findById(id)
 if(!hotel){
    return errorHandler("hotel not found",403,false);
 }


 const user = await userAuth();

 if(!user){
    return errorHandler("User not found",403,false);
 }

 const userid:string = user.id
 const username:string = user.username

 


 


 let isReviewed = false;
 
for(let i =0;i<hotel.reviews.length;i++){
    if(hotel.reviews[i].userid === userid){
        isReviewed = true;
        hotel.reviews[i].accuracy = accuracy
        hotel.reviews[i].cleanliness = cleanliness
        hotel.reviews[i].communication = communication
        hotel.reviews[i].location = location
        hotel.reviews[i].value = value
        hotel.reviews[i].comment = comment
    }
}
if(!isReviewed){
 hotel.reviews.push({userid,username,cleanliness,
    accuracy,
    checkin,
    communication,
    location,
    value, 
    comment})

 }
    let cleanlinessrating  = 0;
    let accuracyrating = 0;
    let locationrating = 0;
    let checkinrating =0;
    let communicationrating =0;
    let valuerating =0; 

    for(let i =0;i<hotel.reviews.length;i++){
    
      
       cleanlinessrating = cleanlinessrating + (hotel.reviews[i].cleanliness/hotel.reviews.length);
       
       accuracyrating = accuracyrating + (hotel.reviews[i].accuracy/hotel.reviews.length)
       locationrating = locationrating + (hotel.reviews[i].location/hotel.reviews.length)
       checkinrating = checkinrating + (hotel.reviews[i].checkin/hotel.reviews.length)
       communicationrating = communicationrating + (hotel.reviews[i].communication/hotel.reviews.length)
       valuerating = valuerating = (hotel.reviews[i].value/hotel.reviews.length)
       
    }
    
  
    hotel.cleanlinessrating = cleanlinessrating;
    hotel.accuracyrating = accuracyrating;
    hotel.locationrating = locationrating;
    hotel.checkinrating =checkinrating;
    hotel.valuerating =valuerating;
    hotel.communicationrating= communicationrating;
    
    hotel.overallrating = (cleanlinessrating+accuracyrating+locationrating+checkinrating+valuerating+communicationrating)/6;

   


    hotel.numofreview = hotel.reviews.length


    const updatedHotel = await Hotel.findByIdAndUpdate(id,hotel,{
        new:true
    })

     return Response.json({
        updatedHotel
     })

}catch{
    return errorHandler("Id is wrong ",403,false);
}

}
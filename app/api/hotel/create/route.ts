import { errorHandler } from "@/app/middleware/errorhandler"
import {Hotel} from '../../../../schema/hotelSchema'
import { connectMongoDB } from "@/database/connection";
import { LocationSuggestion } from "@/schema/locationSuggestionSchema"
import { userAuth } from "@/app/middleware/userauth";
export const POST = async(req: Request)=>{
    



    await connectMongoDB();
    const data = await req.json();
  
    
    const {title,desc,category,hoteltype,price,hostid,location,selfcheckin,adults,children,infents,bedrooms,beds,bathrooms,hostlanguange,state,country,
        city,propertytype,amenities} = data;

    const totalguest=adults+infents+children;
    const destination = [location,city,state,country].join(', ');
    
    const image = [
        {
            public_id:1,
            url:"https://a0.muscache.com/im/pictures/01e13f3f-b1ae-4d74-a6a2-92330210e535.jpg?im_w=960",

        },
        {
            public_id:2,
            url:"https://a0.muscache.com/im/pictures/miso/Hosting-21914859/original/68a8fc38-7e10-4454-8357-8dfdd37dd059.jpeg?im_w=1200",

        },
        {
            public_id:3,
            url:"https://a0.muscache.com/im/pictures/91c92d67-9d1f-447f-8dda-9650213bfab1.jpg?im_w=1200",

        }
        ,
        {
            public_id:4,
            url:"https://a0.muscache.com/im/pictures/e667391e-47ef-4c92-997d-b1509c7499b4.jpg?im_w=1200",

        },
        {
            public_id:5,
            url:"https://a0.muscache.com/im/pictures/ea28cbdf-943f-4ea2-9a30-c1607ebcdf98.jpg?im_w=1200",

        },
        ,
        {
            public_id:6,
            url:"https://a0.muscache.com/im/pictures/1ba6b34c-95b5-4899-b43f-8d87eb44ea52.jpg?im_w=1200",

        },
        {
            public_id:7,
            url:"https://a0.muscache.com/im/pictures/a33dc3e5-c2f7-423f-b08f-0db74e04d248.jpg?im_w=1200",

        },
        
        {
            public_id:8,
            url:"https://a0.muscache.com/im/pictures/e4207c35-ca01-4859-8608-cc7c843d5f1f.jpg?im_w=1200",

        },
        

        
    ]

     const user = await userAuth();
     const hostName = user?.username;

    const hotel = await Hotel.create({
        image,
        title,
        hostName,
        desc,
        category,
        hoteltype,selfcheckin,adults,children,infents,bedrooms,beds,bathrooms,hostlanguange,state,country,
        price,
        hostid,
        location,
        city,
        totalguest,
        propertytype,
        destination,
        amenities
    

     
    });
    

    //function for adding in location 
     
    const allCombo = [location,city,state,country].join(', ');
    const cityAndStateAndCountryCombo = [city,state,country].join(', ');
    const cityAndStateCombo = [city,state].join(', ');
    const stateAndCountryCombo = [state,country].join(', ');
    const locationAndCountryCombo = [location,category].join(', ');

    console.log(allCombo);
    const allComboFound =  await LocationSuggestion.find({locationSg:allCombo });
    if(allComboFound.length==0){
        console.log("location is newly added")
    const createLocation = await LocationSuggestion.create({
        locationSg:allCombo
    })
   
}

const cityAndStateComboFound =  await LocationSuggestion.find({locationSg:cityAndStateCombo });
if(cityAndStateComboFound.length==0){
    console.log("location is newly added")
const createLocation = await LocationSuggestion.create({
    locationSg:cityAndStateCombo
})

}


const stateAndCountryComboFound =  await LocationSuggestion.find({locationSg:stateAndCountryCombo });
if(stateAndCountryComboFound.length==0){
    console.log("location is newly added")
const createLocation = await LocationSuggestion.create({
    locationSg:stateAndCountryCombo
})

}
const cityAndStateAndCountryComboFound =  await LocationSuggestion.find({locationSg:cityAndStateAndCountryCombo });
if(cityAndStateAndCountryComboFound.length==0){
    console.log("location is newly added")
const createLocation = await LocationSuggestion.create({
    locationSg:cityAndStateAndCountryCombo
})

}
 

const countryFound =  await LocationSuggestion.find({locationSg:country });
if(countryFound.length==0){
    console.log("location is newly added")
const createLocation = await LocationSuggestion.create({
    locationSg:country
})

}

const locationAndCountryComboFound =  await LocationSuggestion.find({locationSg:locationAndCountryCombo });
if(locationAndCountryComboFound.length==0){
    console.log("location is newly added")
const createLocation = await LocationSuggestion.create({
    locationSg:locationAndCountryCombo
})

}
 



    return Response.json({
       hotel
    })



}
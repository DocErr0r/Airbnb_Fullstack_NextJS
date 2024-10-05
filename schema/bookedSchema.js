import mongoose from "mongoose";
import { type } from "os";
const { Schema } = mongoose;


const bookedSchema = new Schema({
   
    hotelId:{
        type: String,
    },
    userId:{
        type:String
    },
    bookingName:{
        type:String
    },checkInDate:{
       type:Date
    },
    checkOutDate:{
        type:Date
    },
    checkedIn:{
        type:Boolean
    },
    checkedOut:{
        type:Boolean
    },
    adults:{
        type:Number
    },
    children:{
        type:Number
    },
    infents:{
        type:Number
    },

    totalguest:{
        type:Number
    },
    days:{
        type:Number
    },


    noofreview:Number,
    hotelImg:String,
    hostName: String,
    rating: Number,
    location:String,
    hotelTitle:String,
    price:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    priceWithTax:{
        type:Number
    }

   

})


mongoose.models={};

export const Booked = mongoose.model('Booked', bookedSchema);
import { errorHandler } from "@/app/middleware/errorhandler"
import { userAuth } from "@/app/middleware/userauth"
import { User } from "@/schema/userSchema"

export const PUT = async(req:Request)=>{
const {id,role} = await req.json()
if(!id ){
  return errorHandler("Please Enter Id",403,false)
}


const _id = id

const adminAuth = await userAuth();

if(!adminAuth){
    return errorHandler("Please Login ",403,false)

}
if(!adminAuth.isAdmin){
    return errorHandler("You are not an Admin",403,false)
}

const user = await User.findById(_id)
if(!user){
    return errorHandler("User Not Found",404,false)
}


user.isAdmin = role
console.log(user.isAdmin)
await user.save()
console.log("I am here")
return  Response.json({
    message:"User Updated Successfully",
    statusCode:200


})


}
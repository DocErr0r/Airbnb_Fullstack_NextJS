import Razorpay from 'razorpay'

const instance = new Razorpay({
    key_id:"rzp_test_ls6onRT6Sk1T5y",
    key_secret:"ffkbozMSbtiQIhSVxqCw8kq5" ,
  });


export const POST =  async(req:Request)=>{
//  const {amount} = await req.json()
const {amount} = await req.json()


  var options = {
    amount: Number(amount*100),  // amount in the smallest currency unit
    currency: "INR",
  
  };


  

const order = await  instance.orders.create(options);

return Response.json({
  order,
  message:"Order Created successfully",
  statusCode:201
})

}

export const GET = async()=>{
 return Response.json({
  key:"rzp_test_ls6onRT6Sk1T5y"
 })
}
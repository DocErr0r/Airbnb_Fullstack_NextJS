import crypto from "crypto"


export const POST = async(req:Request)=>{
    const data = await req.json()
let body=data.razorpay_order_id + "|" + data.razorpay_payment_id;
var expectedSignature = crypto.createHmac('sha256',"ffkbozMSbtiQIhSVxqCw8kq5")
                                  .update(body.toString())
                                  .digest('hex');
                                  console.log("sig received " ,data?.razorpay_signature);
                                  console.log("sig generated " ,expectedSignature);


                                  
            if(data?.razorpay_signature===expectedSignature){
                return   Response.json({
                    success:true
                })
  
  
              }

}



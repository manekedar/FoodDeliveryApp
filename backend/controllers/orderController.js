 import Stripe from "stripe"
 import orderModel from "../models/orderModel.js"
 import userModel from "../models/userModel.js"

 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const placeOrder = async (req, res) => {
   const frontend_url = "http://localhost:5174";
   try {
     const { items, amount, address } = req.body;
 
     const newOrder = new orderModel({
       userId: req.userId,
       items,
       amount,
       address
     });
 
     await newOrder.save();
 
     await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
 
     const line_items = items.map((item) => ({
       price_data: {
         currency: "INR",
         product_data: {
           name: item.name
         },
         unit_amount: item.price * 100, // Price in paise (INR smallest unit)
       },
       quantity: item.quantity
     }));
 
     line_items.push({
       price_data: {
         currency: "INR",
         product_data: {
           name: "Delivery Charges"
         },
         unit_amount: 200 // ₹2 = 200 paise
       },
       quantity: 1
     });
 
     const session = await stripe.checkout.sessions.create({
       line_items,
       mode: "payment",
       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
     });
 
     res.json({ success: true, session_url: session.url });
 
   } catch (error) {
     console.error(error);
     res.json({ success: false, message: "Error placing order" });
   }
 };
 
 export const verifyOrder = async (req,res) =>{
        const { orderId,success} = req.body
        try {
           if (success =="true") {
              await orderModel.findByIdAndUpdate(orderId,{payment:true});
              res.json({success:true, message:"Paid"})
           }
           else{
             await orderModel.findByIdAndDelete(orderId);
             res.json({success:false, message:"Not Paid"})
           }
        } catch (error) {
           console.log(error)
           res.json({success:false,message:"Error"})
        }
 }

 // user orders for frontend
 export const userOrders = async (req,res) => {
    try {
       const orders = await orderModel.find({userId:req.userId})
       res.json({success:true,data:orders})
    } catch (error) {
       console.log(error)
       res.json({success:false,message:"Error"})
    }
 }

 // Listing orders for admin panel
 export const listOrder = async (req,res) =>{
    try {
      const orders = await orderModel.find({});
      res.json({success:true, data:orders})
    } catch (error) {
      console.log(error)
      res.json({ success:false, message:"Error"})
    }
 }

 // api for updating order status
 export const updateStatus = async (req,res) => {
    try {
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
       res.json({ success:true, message:"Status Updated"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
 }
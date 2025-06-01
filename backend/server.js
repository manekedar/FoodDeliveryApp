
import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import userRoute from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import connectCloudinary from './config/cloudinary.js'
//import bodyParser from 'body-parser'

const app = express();
const port = process.env.PORT || 4000;



// Middleware
app.use(express.json());
app.use(cors());



await connectDB();
await connectCloudinary();
//app.use(bodyParser.json());
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome in backend!" });
});

app.use("/api/food", foodRouter);
app.use("/api/user",userRoute)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

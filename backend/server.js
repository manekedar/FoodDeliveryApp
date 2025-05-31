
import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import foodRouter from "./routes/food.route.js";
import path from "path";
import { fileURLToPath } from 'url';
import userRoute from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve static image files from uploads/
app.use("/images", express.static(path.join(__dirname, "uploads")));

await connectDB();

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

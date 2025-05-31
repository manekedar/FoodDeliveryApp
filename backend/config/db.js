import mongoose from "mongoose";

// Connect to the mongodb database

const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/fooddelivery`)
}

export default connectDB
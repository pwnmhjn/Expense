import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected:${connect.connection.host}`)
    } catch (error) {
        console.log("MongoDb Connection Failed", error);
        process.exit(1)
    }
}
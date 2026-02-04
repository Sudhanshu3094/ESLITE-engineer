// import mongoose from "mongoose";

// const connectDB = async ()=> {

//     mongoose.connection.on('connected', () => console.log("database connected"))

//        await mongoose.connect(`${process.env.MONGODB_URL}/eslite`)
// }

// export default connectDB


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URL}/eslite`);
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // stop server if DB fails
    }
};

export default connectDB;

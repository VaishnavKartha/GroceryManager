import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>console.log("Database Connection Successfull"));
        mongoose.connect(`${process.env.MONGOOSESECRET}/groceryManager`)
    } catch (error) {
        console.log(error.message)
        
    }
}

export default connectDB;
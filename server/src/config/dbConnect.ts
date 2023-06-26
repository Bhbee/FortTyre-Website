import mongoose from 'mongoose';

const dbConnect = async () =>{
    const Db_URI = process.env.MONGO_URL as string
    try{
        await mongoose.connect(Db_URI) 
       console.log("Database connected")

    }

    catch(err){
        console.log("db error", err);
        process.exit(1)
    }
}

export default dbConnect
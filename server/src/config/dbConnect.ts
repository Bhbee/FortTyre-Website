import mongoose from 'mongoose';
// import config from 'config';
import log from "../logger"

const dbConnect = async () =>{
    //const Db_URI = config.get<string>('dbUri') // Or const Db-URI = config.get ("dbUri")as string;
    const Db_URI = process.env.MONGO_URL as string
    try{
        await mongoose.connect(Db_URI) 
        log.info("Database connected")

    }

    catch(err){
        log.error("db error", err);
        process.exit(1)
    }
}

export default dbConnect
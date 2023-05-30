import mongoose from 'mongoose';
const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports = connectDb
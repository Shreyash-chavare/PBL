import mongoose from 'mongoose'
import  config  from 'config';
import dbgr from 'debug'
import dotenv from 'dotenv';

dotenv.config();

const dbg=dbgr("development:Mongoose");

// Use environment variable for production, config for development
const dbUri = process.env.NODE_ENV === 'production' 
    ? process.env.MONGODB_URI 
    : `${config.get("DB_URI")}/PBL`;

const mongo=mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    dbg("MongoDB connected successfully")
    console.log("✅ Database connection established")
}).catch((err)=>{
    console.error("❌ MongoDB connection error:", err.message);
    console.error("Connection string used:", dbUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
})
export default mongo;

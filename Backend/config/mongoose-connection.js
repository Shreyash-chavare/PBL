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

const mongo=mongoose.connect(dbUri)
.then(()=>{
    dbg("connected")
}).catch((err)=>{
    console.log(err);
})
export default mongo;

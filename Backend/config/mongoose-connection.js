import mongoose from 'mongoose'
import  config  from 'config';
import dbgr from 'debug'
const dbg=dbgr("development:Mongoose");

const mongo=mongoose.connect(`${config.get("DB_URI")}/PBL`)
.then(()=>{
    dbg("connected")
}).catch((err)=>{
    console.log(err);
})
export default mongo;

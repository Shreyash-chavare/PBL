import usermodel from '../models/usermodel.js'
import tokenuser from '../utils/usertoken.js'
import bcrypt from 'bcrypt'
const user=async(req,res)=>{
    const {fullname,username,password,Email}=req.body;
    try{

        let createduser=await usermodel.findOne({Email});
    if(!createduser){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
                let usercreate =await usermodel.create({
                    fullname,
                    username,
                    password:hash,
                    Email, 
                })
                const token=tokenuser(usercreate);
                res.cookie("user-token",token);
                res.status(201).send(usercreate);
            }
    else{
        return res.status(505).send(`User ${fullname} Already exist`);
    }
    }catch(err){
        console.log(err);
        res.status(505).send("server error");
    }

    
} 
export default user;
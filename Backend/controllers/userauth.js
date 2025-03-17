import usermodel from '../models/usermodel.js'
import tokenuser from '../utils/usertoken.js'
import bcrypt from 'bcryptjs'
const authuser=async(req,res)=>{

    console.log(req.body);
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const Email = req.body.email;

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
                console.log("User created successfully");
                res.json({success:true,message:"User created successfully"});
            }
    else{
        return res.status(505).send(`User ${username} Already exist`);
    }
    }catch(err){
        console.log(err);
        res.status(505).send("server error");
    }

    
} 
export default authuser;
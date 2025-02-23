import usermodel from '../models/usermodel.js'
import tokenuser from '../utils/usertoken.js'
import bcrypt from 'bcrypt'
const authuser=async(req,res)=>{
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const Email = req.body.Email;

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
                 res.redirect('/login');
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
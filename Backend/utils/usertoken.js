 import jwt from 'jsonwebtoken';
 const generatetoken=(user)=>{
        return jwt.sign({Email:user.Email,id:user._id},process.env.JWT_TOKEN);
    }
export default generatetoken;
    
    

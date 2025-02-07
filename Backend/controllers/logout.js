
const logout=(req,res)=>{
    res.cookie("user-token","");
    res.redirect('/login');
}
export default logout;
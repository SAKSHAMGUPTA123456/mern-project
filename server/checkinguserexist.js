const jwt=require('jsonwebtoken')
const User=require('./user-model')
const authuserexist=async(req,res,next)=>{
try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ mssg: "Token not provided" });
    }

    const realToken = token.replace("Bearer", "").trim();

    const isverified = jwt.verify(realToken, process.env.JWT_SECRET);
    
    const realuser = await User.findOne({ email: isverified.email });

    if (!realuser) {
      return res.status(404).json({ mssg: "User not found" });
    }

    req.user = realuser;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ mssg: "Invalid or expired token", error: error.message });
  }
};
module.exports=authuserexist
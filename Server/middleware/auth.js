import jwt from 'jsonwebtoken';
import Users from '../models/UserSchema.js';
import 'dotenv/config'

export const protectedRoute = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        // console.log(token);

        if(!token){
            return res
            .status(401)
            .json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Users.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
          }
      
          req.user = user;
          next(); 

    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
}
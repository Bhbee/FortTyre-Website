import jwt from "jsonwebtoken";
import {User} from "../models/user.model"

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }, 
    JWT_SECRET, 
    {expiresIn: '1d'}
  )
}


//Refresh Token
export function generateRefreshToken(user: User){
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }, 
    JWT_SECRET, 
    {expiresIn: '3d'}
  )
}

import jwt from "jsonwebtoken";
import {User} from "../models/user.model"

const JWT_SECRET = process.env.JWT_SECRET as string

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }, 
    JWT_SECRET, 
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
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
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN}
  )
}

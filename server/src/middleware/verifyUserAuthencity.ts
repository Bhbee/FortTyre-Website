import jwt from "jsonwebtoken";
import { Request,  Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const verifyUser = (req: Request, res:Response, next:NextFunction) => {
    const {authorization} = req.headers
    if (authorization?.startsWith('Bearer')) {
      const accessToken = authorization.slice(7, authorization.length)
      try{
        const decode = jwt.verify(accessToken, JWT_SECRET)
        req.user = decode as {
          _id: string
          email: string
          phone_number: string
          isAdmin: boolean
          refreshToken: string
        }
        next()
      } catch(error) {
        res.send("session time out")
      }
    }else {
      res.status(403).send({ message: "Token expired. Please login again"})
    }
  }
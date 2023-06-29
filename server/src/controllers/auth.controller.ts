import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken} from '../utils/jwt.utils'
import { User, UserModel } from '../models/user.model'


export const userRouter = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string;

//Login
export const Login = asyncHandler(async (req: Request, res: Response) =>{
  const findUser = await UserModel.findOne({email: req.body.email})
  if (findUser && bcrypt.compareSync(req.body.password, findUser.password)) {
    findUser.refreshToken = generateRefreshToken(findUser)
    await findUser.save()
    res.cookie("refreshToken", findUser.refreshToken, {
      httpOnly: true, maxAge: 72 * 60 * 60  * 1000
    })
    res.send({
      accessToken: generateToken(findUser)
    })
  }
  else{
    res.status(401).send({message: "incorrect Email or Password"})
  }
})

//Register
export const Register = asyncHandler(async (req: Request, res: Response) =>{
  const findUser = await UserModel.findOne({email: req.body.email})
  const findUserPhone = await UserModel.findOne({phone_number: req.body.phone_number})

  if(!findUser && !findUserPhone){
    const salt = await bcrypt.genSalt(12) 
    await UserModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: bcrypt.hashSync(req.body.password, salt)
    } as User)
    res.status(201).send({message:"Successfully Registered"})
  } else if (findUserPhone) {
    res.status(401).send({message:"This phone number has been registered by another user"})
  }
  else{
    res.status(401).send({message:"This email address has been registered by another user"})
  }

})

// Handle Refresh Token

export const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(401).send({message:"Please login"});
    return
  }

  const refreshToken = cookie.refreshToken;
  const UserFound = await UserModel.findOne({ refreshToken });

  if (!UserFound) {
    res.sendStatus(401)
    return;
  }

  try {
    const decode = jwt.verify(refreshToken, JWT_SECRET) as {
      _id: string;
      email: string;
      phone_number: string;
      isAdmin: boolean;
      refreshToken: string;
    };
    req.user = decode;
    res.send({
      accessToken: generateToken(UserFound),
    });
  } catch (error) {
    res.status(401).send("Invalid refresh token");
  }
})


export const Logout = asyncHandler(async (req: Request, res: Response) =>{
  const cookie = req.cookies
  if(!cookie?.refreshToken) {
    res.sendStatus(204)
    return
  }
  const refreshToken = cookie.refreshToken
  const user = await UserModel.findOne({refreshToken})
  if(!user){
    res.clearCookie("refreshToken", {
      httpOnly:true,
      secure: true
    })
    res.sendStatus(204)
  }
  await UserModel.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly:true,
    secure: true
  })
  res.sendStatus(204)
})
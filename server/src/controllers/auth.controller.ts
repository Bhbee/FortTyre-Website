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
  //if(!req.body.email || !req.body.password) res.send("Please fill all fields")
  if (findUser && bcrypt.compareSync(req.body.password, findUser.password)) {
    findUser.refreshToken = generateRefreshToken(findUser)
    const updatedUser = await findUser.save()
    res.cookie("refreshToken", findUser.refreshToken, {
      httpOnly: true, maxAge: 72 * 60 * 60  * 1000
    })
    res.send({
      email:findUser.email,
      isAdmin: findUser.isAdmin,
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
    const user = await UserModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: bcrypt.hashSync(req.body.password, salt)
    } as User)
    res.send({
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email:user.email,
        phone_number: user.phone_number,
        isAdmin: user.isAdmin,
        accessToken: generateToken(user)
    })
  } else if (findUserPhone) {
    res.status(401).send({message:"This phone number has been registered by another user"})
  }
  else{
    res.status(401).send({message:"This email address has been registered by another user"})
  }

})

// Handle Refresh Token
// export function handleRefreshToken() {
//     asyncHandler(async (req: Request, res: Response) =>{
//         const cookie = req.cookies
//         if(!cookie?.refreshToken) res.send("No refresh token in cookies")
//         const refreshToken = cookie.refreshToken
//         const User = await UserModel.findOne({refreshToken})
//         if (!User) res.send("Refresh Token does not match")
//         jwt.verify( refreshToken, JWT_SECRET,(err: any, decoded: any) =>{
//                 // if (err || User.id !== decoded.id ) res.send ("There is an issue with the refresh token")
//                 // const accessToken = generateToken(User?._id)
//                 // res.json(accessToken)
//             })
        
//     })
// }
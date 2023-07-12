import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken} from '../utils/jwt.utils'
import { User, UserModel } from '../models/user.model'
import { findAndUpdateUser, getGoogleOauthToken, getGoogleUser } from '../service/googleSession.service'


export const userRouter = express.Router()
const JWT_SECRET = process.env.JWT_SECRET as string;


export const googleOauthController = asyncHandler(async (req: Request, res: Response) =>{
  //get code from query string
  const code = req.query.code as string

  try{
    //get the id and access token with code
    const {id_token, access_token} = await getGoogleOauthToken({code})

    //get user with token
    const googleUser = await getGoogleUser({id_token, access_token})
    //jwt.decode(id_token)
    if(!googleUser.verified_email){
      return res.status(403).send("Google account is not verified")
    }
    //upsert user
    const user = await findAndUpdateUser(
      {email: googleUser.email},
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture
      },
      {
        upsert:true, new: true
      }

    )
    //create session
    if (!user)
    return res.redirect(`$http://localhost:/oauth/error`);

  // Create access and refresh token
    const { access_token: accessToken, refresh_token } = await signToken(user)

  // Send cookie
    res.cookie('refresh-token', refresh_token,  {
      httpOnly: true, maxAge: 72 * 60 * 60  * 1000
    })
    res.cookie('access-token', accessToken, {
      httpOnly: true, maxAge: 24 * 60 * 60  * 1000
    })
    res.cookie('logged_in', true, {
      expires: new Date(
        Date.now() + 24 * 60 * 1000
      ),
    });
    //create access & refresh token

    //set cookies

    //redirect back to client
  }catch(err){
    const redirectUrl = "http://localhost/300/oauth/error"
    return res.redirect(redirectUrl)
  }
  
})

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
      sub: string;
      email: string;
      phone_number: string;
      isAdmin: boolean;
      refreshToken: string;
    };
    req.user = decode;
    res.send({
      accessToken: generateRefreshToken(UserFound),
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

























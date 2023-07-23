import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken} from '../utils/jwt.utils'
import { User, UserModel } from '../models/user.model'


export const userRouter = express.Router()

//Get all user: By Admin only
export const GetAllUserInfo = asyncHandler(async (req: Request, res: Response) =>{
  const users = await UserModel.find({}).lean()
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  res.send(usersWithoutPassword);
})

//update user info by Admin only
export const UpdateIUserInfoByAdmin = asyncHandler(async (req: Request, res: Response) =>{
  const user = await UserModel.findById(req.params.id);
  if (user) {
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.phone_number = req.body.phone_number;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
})

//Delete user from database by Admin only
export const DeleteUSer = asyncHandler(async (req: Request, res: Response) =>{
  const user = await UserModel.findById(req.params.id);
  if (user) {
    if (user.isAdmin === true) {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    await UserModel.deleteOne()
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
})

//to do laterchange password
//update personal user details i.e can only be done by owner of account

export const UpdatePersonalUserInfo = asyncHandler(async (req: Request, res: Response) =>{
      const salt = await bcrypt.genSalt(12) 
      const user = await UserModel.findById(req.user._id);
      if (user) {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.phone_number = req.body.phone_number || user.phone_number;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          phone_number: updatedUser.phone_number,
          isAdmin: updatedUser.isAdmin,
          accessToken: generateToken(updatedUser),
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    })

//Get a user profile by id
export const GetUserProfile = asyncHandler(async (req: Request, res: Response) =>{
  const { id } = req.params;
  const currentUser = req.user; 

  if (id !== currentUser._id && !currentUser.isAdmin) {
    res.status(403).send({ message: "Access denied" });
    return;
  }
  else{
  const user = await UserModel.findById(req.params.id).lean()
    if (user) {
      const { password, ...userWithoutPassword } = user
      res.send(userWithoutPassword);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }
})

import  express, { Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User, UserModel } from '../models/user.model'
import { OrderModel } from '../models/order.model'


export const userRouter = express.Router()

//Get all user: By Admin only
export const GetAllUserInfo = asyncHandler(async (req: Request, res: Response) =>{
  const users = await UserModel.find({}).lean()
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  res.send(usersWithoutPassword);
})

//Get my profile
export const GetMyProfile = asyncHandler(async (req: Request, res: Response) =>{
  const { id } = req.params;
  const currentUser = req.user; 

  if (id !== currentUser._id) {
    res.status(403).send({ message: "Access denied" });
    return;
  }
  else{
  const user = await UserModel.findById(req.params.id).lean()
  const orders = await OrderModel.find({user: currentUser._id})
    if (user) {
      const { password, ...userWithoutPassword } = user
      res.send({
        userWithoutPassword,
        orders
      });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  }
})


//Get user's profile  by Admin only
export const GetUserProfile = asyncHandler(async (req: Request, res: Response) =>{
  const { id } = req.params;
  const userFound = await UserModel.findById(id).lean()
  const orders = await OrderModel.find({user: userFound?._id})
    if (userFound) {
      const { password, ...userWithoutPassword } = userFound
      res.send({
        userWithoutPassword,
        orders
      });
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


export const UpdatePersonalUserInfo = asyncHandler(async (req: Request, res: Response) =>{
  const { id } = req.params;
  const currentUser = req.user._id; 
  //console.log(currentUser, id)
  if (id !== currentUser) {
    res.status(403).send({ message: "Access denied" });
    return;
  }else{
    const salt = await bcrypt.genSalt(12) 
    const user = await UserModel.findById(currentUser);
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
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
})
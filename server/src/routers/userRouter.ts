import  express from 'express'
import {isAdmin} from '../middleware/verifyAdmin'
import {verifyUser} from '../middleware/verifyUserAuthencity'


import {GetAllUserInfo, GetUserProfile, UpdatePersonalUserInfo, UpdateIUserInfoByAdmin, DeleteUSer} from '../controllers/user.controller'

export const userRouter = express.Router()

//Get all user
userRouter.get("/", verifyUser, isAdmin,  GetAllUserInfo)

//Get user profile
userRouter.get("/:id", verifyUser, GetUserProfile)

//Update user isAdmin status by Admin only
userRouter.patch("/:id", verifyUser, isAdmin, UpdateIUserInfoByAdmin )

//update user details: No need for admin auth
userRouter.put( "/:id", verifyUser, UpdatePersonalUserInfo)

//Delete uer
userRouter.delete("/:id", verifyUser, isAdmin, DeleteUSer)
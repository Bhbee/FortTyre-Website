import  express from 'express'
import {isAdmin} from '../middleware/verifyAdmin'
import {verifyUser} from '../middleware/verifyUserAuthencity'


import {GetAllUserInfo,GetMyProfile, GetUserProfile, UpdatePersonalUserInfo, DeleteUSer} from '../controllers/user.controller'

export const userRouter = express.Router()

//Get all user
userRouter.get("/", verifyUser, isAdmin,  GetAllUserInfo)

//Get my profile
userRouter.get("/profile/:id", verifyUser, GetMyProfile)

//View user's profile by Admin only
userRouter.get("/:id", verifyUser, GetUserProfile)

//update my details: No need for admin auth
userRouter.patch( "/:id", verifyUser, UpdatePersonalUserInfo)

//Delete user
userRouter.delete("/:id", verifyUser, isAdmin, DeleteUSer)
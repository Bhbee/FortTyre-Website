import express from 'express'
import {Login, Logout, Register, handleRefreshToken } from '../controllers/auth.controller'
import {forgotPassword, passwordReset} from '../controllers/resetPassword.controller'
import {googleOauthHandler} from '../controllers/googleOauth.controller'
export const authRouter = express.Router()

//Login
authRouter.post('/sign-in', Login)

//Registration
authRouter.post('/sign-up', Register)

//Refresh token
authRouter.get("/refresh", handleRefreshToken)

//Logout
authRouter.get("/sign-out", Logout)

//google Oauth
authRouter.get('/oauth/google', googleOauthHandler);

//Forgot Password? Get reset-password link
authRouter.post("/forgot-password", forgotPassword)

//Reset password
authRouter.post("/reset-password/:id/:token", passwordReset)
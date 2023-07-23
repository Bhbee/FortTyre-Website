import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import MailHandler from '../utils/mailHandler'
import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {User, UserModel} from '../models/user.model' 
import { error } from 'console'


//Get reset-password link
const pKey = process.env.privateKey as string;
const baseUrl = process.env.baseUrl as string;
export const forgotPassword = asyncHandler(async (req: Request, res: Response) =>{
    const user = await UserModel.findOne({ email: req.body.email });
    const secret = pKey + user?.phone_number
    if (user) {
      const token = jwt.sign(
        { 
          sub: user._id,
          email: user.email,
        }, 
        secret, 
        {expiresIn: '1h'}
      );

      //reset link
      const link = `${baseUrl}/auth/reset-password/${user.id}/${token}`

      const mailHandler = new MailHandler();
      mailHandler.sendEmail(user.email, 
        'Password Reset',
         `<p>Hey, Please follow this ${link} to reset your password.</p> `,
         (error:any, info:any)=>{
          if (error) {
            res.status(500).json({ error: 'An error occurred while sending the email.' });
          } else {
            res.status(200).json({ message: 'Email sent successfully!', response: info?.response });
          }
         });
      
    } else {
      res.status(404).send({ message: 'User not found' });
    }
})

export const passwordReset = asyncHandler(async (req: Request, res: Response) =>{
    const salt = await bcrypt.genSalt(12) 
    const {id, token} = req.params
    try{
      const user = await UserModel.findOne({ _id: id })
      const secret = pKey + user?.phone_number
      const decoded = jwt.verify(token, secret) as {
        _id: string;
        email: string;
      }
      if (user) {
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, salt )
          await user.save();
          res.send({message: 'Password reset successful' })
          return
        }
      }
      res.send({message: 'User not found ' })
    }
    catch(error){
      res.status(401).send({ message: 'Invalid Token' });
    }
})
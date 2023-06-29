import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import {Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {User, UserModel} from '../models/user.model' 


//Get reset-password link
const pKey = process.env.privateKey as string;

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
      const link = `http://localhost:3000/auth/reset-password/${user.id}/${token}`

      //const link = `${baseUrl()}/reset-password/${user.id}/${token}`);

      var transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth:{
              user: "samuelchristiana38@gmail.com",
              pass: "lfdeltnqsdtoqbrc"
          }
      })

      var mailOptions = {
          from: "samuelchristiana38@gmail.com",
          to: user.email,
          subject: "Password Reset",
          text: `Hey, Please follow this ${link} to reset your password.`

      }

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          res.send({ message: 'Unsuccessful.' });
        }else{
          res.send({ message: 'We sent reset password link to your email.' });
          console.log(link)
        }
      })
      
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
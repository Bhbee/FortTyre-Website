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
      
    if (user) {
      const token = jwt.sign({ _id: user._id },
            pKey, 
            {expiresIn: '3h',});
      user.resetToken = token;
      await user.save();

      //reset link
      const link = `https://localhost:3000/reset-password/${token}`

      //const link = `${baseUrl()}/reset-password/${token}`);

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
          to: req.body.email,
          subject: "Password Reset",
          text: link

      }
      res.send({ message: 'We sent reset password link to your email.' });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
})

export const passwordReset = asyncHandler(async (req: Request, res: Response) =>{
    const salt = await bcrypt.genSalt(12) 
    jwt.verify(req.body.token, pKey, async(err: any, decode: any) => {
    if (err) {
      res.status(401).send({ message: 'Invalid Token' });
    } else {
      const user = await UserModel.findOne({ resetToken: req.body.token });
      if (user) {
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, salt );
          await user.save();
          res.send({
            message: 'Password reset successful',
          });
        }
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    }
  });
})
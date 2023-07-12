import { Request, Response, NextFunction } from "express"
import { getGoogleOauthToken, getGoogleUser } from "../service/googleSession.service";
import { generateRefreshToken, generateToken } from "../utils/jwt.utils";
import { UserModel } from "../models/user.model";

export const googleOauthHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Get the code from the query
      const code = req.query.code as string;
      const pathUrl = (req.query.state as string) || '/';
  
      if (!code) {
        res.status(401).json( {message: "Authorization code not provided!"})
      }
      // Use the code to get the id and access tokens
      const { id_token, access_token } = await getGoogleOauthToken({ code });
  
      // Use the token to get the User
      const { name, verified_email, email, picture } = await getGoogleUser({
        id_token,
        access_token,
      });
  
      // Check if user is verified
      if (!verified_email) {
        res.status(403).json( {message: "Google account not verified"})
      }
  
      // Update user if user already exist or create new user

      
        const user = await UserModel.findOneAndUpdate({email: req.user.email});
        if (user) {
          user.name = name 
          user.photo = picture
          user.email = email
          const updatedUser = await user.save();
        } else {
          res.status(404).send({ message: "User not found" });
        }
      
  
      // const user = await findAndUpdateUser(
      //   { email },
      //   {
      //     name,
      //     photo: picture,
      //     email,
      //   },
      //   { upsert: true, runValidators: false, new: true, lean: true }
      // );
  
      if (!user)
        return res.redirect(`${process.env.origin}/oauth/error`);
  
      // Create access and refresh token
      const accessToken  = generateToken(user)
      const refresh_token  = generateRefreshToken(user);
  
      // Send cookie
      res.cookie('refresh-token', refresh_token,  {
        httpOnly: true, maxAge: 72 * 60 * 60  * 1000
      })
      res.cookie('access-token', accessToken, {
        httpOnly: true, maxAge: 24 * 60 * 60  * 1000
      })
      res.cookie('logged_in', true, {
        expires: new Date(
          Date.now() + 0.5 * 60 * 1000
        ),
      });
  
      res.redirect(`${process.env.origin}${pathUrl}`);
    } catch (err: any) {
      console.log('Failed to authorize Google User', err);
      return res.redirect(`${process.env.origin}/oauth/error`);
    }
  };
  
import { Request, Response, NextFunction } from "express";
const baseUrl = process.env.baseUrl as string
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user ) {
      next()
    } else {
      res.redirect(`${baseUrl}/login`) //redirect to login page
    }
  }
    
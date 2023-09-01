import { Request, Response, NextFunction } from "express";
const origin = process.env.origin as string
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.user ) {
      next()
    } else {
      res.redirect(`${origin}/login`) //redirect to login page
    }
  }
    
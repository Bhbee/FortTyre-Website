
declare namespace Express {
    export interface Request {
      user: {
        _id: string
        first_name: string
        last_name: string
        email: string
        phone_number: string
        isAdmin: boolean
        accessToken: string
        resetToken: string
        refreshToken: string
      }
    }
  }
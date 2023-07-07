
declare namespace Express {
    export interface Request {
      user: {
        sub: string
        email: string
        phone_number: string
        isAdmin: boolean
        refreshToken: string
      }
      post(options: any, callback: any): void;
    }
  }

declare namespace Express {
  export interface Request {
    user: {
      _id: string
      email: string
      phone_number: string
      isAdmin: boolean
      refreshToken: string
    }
    post(options: any, callback: any): void;
  }
}

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User, UserModel } from '../models/user.model'


const id = process.env.googleClientId as string
const secret = process.env.googleClientSecret as string
const callbk = process.env.googleOauthRedirectUrl

passport.serializeUser(async(user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user)
});

    
passport.use(
  new GoogleStrategy(
    {
      clientID: id,
      clientSecret: secret,
      callbackURL: callbk
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id
      const firstName = profile.name?.givenName
      const lastName = profile.name?.familyName
      const email = profile.emails ? profile.emails[0].value : null
      const foundUser = await UserModel.findOne({email: email})
      if(foundUser){
          done(null, foundUser)
      }else{
          const newUser =  UserModel.create({
              googleId: googleId,
              first_name: firstName,
              last_name: lastName,
              email: email,
              isAdmin: false
          //     phone_number: req.body.phone_number,
          //     password: bcrypt.hashSync(req.body.password, salt)
          } as User)
          if(newUser){
            done(null, newUser)
          }
          
      } 
    }
  )
);
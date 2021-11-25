import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import * as dotenv from 'dotenv'

dotenv.config();

/**
 * Clase AuthFacebook que permite el uso de la autenticación de Google.
 */
export class AuthGoogle {
  constructor() {
  }

  /**
    *  Función que levanta la autenticación de Google.
    */
  
  goAuthGoogle(){
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.LOCAL_HOST}/auth/google/callback`
    },(accessToken: any, refreshToken: any, profile: any, done: any) => {
        return done(null, profile, {accessToken,refreshToken});
      }
    ));
  }
}

new AuthGoogle().goAuthGoogle();
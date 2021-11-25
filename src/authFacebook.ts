import passport from 'passport';
const FacebookStrategy = require('passport-facebook').Strategy;
import * as dotenv from 'dotenv'

dotenv.config();

/**
 * Clase AuthFacebook que permite el uso de la autenticación de Facebook.
 */
export class AuthFacebook {
  constructor() {
  }

  /**
    *  Función que levanta la autenticación de Facebook.  
    */
  goAuthFacebook(){
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.LOCAL_HOST}/auth/facebook/callback`
    },(accessToken: any , refreshToken: any, profile:any, cb:any) =>{
        return cb(null, profile, {accessToken,refreshToken}); 
      }
    ));
  }
}

new AuthFacebook().goAuthFacebook();

import express from 'express';
import passport from 'passport';
import * as dotenv from 'dotenv'
require('./authFacebook');
require('./authGoogle');

/**
 * Clase index que permite levantar el servidor.
 */
export class Index {

    app = express();
    host = process.env.LOCAL_HOST;
    PORT = process.env.PORT;
    constructor() {
    }
   
    /**
     * Función que permite el levantamiento del servidor.
     */
    goServer() {
        this.app.get('/', (req,res) => res.send('Api Auth Facebook Google'));
        this.app.listen(this.PORT, () => {
        console.log(`⚡️[server]: Server is running at ${this.host}`);
    });}


    /**
     * Función que permite inicializar el uso de la libreria passport js.
     */
    initializePasssport(){
        // Initialize passport
        this.app.use(passport.initialize());
    
        // configue serializeUser and deserializeUser
        passport.serializeUser( (user: any, done) =>{
            done(null, user);
        })
        passport.deserializeUser( (user: any, done) =>{
            done(null, user);
        })
    }

    /**
     * Función que permite la escucha de los eventos para la autentificación de Facebook.
     */
    runAuthFacebook(){
        this.app.get('/auth/facebook', passport.authenticate('facebook'));
        this.app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
            (req: any, res) =>{
                res.send(req.authInfo)
        });
        this.app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'read_stream' }));
    }
    
    /**
     * Función que permite la escucha de los eventos para la autentificación de Google.
     */
    runAuthGoogle(){
        this.app.get('/auth/google', passport.authenticate('google', { session: false, scope:['profile','email'] }));
        this.app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), 
            (req: any, res) =>{
                res.send(req.authInfo)
        });
        
    }
}

dotenv.config();
const index = new Index();
index.goServer();
index.initializePasssport();
index.runAuthFacebook();
index.runAuthGoogle();
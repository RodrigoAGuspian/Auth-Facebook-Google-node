"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv = __importStar(require("dotenv"));
require('./authFacebook');
require('./authGoogle');
/**
 * Clase index que permite levantar el servidor.
 */
class Index {
    constructor() {
        this.app = (0, express_1.default)();
        this.host = process.env.LOCAL_HOST;
        this.PORT = process.env.PORT;
    }
    /**
     * Función que permite el levantamiento del servidor.
     */
    goServer() {
        this.app.get('/', (req, res) => res.send('Api Auth Facebook Google'));
        this.app.listen(this.PORT, () => {
            console.log(`⚡️[server]: Server is running at ${this.host}`);
        });
    }
    /**
     * Función que permite inicializar el uso de la libreria passport js.
     */
    initializePasssport() {
        // Initialize passport
        this.app.use(passport_1.default.initialize());
        // configue serializeUser and deserializeUser
        passport_1.default.serializeUser((user, done) => {
            done(null, user);
        });
        passport_1.default.deserializeUser((user, done) => {
            done(null, user);
        });
    }
    /**
     * Función que permite la escucha de los eventos para la autentificación de Facebook.
     */
    runAuthFacebook() {
        this.app.get('/auth/facebook', passport_1.default.authenticate('facebook'));
        this.app.get('/auth/facebook/callback', passport_1.default.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
            console.log(req.authInfo);
            res.send(req.authInfo);
        });
        this.app.get('/auth/facebook', passport_1.default.authenticate('facebook', { scope: 'read_stream' }));
    }
    /**
     * Función que permite la escucha de los eventos para la autentificación de Google.
     */
    runAuthGoogle() {
        this.app.get('/auth/google', passport_1.default.authenticate('google', { session: false, scope: ['profile', 'email'] }));
        this.app.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            console.log(req.authInfo);
            res.send(req.authInfo);
        });
    }
}
exports.Index = Index;
dotenv.config();
const index = new Index();
index.goServer();
index.initializePasssport();
index.runAuthFacebook();
index.runAuthGoogle();

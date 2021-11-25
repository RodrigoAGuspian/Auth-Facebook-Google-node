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
exports.AuthGoogle = void 0;
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
/**
 * Clase AuthFacebook que permite el uso de la autenticación de Google.
 */
class AuthGoogle {
    constructor() {
    }
    // Función que levanta la autenticación de Google.
    goAuthGoogle() {
        passport_1.default.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.LOCAL_HOST}/auth/google/callback`
        }, (accessToken, refreshToken, profile, done) => {
            return done(null, profile, { accessToken, refreshToken });
        }));
    }
}
exports.AuthGoogle = AuthGoogle;
new AuthGoogle().goAuthGoogle();

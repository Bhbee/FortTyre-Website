"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_model_1 = require("../models/user.model");
const id = process.env.googleClientId;
const secret = process.env.googleClientSecret;
const callbk = process.env.googleOauthRedirectUrl;
passport_1.default.serializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    done(null, user.id);
}));
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findById(id);
    done(null, user);
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: id,
    clientSecret: secret,
    callbackURL: callbk
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const googleId = profile.id;
    const firstName = (_a = profile.name) === null || _a === void 0 ? void 0 : _a.givenName;
    const lastName = (_b = profile.name) === null || _b === void 0 ? void 0 : _b.familyName;
    const email = profile.emails ? profile.emails[0].value : null;
    const foundUser = yield user_model_1.UserModel.findOne({ email: email });
    if (foundUser) {
        done(null, foundUser);
    }
    else {
        const newUser = user_model_1.UserModel.create({
            googleId: googleId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            isAdmin: false
            //     phone_number: req.body.phone_number,
            //     password: bcrypt.hashSync(req.body.password, salt)
        });
        if (newUser) {
            done(null, newUser);
        }
    }
})));

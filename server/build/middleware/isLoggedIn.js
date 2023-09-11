"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const baseUrl = process.env.baseUrl;
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.redirect(`${baseUrl}/login`); //redirect to login page
    }
};
exports.isLoggedIn = isLoggedIn;

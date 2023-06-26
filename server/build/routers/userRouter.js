"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const verifyUserAuthencity_1 = require("../middleware/verifyUserAuthencity");
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = express_1.default.Router();
//Get all user
exports.userRouter.get("/", verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, user_controller_1.GetAllUserInfo);
//Get user profile
exports.userRouter.get("/:id", verifyUserAuthencity_1.verifyUser, user_controller_1.GetUserProfile);
//Update user isAdmin status by Admin only
exports.userRouter.patch("/:id", verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, user_controller_1.UpdateIUserInfoByAdmin);
//update user details: No need for admin auth
exports.userRouter.put("/:id", verifyUserAuthencity_1.verifyUser, user_controller_1.UpdatePersonalUserInfo);
//Delete uer
exports.userRouter.delete("/:id", verifyUserAuthencity_1.verifyUser, verifyAdmin_1.isAdmin, user_controller_1.DeleteUSer);

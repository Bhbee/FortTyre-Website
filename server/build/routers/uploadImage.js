"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const verifyUserAuthencity_1 = require("../middleware/verifyUserAuthencity");
exports.uploadRouter = express_1.default.Router();
// LOCAL UPLOAD
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});
const uploadLocal = (0, multer_1.default)({ storage });
exports.uploadRouter.post('/', verifyUserAuthencity_1.verifyUser, uploadLocal.single('image'), (req, res) => {
    if (!req.file)
        throw Error('req.file is null');
    res.send({
        secure_url: `/${req.file.path}`,
    });
});

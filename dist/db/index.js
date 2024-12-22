"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.User = exports.postSchema = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true });
exports.postSchema = new mongoose_1.default.Schema({
    title: { type: String },
    imgUrl: { type: String },
    content: { type: String },
    summary: { type: String },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', exports.userSchema);
exports.Post = mongoose_1.default.model('Post', exports.postSchema);

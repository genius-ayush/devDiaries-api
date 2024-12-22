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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.post('/posts', middleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, imgUrl, content } = req.body;
        const userId = req.headers["userId"];
        // Simulate AI-powered summary generation
        const summary = content.substring(0, 200) + '...';
        const newPost = new db_1.Post({ title, content, imgUrl, summary, author: userId });
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_1.Post.find().populate('author', 'username email');
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
//@ts-ignore
router.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield db_1.Post.findById(req.params.id).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
//@ts-ignore
router.get('/users/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userPosts = yield db_1.Post.find({ author: id }).populate('author', 'username email');
        if (userPosts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json(userPosts);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
//@ts-ignore
router.delete('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield db_1.Post.findById(req.params.id);
        //@ts-ignore
        yield post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;

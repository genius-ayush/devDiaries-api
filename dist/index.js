"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_url = process.env.MONGO_API_KEY || 'fallback_database_url';
const auth_1 = __importDefault(require("./routes/auth"));
const blog_1 = __importDefault(require("./routes/blog"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/blog", blog_1.default);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
mongoose_1.default.connect(database_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "DevDiaries"
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

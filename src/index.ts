import express from 'express' ; 
import mongoose from 'mongoose';
import cors from 'cors' ; 
import dotenv from 'dotenv';
dotenv.config();
const database_url = process.env.MONGO_API_KEY || 'fallback_database_url'
import authRoutes from "./routes/auth" ;
import blogRoutes from './routes/blog'
const app = express() ; 
const port = 3000 ;

app.use(cors()) ;
app.use(express.json()) ;

app.use("/auth" , authRoutes) ;
app.use("/blog"  , blogRoutes)

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

mongoose.connect(database_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "DevDiaries"
}).then(() => { 
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});
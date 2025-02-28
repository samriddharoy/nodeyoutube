import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userroutes from './routes/users.routes.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "16mb" }))
app.use(express.urlencoded({
    extended: true,
    limit: 16
}))

app.get('/api', (req, res) => {
    res.send('Hello from the server!');
});



//routes

app.use('/api/users', userroutes)



app.use(express.static("public"))

app.use(cookieParser())

export {app}
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

import userRouter from './routes/userRouter.js'
// import {} from './routes/jobRouter.js'
// import {} from './routes/applicationRouter.js'

const app = express();
dotenv.config({ path: "./config/config.env" })

// Just allow these req and from this url
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials : true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir : '/tmp/'
}))


app.use('/api/v1/user', userRouter);
// app.use('api/v1/application', applicationRouter);
// app.use('api/v1/job', jobRouter);

dbConnection();

// Middleware..
app.use(errorMiddleware);

export default app;
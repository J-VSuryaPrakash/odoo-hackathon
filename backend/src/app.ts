import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

export default app;
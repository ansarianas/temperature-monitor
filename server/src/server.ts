import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import healthRouter from "./routes/health";
import readingsRouter from "./routes/readings";

export const app: Express = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors());

app.use('/api/temperature', readingsRouter);
app.use('/api/health', healthRouter);

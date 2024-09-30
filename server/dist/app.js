import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { notFound as notFoundMiddleware, errorHandlerMiddleware, authentication as authenticateUser, } from './middleware/index.js';
import jobsRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import connectDB from './db/connect.js';
import MONGO_URI from './db/mongoURI.js';
const app = express();
app.use(express.json());
const allowedOrigins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:80',
    'https://container-service-1.82upn46fa2lac.eu-central-1.cs.amazonlightsail.com',
    'http://server:5000',
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//   })
// )
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
// add health check
app.get('/api/health', (req, res) => {
    res.send('OK');
});
app.get('/', (_, res) => {
    res.send('jobs api');
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3001;
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port http://localhost:${port}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
export default app;
//# sourceMappingURL=app.js.map
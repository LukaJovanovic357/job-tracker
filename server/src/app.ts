import 'express-async-errors'
import express, { type Response } from 'express'
import cors from 'cors'
import {
  notFound as notFoundMiddleware,
  errorHandlerMiddleware,
  authentication as authenticateUser,
} from './middleware/index.js'
import jobsRouter from './routes/jobs.js'
import authRouter from './routes/auth.js'
import connectDB from './db/connect.js'
import MONGO_URI from './db/mongoURI.js'

const app = express()

app.use(express.json())

const allowedOrigins = [
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:80',
  'https://container-service-1.82upn46fa2lac.eu-central-1.cs.amazonlightsail.com',
  'http://container-service-1.82upn46fa2lac.eu-central-1.cs.amazonlightsail.com',
  `http://${process.env.AWS_LIGHTSAIL_SERVICE}.${process.env.AWS_LIGHTSAIL_DOMAIN}`,
  `https://${process.env.AWS_LIGHTSAIL_SERVICE}.${process.env.AWS_LIGHTSAIL_DOMAIN}`,
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.get('/api/health', (req, res: Response) => {
  res.send('OK')
})

app.get('/', (_, res: Response) => {
  res.send('jobs api')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = Number(process.env.PORT) || 5000

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Server is listening on port ${PORT}`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()

export default app

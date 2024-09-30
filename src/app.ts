import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFoundRoute'
import { routes } from './app/routes'
import cookieParser from 'cookie-parser'
const app: Application = express()

// middleware
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(cookieParser())
app.use(express.json())

// application routes
app.use('/api/v1', routes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome',
  })
})

// customize error
app.use(globalErrorHandler)
app.use(notFound)

export default app

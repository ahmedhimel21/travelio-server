/* eslint-disable no-undef */
import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFoundRoute'
import { routes } from './app/routes'
import path from 'path'
import cookieParser from 'cookie-parser'
const app: Application = express()
app.use(express.static(path.join(__dirname, '../public')))

// middleware
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(cookieParser())
app.use(express.json())

// Set the view engine to EJS
app.set('view engine', 'ejs')

// application routes
app.use('/api/v1', routes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Trvelio',
  })
})

// customize error
app.use(globalErrorHandler)
app.use(notFound)

export default app

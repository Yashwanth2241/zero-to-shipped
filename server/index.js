import cors from 'cors'
import express from 'express'
import { handleApiError, handleNotFound } from './controller.js'
import routes from './routes.js'

const app = express()
const port = Number(process.env.PORT) || 3000

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(routes)

app.use(handleNotFound)
app.use(handleApiError)

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Resume server listening on port ${port}`)
  })
}

export default app
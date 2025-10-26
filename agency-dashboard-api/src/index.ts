import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth.js'
import clientRoutes from './routes/clients.js'
import jobRoutes from './routes/jobs.js'
import projectRoutes from './routes/projects.js'
import eventRoutes from './routes/events.js'

const app = express()
const port = process.env.PORT || 4000

// Singleton PrismaClient
export const prisma = new PrismaClient()

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(express.json())

// Routes
app.use('/api/v1/health', (req, res) => res.json({ ok: true }))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/projects', projectRoutes)
app.use('/api/v1/events', eventRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
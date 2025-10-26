import express from 'express'
import { prisma } from '../index.js'
import { z } from 'zod'

const router = express.Router()

const eventSchema = z.object({
  title: z.string(),
  date: z.string().datetime(),
})

// GET /api/v1/events
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { deletedAt: null },
    })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// POST /api/v1/events
router.post('/', async (req, res) => {
  try {
    const data = eventSchema.parse(req.body)
    const event = await prisma.event.create({ data: { ...data, date: new Date(data.date) } })
    res.status(201).json(event)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' })
  }
})

export default router
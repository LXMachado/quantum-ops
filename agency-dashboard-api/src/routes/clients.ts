import express from 'express'
import { prisma } from '../index.js'
import { z } from 'zod'

const router = express.Router()

const clientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
})

// GET /api/v1/clients
router.get('/', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: { deletedAt: null },
    })
    res.json(clients)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients' })
  }
})

// POST /api/v1/clients
router.post('/', async (req, res) => {
  try {
    const data = clientSchema.parse(req.body)
    const client = await prisma.client.create({ data })
    res.status(201).json(client)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create client' })
  }
})

export default router
import express from 'express'
import { prisma } from '../index.js'
import { z } from 'zod'

const router = express.Router()

const jobSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  clientId: z.string(),
  status: z.string().optional(),
})

// GET /api/v1/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { deletedAt: null },
      include: { client: true },
    })
    res.json(jobs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// POST /api/v1/jobs
router.post('/', async (req, res) => {
  try {
    const data = jobSchema.parse(req.body)
    const job = await prisma.job.create({ data })
    res.status(201).json(job)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' })
  }
})

export default router
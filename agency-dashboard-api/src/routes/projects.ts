import express from 'express'
import { prisma } from '../index.js'
import { z } from 'zod'

const router = express.Router()

const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  status: z.string().optional(),
})

// GET /api/v1/projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { deletedAt: null },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// POST /api/v1/projects
router.post('/', async (req, res) => {
  try {
    const data = projectSchema.parse(req.body)
    const project = await prisma.project.create({ data })
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create project' })
  }
})

export default router
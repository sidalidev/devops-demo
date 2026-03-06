const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 3000

app.use(express.json())

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API DevOps Demo' })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// GET /tasks — récupérer toutes les tâches
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

// GET /tasks/:id — récupérer une tâche
app.get('/tasks/:id', async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(req.params.id) },
  })
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' })
  res.json(task)
})

// POST /tasks — créer une tâche
app.post('/tasks', async (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'Le titre est requis' })

  const task = await prisma.task.create({
    data: { title },
  })
  res.status(201).json(task)
})

// PUT /tasks/:id — modifier une tâche
app.put('/tasks/:id', async (req, res) => {
  const { title, done } = req.body
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(req.params.id) },
      data: { ...(title !== undefined && { title }), ...(done !== undefined && { done }) },
    })
    res.json(task)
  } catch {
    res.status(404).json({ error: 'Tâche non trouvée' })
  }
})

// DELETE /tasks/:id — supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.json({ message: 'Tâche supprimée' })
  } catch {
    res.status(404).json({ error: 'Tâche non trouvée' })
  }
})

// Exporter pour les tests
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
  })
}

module.exports = { app, prisma }

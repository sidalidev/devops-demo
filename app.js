const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Route principale
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API DevOps Demo' })
})

// Liste des tâches (simulée)
const tasks = [
  { id: 1, title: 'Apprendre Git', done: true },
  { id: 2, title: 'Configurer CI/CD', done: false },
  { id: 3, title: 'Dockeriser l\'app', done: false },
]

// GET /tasks — récupérer toutes les tâches
app.get('/tasks', (req, res) => {
  res.json(tasks)
})

// GET /tasks/:id — récupérer une tâche
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id))
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' })
  res.json(task)
})

// POST /tasks — créer une tâche
app.post('/tasks', (req, res) => {
  const { title } = req.body
  if (!title) return res.status(400).json({ error: 'Le titre est requis' })

  const task = {
    id: tasks.length + 1,
    title,
    done: false,
  }
  tasks.push(task)
  res.status(201).json(task)
})

// Health check pour le monitoring
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

// Exporter pour les tests (sans lancer le serveur)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
  })
}

module.exports = app

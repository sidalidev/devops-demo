const request = require('supertest')
const { app, prisma } = require('./app')

// Nettoyer la BDD avant et après les tests
beforeAll(async () => {
  await prisma.task.deleteMany()
})

afterAll(async () => {
  await prisma.task.deleteMany()
  await prisma.$disconnect()
})

describe('API DevOps Demo', () => {
  // Test de la route principale
  test('GET / — retourne le message de bienvenue', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.message).toContain('DevOps Demo')
  })

  // Test du health check
  test('GET /health — retourne le statut ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })

  // Tests CRUD
  let taskId

  test('POST /tasks — crée une nouvelle tâche', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Nouvelle tâche' })
    expect(res.status).toBe(201)
    expect(res.body.title).toBe('Nouvelle tâche')
    expect(res.body.done).toBe(false)
    taskId = res.body.id
  })

  test('POST /tasks — retourne 400 sans titre', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({})
    expect(res.status).toBe(400)
  })

  test('GET /tasks — retourne la liste des tâches', async () => {
    const res = await request(app).get('/tasks')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('GET /tasks/:id — retourne une tâche spécifique', async () => {
    const res = await request(app).get(`/tasks/${taskId}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe('Nouvelle tâche')
  })

  test('GET /tasks/999 — retourne 404 si inexistant', async () => {
    const res = await request(app).get('/tasks/999')
    expect(res.status).toBe(404)
  })

  test('PUT /tasks/:id — modifie une tâche', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ done: true })
    expect(res.status).toBe(200)
    expect(res.body.done).toBe(true)
  })

  test('DELETE /tasks/:id — supprime une tâche', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`)
    expect(res.status).toBe(200)
  })

  test('DELETE /tasks/999 — retourne 404 si inexistant', async () => {
    const res = await request(app).delete('/tasks/999')
    expect(res.status).toBe(404)
  })
})

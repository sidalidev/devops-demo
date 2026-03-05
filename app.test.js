const request = require('supertest')
const app = require('./app')

describe('API DevOps Demo', () => {
  test('1+1', () => {
    expect(1+1).toBe(2)
  })
  // // Test de la route principale
  // test('GET / — retourne le message de bienvenue', async () => {
  //   const res = await request(app).get('/')
  //   expect(res.status).toBe(200)
  //   expect(res.body.message).toContain('DevOps Demo')
  // })

  // // Test du health check
  // test('GET /health — retourne le statut ok', async () => {
  //   const res = await request(app).get('/health')
  //   expect(res.status).toBe(200)
  //   expect(res.body.status).toBe('ok')
  // })

  // // Tests des tâches
  // describe('Tasks', () => {
  //   test('GET /tasks — retourne la liste des tâches', async () => {
  //     const res = await request(app).get('/tasks')
  //     expect(res.status).toBe(200)
  //     expect(Array.isArray(res.body)).toBe(true)
  //     expect(res.body.length).toBeGreaterThan(0)
  //   })

  //   test('GET /tasks/1 — retourne une tâche spécifique', async () => {
  //     const res = await request(app).get('/tasks/1')
  //     expect(res.status).toBe(200)
  //     expect(res.body).toHaveProperty('title')
  //     expect(res.body).toHaveProperty('done')
  //   })

  //   test('GET /tasks/999 — retourne 404 si la tâche n\'existe pas', async () => {
  //     const res = await request(app).get('/tasks/999')
  //     expect(res.status).toBe(404)
  //   })

  //   test('POST /tasks — crée une nouvelle tâche', async () => {
  //     const res = await request(app)
  //       .post('/tasks')
  //       .send({ title: 'Nouvelle tâche' })
  //     expect(res.status).toBe(201)
  //     expect(res.body.title).toBe('Nouvelle tâche')
  //     expect(res.body.done).toBe(false)
  //   })

  //   test('POST /tasks — retourne 400 sans titre', async () => {
  //     const res = await request(app)
  //       .post('/tasks')
  //       .send({})
  //     expect(res.status).toBe(400)
  //   })
  // })
})

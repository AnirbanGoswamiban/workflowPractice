const request = require('supertest')
const app = require('./app')

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ name: 'Test Task' })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message', 'Task created')
  })

  it('should return all tasks', async () => {
    const res = await request(app).get('/tasks')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("message")
    expect(Array.isArray(res.body.message)).toBe(true)
  })

  it('should return a task by ID', async () => {
    await request(app).post('/tasks').send({ name: 'Another Task' })
    const res = await request(app).get('/tasks/1')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('name')
  })

  it('should update a task', async () => {
    const res = await request(app)
      .put('/tasks/0')
      .send({ name: 'Updated Task' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Task updated')
  })

  it('should delete a task', async () => {
    const res = await request(app).delete('/tasks/0')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message', 'Task deleted')
  })
})

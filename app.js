const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let tasks = []

app.post('/tasks', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  tasks.push({ name })
  res.status(201).json({ message: 'Task created', id: tasks.length - 1 })
})

app.get('/tasks', (req, res) => res.json({"message":tasks}))

app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const task = tasks[id]
  if (!task) return res.status(404).json({ error: 'Task not found' })
  res.json(task)
})

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!tasks[id]) return res.status(404).json({ error: 'Task not found' })
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  tasks[id] = { name }
  res.json({ message: 'Task updated' })
})

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  if (!tasks[id]) return res.status(404).json({ error: 'Task not found' })
  tasks.splice(id, 1)
  res.json({ message: 'Task deleted' })
})

module.exports = app
